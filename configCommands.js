const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { clientId, guildId, token } = require('./auth.json');

const commands = [
	new SlashCommandBuilder()
		.setName('anon-shuffle-ids')
		.setDescription('Randomizes everyone\'s anon ids'),
		
	new SlashCommandBuilder()
		.setName('anon-view-ids')
		.setDescription('View everyone\'s anon ids'),
		
	new SlashCommandBuilder()
		.setName('anon-save')
		.setDescription('Save state to file'),
		
	new SlashCommandBuilder()
		.setName('anon-load')
		.setDescription('Load state from file')
		.addAttachmentOption(option => option.setName('attachment').setDescription('Select a previous bot save file to upload.')
		.setRequired(true)),
		
	new SlashCommandBuilder()
		.setName('anon-set-players')
		.setDescription('Sets a list of all players who may use /anon (this will also shuffle everyones\' ids)')
		.addStringOption(option =>
			option.setName('player_list')
				.setDescription('Ping everyone to select (individually, not by role)')
				.setRequired(true)),
				
	new SlashCommandBuilder()
		.setName('anon')
		.setDescription('Sends an anonymous message in the current channel.')
		.addStringOption(option =>
			option.setName('message')
				.setDescription('The message to send anonymously.')
				.setRequired(true))
		.addChannelOption(option =>
			option.setName('destination')
				.setDescription('The channel to send it to.')
				.setRequired(false)),

	new SlashCommandBuilder()
		.setName('anon-help')
		.setDescription('Show bot usage.'),

	/*
	new SlashCommandBuilder()
		.setName('anon-quick')
		.setDescription('Sends an anonymous message in the current channel using your last alias.')
	//*/
				
]	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

// Removes commands
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);

// Adds commands	
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);
