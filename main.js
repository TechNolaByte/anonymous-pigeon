const { Client, GatewayIntentBits, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, AttachmentBuilder} = require('discord.js');
const { token, primeSeed, smallPrime } = require('./auth.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// For save/load
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const Readable = require('stream').Readable;

// Load default state
require('fs').readFile('./default_state.json', 'utf8', function (err,data) {
	if(err) return console.log(err);
	global = JSON.parse(data);
});

commandCache = {};

userFromID = (guild, userID) => guild.members.cache.get(userID)
isNarrator = (guild, userID) => userFromID(guild, userID).roles.cache.some(role => role.name === 'Narrator')
randomInt  = (min, max) 	 => Math.floor(Math.random() * (max - min + 1) + min) // Inclusive for both min and max

// Warning, this will break when every adjective has been used. (But why did you use over 6k IDs in one game??)
nextCode = () => {
	var randomIndex = randomInt(0, global.remainingAdjectives.length-1);
	var randomAdjective = global.remainingAdjectives.splice(randomIndex,1)[0];
	var capitalizedAdjective = randomAdjective.charAt(0).toUpperCase() + randomAdjective.slice(1);
	return capitalizedAdjective;
}

function assignPlayerCodes(){
	// For all players
	for (const player in global.players) if (global.players.hasOwnProperty(player)){
		// Generates a list of unique ids for this player to choose from
		let ids = [];
		for(let i = 0; i < global.maxIdsPerPlayer; i++) ids.push(nextCode());
		
		global.players[player] = ids;
		console.log("Set player ("+player+") id options to: " + ids);
	}
}

//// Handle Commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
	
	// Get user who sent command
	discordUser = interaction.user.id;
	console.log(discordUser + " — " + interaction.user.username + "#" + interaction.user.discriminator);
	
	if (interaction.commandName === 'anon'){
		if(global.players[discordUser] === undefined) return interaction.reply({ content: 'Only players may send anonymous messages.', ephemeral: true});
		
		const id = interaction.options.getChannel('destination') || interaction.channelId;
		const channel = client.channels.cache.get(''+id);
		const message = interaction.options.getString('message');

		// Prompt player to select an identity
		options = [
			new ButtonBuilder()
				.setCustomId('no_id')
				.setLabel("No Anon ID")
				.setStyle(ButtonStyle.Secondary)
		];
		for(var i = 0; i < global.maxIdsPerPlayer; i++){
			options.push(
				new ButtonBuilder()
					.setCustomId(''+i)
					.setLabel(global.players[discordUser][i])
					.setStyle(ButtonStyle.Primary)
			);
		}
		
		const identities = new ActionRowBuilder()
			.addComponents(...options);
			
		await interaction.reply({ content: 'Send message ```'+message+'``` to channel ``'+channel.name+'`` as what identity?', components: [identities], ephemeral: true});
		
		// Record message and destination for use later when player selects and identity
		// (currently no time out, so this is a memory leak, but probably not worth the effort of fixing
		var botReply = await interaction.fetchReply();
		messageID = await botReply.id;
		
		console.log(message)
		console.log(channel.name)
		commandCache[messageID] = {message: message, channel: channel};
		
		return;
	}
	
	// Remaining commands only for narrators
	if(!isNarrator(interaction.guild, interaction.user.id))
		return interaction.reply({ content: "This command is only available to narrators.", ephemeral: true });
	
	switch (interaction.commandName){
		case 'shuffle-ids':
			assignPlayerCodes();
			interaction.reply({ content: "Anonymous ids have been shuffled for everyone.", ephemeral: true });
		break;
		
		case 'view-ids':
			var output = "Player IDs:\n";
			// For all players
			for (const player in global.players) if (global.players.hasOwnProperty(player)){
				output += player+": ["+global.players[player]+"]\n";
			}

			interaction.reply({ content: output, ephemeral: true });
		break;
		
		case 'set-players':
			// Clear old list
			global.players = {};
			
			// Collect player ids from pings
			const playerListRaw = interaction.options.getString('player_list');
			playerList = playerListRaw.replace(/[^0-9\ ]/g, "").split(" ");
			
			// Populate player list
			for(var i = 0; i < playerList.length; i++) global.players[playerList[i]] = [];
			assignPlayerCodes();
			
			interaction.reply({ content: "Player list updated.", ephemeral: true });
		break;
		
		case 'save':
			// Convert to stream
			const stream = new Readable();
			stream._read = () => {};
			stream.push(JSON.stringify(global));
			stream.push(null);
			
			// Get name
			let current = new Date();
			let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
			let cTime = current.getHours() + "-" + current.getMinutes() + "-" + current.getSeconds();
			let dateTime = cDate + '_' + cTime;

			var attachment = new AttachmentBuilder(stream, { name: 'anonymous-bot_'+dateTime+'.json' });

			interaction.reply({ content: "Bot state has been saved.", ephemeral: false,  files: [attachment]});
		break;
		
		case 'load':
			var attachment = interaction.options.getAttachment('attachment');
			if(Object.prototype.toString.call(attachment) !== '[object Object]' || attachment.url === undefined) return interaction.reply({ content: "ERROR - Failed to load attachment into string.", ephemeral: true });
			
			// Find file
			const response = await fetch(attachment.url);
			if (!response.ok) return interaction.reply({ content: "ERROR - Failed to load attachment into string.", ephemeral: true });

			// Read the stream
			const attachmentText = await response.text();
			
			// Parse
			var fail = false;
			try{ global = JSON.parse(attachmentText);
			}catch(e){
				fail = true;
				interaction.reply({ content: "ERROR - Attempted to load invalid bot state.\n"+e, ephemeral: true });
			}
			
			if(!fail) interaction.reply({ content: "Bot state has been loaded from file.", ephemeral: true });
		break;
	}
});

//// Handle button menu
client.on('interactionCreate', async interaction => {
	if (!interaction.isButton()) return;
	discordUser = interaction.user.id;
	
	// Get selected identity index
	var selectedIndex = interaction.customId;
	if(selectedIndex == "no_id") selectedIndex = "-1";
	selectedIndex = parseInt(selectedIndex);
	if(selectedIndex > global.maxIdsPerPlayer) selectedIndex = global.maxIdsPerPlayer;
	
	// Get prefix
	var prefix = "";
	if(global.userIdentifiers && selectedIndex >= 0) prefix = `** ${global.players[discordUser][selectedIndex]} Anon**: `;

	await interaction.deferUpdate();
	
	// Get message and target from cache
	var command = commandCache[interaction.message.id];
	delete commandCache[interaction.message.id];

	if(command === undefined) return interaction.editReply({ content: "Message failed to send anonymously as ("+prefix+") because it was not found in the cache. This is probably because the bot has restarted since you issued the /anon command.", components: [] });
	
	// Send anonymous message
	await command.channel.send(prefix+command.message);
	interaction.editReply({ content: "Message sent anonymously as ("+prefix+")", components: []});
});

client.login(token);