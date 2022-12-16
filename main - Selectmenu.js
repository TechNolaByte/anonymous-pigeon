// permission level 2147560448
// invite https://discord.com/api/oauth2/authorize?client_id=1017946076784906392&permissions=2147560448&scope=bot
const { Client, GatewayIntentBits, SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder} = require('discord.js');
const { token, primeSeed, smallPrime } = require('./auth.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

commandCache = {};

global = {
	startIdsPerPlayer: 5,
	userIdentifiers: true,
	masterSeed: 0,
	players: {
		"335161770580639746": [1111, 2222, 3333, 4444, 5555]
	}
}

function shuffleAllIDs(){
	global.masterSeed = Math.floor(1000 + Math.random() * 9000) + Date.now();
	
	for (const player in global.players){
		if (global.players.hasOwnProperty(player)){
			
			// Generates a list of unique ids for this player to choose from
			let ids = [];
			for(let i = 0; i < global.startIdsPerPlayer; i++) ids.push(generateID(player, i));
			
			global.players[player] = ids;
			console.log("Set player ("+player+") id options to: " + JSON.stringify(ids));
		}
	}
}


function generateID(discordUser, idIndex = 0){
	if(idIndex > global.startIdsPerPlayer) idIndex = global.startIdsPerPlayer;
		
	// Get seed unique to player, index, and last reshuffle time
	let incID = global.masterSeed + '' + idIndex + '' + discordUser;
	incID = parseInt(incID);
	
	// Convert unique seed into a probably unique 4 digit code
	let userID = (incID*primeSeed)%(36**6);
	while(userID > 9999){
		if(userID % smallPrime < 1000) userID = Math.floor(userID / 3);
		else userID = userID % smallPrime;
	}
	
	return userID;
}

function getPrefix(discordUser, idIndex){
	if(!global.userIdentifiers || idIndex < 0) return "";

	if(idIndex > global.startIdsPerPlayer) idIndex = global.startIdsPerPlayer;
	
	return "**Anon#" + global.players[discordUser][idIndex] + "**: ";
}

//// Handle Commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
	
	// Get user who sent command
	discordUser = interaction.user.id;
	console.log(discordUser + " — " + interaction.user.username + "#" + interaction.user.discriminator);
	
	// Process command
	if (interaction.commandName === 'anon'){
		const id = interaction.options.getChannel('destination') || interaction.channelId;
		const channel = client.channels.cache.get(''+id);
		const message = interaction.options.getString('message');

		// Select identity
		
		options = [{ label: "Abort", value: 'abort' },{
			label: "No Anon ID",
			description: 'Message will be untraceable.',
			value: 'no_id',
		}];
		for(var i = 0; i < global.startIdsPerPlayer; i++){
			options.push({
				label: "#"+global.players[discordUser][i],
				value: ''+i,
			});
		}
		
		const identities = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('selectIdentity')
					.setPlaceholder('Nothing selected')
					.addOptions(...options)
			);
		
		await interaction.reply({ content: 'Send message ```'+message+'``` to channel ``'+channel.name+'`` as what identity?', components: [identities], ephemeral: true});
		
		var botReply = await interaction.fetchReply();
		messageID = await botReply.id;
		commandCache[messageID] = {message: message, channel: channel};
		
	}else if (interaction.commandName === 'shuffle-ids'){
		shuffleAllIDs();
		interaction.reply({ content: "Anonymous ids have been shuffled for everyone.", ephemeral: true });
	}
});

//// Handle select menu
client.on('interactionCreate', async interaction => {
	if (!interaction.isSelectMenu()) return;
	discordUser = interaction.user.id;
	
	if (interaction.customId === 'selectIdentity'){
		var selectedIndex = interaction.values[0];
		
		if(selectedIndex == "abort") return interaction.update({ content: 'Message aborted.', components: [] });
		if(selectedIndex == "no_id") selectedIndex = -1;
		
		var prefix = getPrefix(discordUser, selectedIndex);
		await interaction.deferUpdate();
		
		// Get message
		var command = commandCache[interaction.message.id];
		delete commandCache[interaction.message.id];

		if(command === undefined) return interaction.editReply({ content: "Message failed to send anonymously as ("+prefix+")", components: [] });
		
		await command.channel.send(prefix+command.message);
		interaction.editReply({ content: "Message sent anonymously as ("+prefix+")", components: []});
	}
});

client.login(token);