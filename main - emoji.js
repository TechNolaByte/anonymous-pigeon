// permission level 2147560448
// invite https://discord.com/api/oauth2/authorize?client_id=1017946076784906392&permissions=2147560448&scope=bot
const { Client, GatewayIntentBits, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { token, primeSeed, smallPrime } = require('./auth.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

var fs = require('fs');

saveFile = () => fs.writeFile("./saves/"+Date.now(), JSON.stringify(global), function(err){
    if(err) return console.log(err);
    console.log("The file was saved!");
});

commandCache = {};

global = {
	maxIdsPerPlayer: 4,
	userIdentifiers: true,
	masterSeed: primeSeed,
	timesShuffled: 0,
	players: {}
}

function loadState(newGlobal){
	global = newGlobal;
	
	var timesToShuffle = global.timesShuffled;
	global.timesShuffled = 0;
	for(var i = 0; i < newGlobal.timesShuffled; i++) emojiRNG.nextFloat();
	
	
	// WIP import and assign old player order
	
	shuffleEmojis();
}

// Good ol stolen code
emojiRNG = new RNG();
function RNG() {
	// LCG using GCC's constants
	this.m = 0x80000000; // 2**31;
	this.a = 1103515245;
	this.c = 12345;

	this.state = global.masterSeed;
}
RNG.prototype.nextFloat = function() {
	this.state = (this.a * this.state + this.c) % this.m;
	return this.state / (this.m - 1);
}
function shuffleEmojis(){
	Emojis = OriginalEmojis.split("|");
	global.timesShuffled++;
	
    for (let i = Emojis.length - 1; i > 0; i--) {
        const j = Math.floor(emojiRNG.nextFloat() * (i + 1));
        [Emojis[i], Emojis[j]] = [Emojis[j], Emojis[i]];
    }
}

OriginalEmojis = "đĒ|đ§|đ|đ§|đģ|đī¸|đ|đ|đ¯|đ§Ļ|đī¸|đģ|đ|đ|đ¤ą|đ|đ|đĨ|đ´|đĢ|đĻ|đĒ|đē|đ´|đ|đļ|đ¨|đŊ|đ|đŠī¸|đļī¸|đŠ°|đ|đļ|đ|đŦ|đĸ|đ§|đ´|đ§|đˇ|đŠ|đĒ|đ|đ|đ§|đ|đ|đ|Z|n|đŧ|đĄ|đ§|đ¤|đ¯|đ|đī¸|đ|đ|đˇ|đģ|đĩ|đ|đ|đ§Ŧ|đš|đ§|đĄ|đ|đ¤|đž|đĒ|đģ|đ˛|đī¸|đ¸ī¸|đ§|đē|đŠ|đĻī¸|đ¤|đĒ|đ¤ē|đī¸|đŠ|đ¨ī¸|đļ|đ|đ¤|đ§|đ|đ|đž|đĨ|đŠ|đ|đ§|đ¨|đ|đģ|đŠ¸|đ|đ|đ|đē|đ¤ī¸|đ|đ§Ē|đĻ´|đŦ|đž|đĸ|đ¯ī¸|đ¨|đ|đą|đ|đ|đĨ|đĨ|đ¤ĩ|đĻ¯|đĢ|đŖī¸|B|đĸ|đŠŗ|đ§|đ|đĒ|đĨ|đ|đ|đĩ|đ|đĄ|đ|đ¸|đ|đ|đ|đ|đ¯|l|đŗ|đ´|đ|đĻ|đĢ|đļ|đ|đŠš|đˇ|đ|đĨŧ|đ|đ§Ą|p|đĄ|đ§š|đ|đĨ|đ§ą|đĻ|i|đ¸|đ¯|đŦ|đ|đ|đ |đ|đ|đš|đ­|đ§|đ¸|đ |đ|đĨ|đĨī¸|đ°|đ°ī¸|đ¤|đĒ|đĻ|đŧ|đŖ|đĄ|đ|đ|đĢ|đ§ļ|đ|đ|đ¤|đŧ|y|đŋ|đĒ|đ§´|đ|đ|đī¸|đĨŠ|đ´|đ|đ|đ|đļ|K|đĄ|đĢ|đĨ|đ˛|đ|đ|đ|đ|đ|đŖ|đī¸|đ|đĻš|đ|đĨī¸|đ|F|đ|đĒ|đĨŊ|đŦī¸|đĻ|c|đˇ|đĻž|đ|4|đ |đ¤|đ|đŧ|đ¤|đš|đ|đ¤|V|v|đŊ|đĻ|đŠ|đŦ|đĒ|đ¤|đ¯|đŗ|đē|đ¤|s|đ|đ§ |đĻ|đ§§|đē|đ|đ|đ|đ|đ¤§|đĨŋ|đ|đĻĩ|đ§ŗ|đŋ|đĨ°|đĨ§|đ|đ|X|đ|đ|đĨ|đ|đŽ|đŋ|đī¸|đ|đ¸|đ |đĄ|đ|đ|đ|đĻ¨|đ¨|đī¸|đ§|đī¸|đŦ|đ|đ|đĢ|đļ|đ¤|đ|đ|đ|đ¤Ŧ|đˇ|đĻ|e|đ|W|đĻŧ|đ|đŠ˛|đĨ´|đ|đ|đ°|đą|đ˛|đ§Ģ|đĻ|đ§¨|đ¸|đŗ|đĨ|đĻ|đ|J|đĄ|đĨŦ|đĨą|đž|đ§ģ|đ¯|đī¸|đĒ|đŠ|đ|đĻ|đŠī¸|đ¤Ļ|đī¸|đĩ|đĨ|đĒ|đĨ|đŗ|đ|đŋ|đ|đ|đĄī¸|đ|đŽ|đ¤¯|đĸ|đ |đŧī¸|đ¤ĸ|đĨ¯|đ§¤|đ§°|đŖ|đ¸|đ|t|đ|đš|9|đ|đ|đ|đī¸|đ|đ|đ°|E|đ|đĻĒ|đĻ|đ§|G|đ°|đĻˇ|đ§|đ|đ¤ī¸|đĻĨ|đ|đ§ŋ|đ|đĻ|đĢ|đ­|đ|đ|đ|đ|đ|đ§|đĨ|đ|đ§Ŋ|đŧ|đ|đ|đ|đī¸|đ|đ°ī¸|đ¤š|đĨ|3|đ|đ¤­|đ§|đŽ|đĻ|đŧ|đ|6|đŦ|đī¸|đ¨|đ|đ|đĨ|đĨ|đ|đļī¸|đ|đĻĄ|đž|đ|đ|đ|H|đĻŋ|đŖ|đ|đ|đšī¸|đĢ|đē|đ|đĸ|đą|đ´|b|đĨ|đ|đĻ|đĩī¸|đĨ|đ¤Ą|đ˛ī¸|đˇ|đĒ|đ|đŋ|đī¸|k|đĻģ|đˇī¸|đ|đŗī¸|đ|đ¤|đĒ|đ˛|đ|đĒ|S|đ|đ|đĻ|đ|đĻĸ|đ|5|đŊ|8|đ§ž|đ­|đ|đ¤Ģ|đģ|0|đī¸|đ§|đ|đ­|đ|đĩ|đ¤˛|j|đ|đ¤ŧ|đ|đ|đ|đ¤ŋ|đŽ|đ|đŖ|đ|đ|đŽ|đ|đŗ|đĻ|đĨ|đĨ|đ¨|q|đŊ|đ|đĩ|đ|đ|đ´ī¸|đ|đ§|m|đ|đˇ|đ |đŊī¸|đ|đĩ|đ¤|đĻŠ|đ§ˇ|đĨ|đ|đī¸|đĨ|đ|đ¯|đ¤|đ¤|đ|đ§¯|đ|đĨ|đ|đ¤|C|đ¸|đī¸|đ¤|đē|đ§|2|đ|đ¤|đĻ|đ|đ|đĻ|đĻ|đĢ|M|đ|đ¨|đ¤|đĨ|đĻļ|đ|đĸ|đ|đ¤|đ§|đĨŖ|đ|đ°|đ |đĨ|đ|đ|đĸ|đ|đĨ|đĨ¤|đ|đĩī¸|đ§|đ¸|đš|đ§|đĻ¸|đ|đĒ|đ|đ§|đģ|đī¸|đī¸|đģ|đĒ|đ¯ī¸|R|đ|đē|đļ|đŦ|đŠ|đĻ|đ§ĩ|đĸ|đĨ|đĻ|đī¸|đ|đš|đ|N|đ¤ļ|đŊ|đ|đ|đ|đ|đĻ§|đī¸|đĄī¸|đ|đ |đĻ|đ|đĨ|đĨģ|đ|đĨĄ|đĻ|đ|đ|đ|đ˛|đ¤Ĩ|đ|đ§|đ|đ§¸|đī¸|đ|đĩ|đĨŗ|đŽ|đ¯|đ|đ|đĨ|đĨē|đ|đ|đĻŽ|đŖ|đĨ|đ§|đŧ|đ´|đī¸|đŖ|đĨ|U|đĨ|đ´|đŋ|đ|đ¤|đ|Y|đ|đĻ|đ|đī¸|g|đ¤Ŗ|đž|đĨ|đ|đŽ|đ|đ|đ|đĨĸ|P|đ|r|đī¸|đī¸|đ¤´|đ¤|đĻ|đī¸|đ§Ĩ|đĨĨ|đ|đ|đ|đ§˛|đ|đ|đ|đļ|đ|đī¸|đ§|đ§ē|đŖī¸|đĻ|u|đ|đĨ|đš|đē|đ|đ|đ¤|đˇ|đē|đ|đž|O|đ|đĨĒ|w|đ|đ¤|đ§|đ|đ|đ°|đĄ|đī¸|đ|d|đĨĩ|7|đ¤Ē|đļ|đī¸|đ|đŽ|đ|đ¤Ž|đ|đ§|đ |đ­|đ°|đī¸|đ|đ§|đ¤|đ|đĄī¸|đ§Š|đ¤ˇ|đ´|đ|đĻŊ|đī¸|đĨŽ|đī¸|đ|đŋ|đˇ|đą|đ´|đ|đ|đĒ|đą|đĻ|đ|đŽ|đ¤¨|đŗ|đŖ|đˇī¸|đĨ|đēī¸|A|đŗ|đ§|đĻ|đŠ|đ¤|đ |đ|đ|đ|đĨ¨|đĻ|đ¸|đ§|đš|đ|đŗī¸|đ|đ|đĻ|đą|đ|đ¤|đ|đ|đĨ|đī¸|đē|đ|L|đĨ­|z|đą|đ|đĻ |đ|đĻ|đŖ|đĸī¸|đ|đĸ|đĨ|đ|đĒī¸|đĻ|đī¸|đ|đ|đĢī¸|đ°|đąī¸|đĻ|đ|I|đ|đŠ|đ|đī¸|đ|đ¤|đī¸|đ¨|đ|đ§|đ|đ|đ§ŧ|đ|đĻ|đą|đ§|đš|đĢ|đ§|đ|đ˛|đŦ|đ|đŠē|đĻ|1|đĻ|đ|đ°|đ|đ|đ¯|đĨ |đ|đŊ|đ­|đĻ|đ­|đī¸|đ|đ¤¤|đ|đ|đ|đ|đ|đĻ|đ|đĩ|đ¤Ŋ|đ|đŦ|đĒ|đ|đŖ|h|đĻ|đ|đĨ|đ |đ|o|đ|đŋ|đˇ|đĄ|đ|đĨĻ|đĨ|đ¨|đ|đ|đ¤ž|đ|đĨ|đĨž|đ ī¸|đĻ|đ˛|x|đĻē|đŧ|đģ|đ§ĸ|đ|đŽ|đĨ|đĩ|đ|đī¸|đĢ|đŊ|đ¨|D|đ|đī¸|đ|a|đ|đ|đ|đŗī¸|đĻ|f|đ|đĨļ|đ|đŊī¸|đ§|đ¸|đģ|đĻ|đ|đą|đ­|đĻĻ|đ§|đ¤ŗ|đī¸|đĩ|đī¸|đ¤ |đ|Q|đ|đ|đ|đ§Ŗ|đ|đ|đ|đ¤¸|đ|đ|đ§­|đ§Ž|đĸ|đŠą|đ°|đ|T|đ|đ|đ§|đ˛|đ§|đ|đ|đ|đ¤°|đ|đĨĢ|đ¨ī¸|đĒ|đ¤Š|đ§|đŋī¸"

userFromID = (guild, userID) => { return guild.members.cache.get(userID); }
isNarrator = (guild, userID) => { return userFromID(guild, userID).roles.cache.some(role => role.name === 'Narrator'); }

global.emojiIndex = 0;
global.universalPrefix = "";
nextCode = () => {
	emojiIndex++;
	if(emojiIndex > Emojis.length){
		universalPrefix += Emojis[emojiIndex-1];
		emojiIndex = 0;
	}
	
	return universalPrefix+Emojis[emojiIndex];
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

function getPrefix(discordUser, idIndex){
	if(!global.userIdentifiers || idIndex < 0) return "";

	if(idIndex > global.maxIdsPerPlayer) idIndex = global.maxIdsPerPlayer;
	
	return "**Anon" + global.players[discordUser][idIndex] + "**: ";
}

//// Handle Commands
client.on('interactionCreate', async interaction => {
	if (!interaction.isChatInputCommand()) return;
	
	// Get user who sent command
	discordUser = interaction.user.id;
	console.log(discordUser + " â " + interaction.user.username + "#" + interaction.user.discriminator);
	
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
			shuffleEmojis();
			assignPlayerCodes();
			interaction.reply({ content: "Anonymous ids have been shuffled for everyone.", ephemeral: true });
		break;
		
		case 'view-ids':
			var output = "";
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
			shuffleEmojis();
			assignPlayerCodes();
			
			interaction.reply({ content: "Player list updated.", ephemeral: true });
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
	
	// Grab prefix
	var prefix = getPrefix(discordUser, selectedIndex);
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