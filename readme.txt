To run for your own server, edit auth.json to contain the following three parameters:
- "token" : Your bot's TOKEN.
- "clientId" : Your bot's APPLICATION ID.
- "guildId" : Your server's DISCORD ID.

Afterwards, run the `update command structure.bat` file.

Invite link: https://discord.com/api/oauth2/authorize?client_id=1017946076784906392&permissions=2147560448&scope=bot

Admin permissions to control the bot rely on you having any role named "Narrator" or "admin".
Admins have access to the following commands:

/shuffle-ids (this changes everyone's ids to never-before used ones)
/view-ids (lists everyone's currently available ids, this message will only be shown to the admin who executed the command)
/set-players <list of pings> (ping every user who you want to be able to use /anon)
/save (will save and post the current state as a file that anyone in that channel can see. This file includes every currently registered user, their current ids, how many ids per user default 4, whether or not ids are allowed or if it is only true anon, and a list of every unused id)
/load <file> (upload a save state file from your computer and it will load into memory. This has some basic error handling but if you upload an image or something it will probably still crash the bot)

Regular users who have been listed as Players have access to the following command:

/anon <message> (sends a message anonymously)

To-Do List:
- Allow Narrator to see Player Names with `/view-ids`.
- Allow Players to set an alias, then type messages afterwards. That way they won't have to specify an alias with every message.
- Implement autosave functionality.
- Allow the Narrator to easily add or subtract Players from the Player List.

Known Issues:
- A crash once occurred, possibly caused by overload.
- Bot allows people to send anonymous messages in chat rooms they otherwise are only spectating in.