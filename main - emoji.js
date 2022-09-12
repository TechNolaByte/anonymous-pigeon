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

OriginalEmojis = "🚪|🧀|📜|🧂|🌻|🗑️|🐟|🐛|🌯|🧦|🖋️|🔻|💍|🌇|🤱|📇|🏂|🥑|😴|🎫|🦍|🪒|🕺|🚴|😅|😶|🟨|🌽|🌋|🌩️|🕶️|🩰|🌁|🎶|📗|🎬|🎢|🧓|🛴|🧈|🛷|🟩|🪕|🐊|🍄|🧁|💈|🚃|🔋|Z|n|🍼|🎡|🧜|🏤|😯|🎈|🏍️|🍆|😜|🐷|🎻|💵|🎒|🔗|🧬|💹|🧕|🟡|🚓|🤔|🗾|🪐|💻|🌲|🎞️|🕸️|🧍|👺|🍩|🌦️|🟤|🪁|🤺|🏞️|😩|🗨️|💶|💎|🤑|💧|🔒|👝|🌾|🥖|💩|🙀|🧞|😨|😟|🐻|🩸|🍑|🐈|🕍|💺|🌤️|👌|🧪|🦴|🔬|💾|🚢|🗯️|🎨|💀|🎱|😙|👅|🥕|🥀|🤵|🦯|🏫|🛣️|B|🍢|🩳|😧|🍈|🟪|🥋|🚗|🍜|👵|🖖|💡|🔔|🍸|🐁|💁|🍐|🚈|💯|l|🌳|🍴|🏑|🦐|👫|🚶|😐|🩹|📷|👓|🥼|🐖|🧡|p|👡|🧹|💞|🥘|🧱|🦝|i|🐸|🍯|🍬|🚀|🐇|🚠|😎|👚|👹|🍭|🍧|👸|🏠|👎|🍥|🖥️|🌰|🛰️|😤|🪓|🍦|👼|🍣|🍡|😁|🚙|🛫|🧶|🍙|📙|🚤|📼|y|📿|🪑|🧴|📟|📝|🏗️|🥩|💴|🙈|🎏|🎃|🔶|K|🐡|😫|🥊|👲|🚁|🚟|🍓|🍃|📋|🚣|🗃️|👈|🦹|🎑|🛥️|💄|F|🐆|👪|🥽|🌬️|🦗|c|🍷|🦾|🙃|4|🌠|🍤|🎓|🎼|🤏|🏹|👉|🤖|V|v|🎽|🚦|🚩|💬|🐪|🤟|🏯|🐳|🛺|🤛|s|🐑|🧠|🦞|🧧|🐺|📃|👞|🐄|📄|🤧|🥿|👛|🦵|🧳|🎿|🥰|🥧|🖕|📖|X|🚞|🙋|🥝|🕋|👮|🚿|🏜️|👃|🎸|😠|🚡|🛀|🌛|🚑|🦨|🏨|🎙️|🧙|🎛️|🚬|📒|🙎|🟫|🐶|🤍|🌝|🍏|🌉|🤬|😷|🦒|e|🎉|W|🦼|🛁|🩲|🥴|🚘|👍|😰|🌱|🐲|🧫|👦|🧨|🛸|🍳|🥔|🦛|🕌|J|😡|🥬|🥱|🍾|🧻|👯|🗜️|💪|🐩|👕|🦏|🛩️|🤦|🗄️|😵|🥟|🪂|👥|🎳|👀|🍿|📏|🚒|🗡️|🍒|🎮|🤯|🐢|🍠|🖼️|🤢|🥯|🧤|🧰|👣|🌸|😌|t|🚋|🌹|9|🔑|🏈|👖|🗝️|👊|🚇|🏰|E|📌|🦪|🦖|🧐|G|📰|🦷|🧛|🐓|🛤️|🦥|🙊|🧿|🍀|🟦|🔫|😭|💐|💑|🍍|🙂|🎁|🐧|🥉|🌄|🧽|🌼|🚄|😄|😛|🖌️|🙇|🕰️|🤹|🏥|3|🎌|🤭|🧔|🐮|🦙|💼|🐙|6|🐬|🖊️|💨|👂|🏀|🥎|🥁|🙁|🌶️|🍗|🦡|👾|😇|🔆|💜|H|🦿|😣|💛|🎂|🕹️|🍫|🔺|📉|🟢|🍱|🔴|b|🥌|🐏|📦|🏵️|💥|🤡|🖲️|👷|😪|🚉|💿|🏟️|k|🦻|🕷️|🔘|🕳️|💂|💤|🎪|🎲|📘|📪|S|🛌|😏|🦆|🌀|🦢|🛑|5|🐽|8|🧾|🏭|🌎|🤫|😻|0|🗞️|🧃|🍝|🔭|🏓|🍵|🤲|j|🏏|🤼|🌈|🍎|👜|🤿|🍮|😓|🟣|😕|🌂|💮|👋|💳|🎦|🥃|🥏|🔨|q|💽|🔌|🔵|📓|📈|🕴️|😖|🧆|m|🚕|🌷|🎠|📽️|🚌|🌵|🤞|🦩|🧷|🥓|🐜|🗂️|🥐|🐐|📯|🤎|🤐|🍌|🧯|🏁|🎥|😀|🤒|C|😸|🏙️|🤚|🎺|🧄|2|🍕|🤗|🏦|🍘|💅|🦇|🦁|🚫|M|🌟|🐨|👤|🥚|🦶|🏆|😢|🍊|🤘|🟧|🥣|🛕|🐰|👠|🥍|🌃|🍂|🏢|📕|🥅|🥤|👔|🕵️|🧊|💸|🐹|🧘|🦸|🐗|🔪|😑|🧎|🍻|🛎️|🎖️|🗻|🍪|🕯️|R|📞|📺|🛶|🛬|🔩|🦃|🧵|👢|🥂|🦀|🎚️|🌞|🛹|📀|N|🤶|🗽|🐂|📔|👑|🎎|🦧|🕊️|🌡️|😝|🐠|🦚|🏐|🥒|🥻|🍖|🥡|🦋|🏅|🐔|🏉|💲|🤥|🍛|🧉|🌊|🧸|🏔️|📊|🐵|🥳|🏮|🐯|😚|🚎|🚥|🥺|🚚|🚜|🦮|🏣|🟥|🧒|🐼|👴|🖇️|🎣|🥇|U|🥛|🎴|🗿|🐃|🖤|🎋|Y|😘|🦜|🚊|🏝️|g|🤣|🎾|🥙|📛|📮|🚂|🚔|👟|🥢|P|🚏|r|🎗️|🖐️|🤴|🤕|🦉|🏎️|🧥|🥥|🐝|🚍|🎊|🧲|😍|🐞|🚐|🍶|🚅|🖍️|🧖|🧺|🗣️|😦|u|🎀|🥄|🎹|🏺|😋|👇|🤙|💷|🌺|🙉|🐾|O|🍅|🥪|w|😞|🤝|🧑|🙆|📑|👰|🏡|🗓️|😆|d|🥵|7|🤪|👶|👁️|🍚|🔮|🎄|🤮|🔊|🧚|📠|🌭|🎰|🛋️|😉|🧝|🎤|💇|🛡️|🧩|🤷|🌴|🎇|🦽|🏖️|🥮|🏚️|😔|🌿|🎷|🔱|🐴|💏|🚖|🪀|😱|🦓|🚆|😮|🤨|👳|🐣|🏷️|🐥|🗺️|A|😳|🚧|🦟|👩|🤜|💠|💃|🙏|🐎|🥨|🦘|🏸|🔧|📹|👘|🗳️|🏊|🙅|💦|👱|🎐|🐤|🚛|📍|🥗|🎟️|🍺|🌚|L|🥭|z|🐱|🍇|🦠|🏒|🦎|💣|🛢️|😈|📢|😥|👏|🌪️|🦄|🏘️|💌|👙|🌫️|🔰|🖱️|🐦|😂|I|📚|🎩|😗|🏛️|🔖|🤓|🛍️|🍨|👄|🧅|🐒|💉|🧼|👗|🦅|💱|📧|🍹|💫|🧏|🌅|🍲|😬|🔍|🩺|🔦|1|🦕|📂|🍰|🍋|💆|🎯|🥠|🙄|👽|🐭|🦊|💭|🛏️|🍞|🤤|🐉|💙|👆|💊|💋|🦈|🐘|🛵|🤽|🐌|🏬|🪔|🐕|📣|h|🦑|🕓|🥜|🟠|🐋|o|🏄|👿|🔷|📡|😊|🥦|🥈|🚨|🏇|📐|🤾|🚝|🔥|🥾|🛠️|🦂|😲|x|🦺|🗼|📻|🧢|📆|🌮|🥞|🚵|👐|🗒️|🐫|🚽|👨|D|🍟|🏋️|📁|a|📎|🐍|🍉|🛳️|🦔|f|🏃|🥶|🍁|🍽️|🧇|🚸|👻|🦌|😃|📱|🎭|🦦|🎧|🤳|🏕️|🎵|🏌️|🤠|🐀|Q|📅|🍔|🙍|🧣|😒|👒|🛒|🤸|💚|🐅|🧭|🧮|💢|🩱|💰|💓|T|🎅|🐚|👧|🚲|🧟|🌌|🙌|💒|🤰|🎍|🥫|🖨️|🏪|🤩|🧗|🐿️"

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