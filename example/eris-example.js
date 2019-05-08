const Eris = require('eris');
const bot = new Eris.Client("bot token")
const { Client } = require("node-dbnapi");
const dbn = new Client("your dbn token", "client id", "your token")

bot.on("ready", () => {
    console.log("Bot is online!")
})

bot.on("messageCreate", async (message) => {

    let prefix = "your prefix"; // Change with your prefix
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args[0].toLowerCase();
    if (message.author.bot || !message.channel.guild || !message.content.startsWith(prefix)) return; // Return if message is from bot or message is not from guild and message not starts with prefic
    
    // Commands 
    if (command === "dbn") {
       let mention = message.mentions[0] || message.channel.guild.members.get(args[1]).user;
       if (mention.bot === false) return message.channel.createMessage("Please mention bot, not a user.") // Return if mention is not a bot
       let dbnBot = await dbn.fetchUser(mention.id)
       if (dbnBot === undefined) return message.channel.createMessage("This bot isn't registered in DiscordBors Nation");
       let ownerBot = await dbn.fetchUser(dbnBot.metadata.ownerID)
       message.channel.createMessage(`
Bot : ${dbnBot.tag} (${dbnBot.id})
Created At : ${dbnBot.createdAt}
Prefix : \`${dbnBot.metadata.prefix}\`
Owner Bot : ${ownerBot.tag} (${ownerBot.id})
Accepted : ${dbnBot.metadata.accepted ? "Yes." : "No."}
       `)
    } else if (command === "botlist") {
       let mention = message.mentions[0] || message.channel.guild.members.get(args[1]).user;
       if (mention.bot === true) return message.channel.createMessage("Please mention user, not a bot.") // Return if mention is not a user
       let user = await dbn.fetchUser(mention.id);
       if (user.bots.length === 0) return message.channel.createInvite("This user isn't have an approved bot in DiscordBots Nation.");
       let arr = [];
       for (const bots of user.bots) {
           let fetched = await dbn.fetchUser(bots.botID)
           arr.push(fetched.tag)
       }
            message.channel.createMessage(`
List Bot of ${mention.username} :
${arr.join(", ")}
            `)
    }
})

bot.connect().catch(console.error)