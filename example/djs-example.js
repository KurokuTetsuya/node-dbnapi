const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true, fetchAllMembers: false });
const { Client } = require("node-dbnapi");
const dbn = new Client("Your dbn token", "client id", "your user id")

bot.on("ready", () => {
    console.log("Bot is online!")
})

bot.on("message", async (message) => {

    let prefix = "your prefix"; // Change with your prefix
    let args = message.content.slice(prefix.length).trim().split(/ +/g);
    let command = args[0].toLowerCase();
    if (message.author.bot || !message.guild || !message.content.startsWith(prefix)) return; // Return if message is from bot or message is not from guild and message not starts with prefic
    
    // Commands 
    if (command === "dbn") {
       let mention = message.mentions.members.first() || message.guild.members.get(args[1]);
       if (mention.user.bot === false) return message.channel.send("Please mention bot, not a user.") // Return if mention is not a bot
       let dbnBot = await dbn.fetchUser(mention.user.id)
       if (dbnBot === undefined) return message.channel.send("This bot isn't registered in DiscordBors Nation");
       let ownerBot = await bot.fetchUser(dbnBot.metadata.ownerID)
       message.channel.send(`
Bot : ${dbnBot.tag} (${dbnBot.id})
Created At : ${dbnBot.createdAt}
Prefix : \`${dbnBot.metadata.prefix}\`
Owner Bot : ${ownerBot.tag} (${ownerBot.id})
Accepted : ${dbnBot.metadata.accepted ? "Yes." : "No."}
       `)
    } else if (command === "botlist") {
        let mention = message.mentions.members.first() || message.guild.members.get(args[1]);
       if (mention.user.bot === true) return message.channel.send("Please mention user, not a bot.") // Return if mention is not a user
       let user = await dbn.fetchUser(mention.user.id);
       if (user.bots.length === 0) return message.channel.send("This user isn't have an approved bot in DiscordBots Nation.");
       let embed = new Discord.RichEmbed().setColor("RANDOM");
       let arr = [];
       for (const bots of user.bots) {
           let fetched = await bot.fetchUser(bots.botID)
           arr.push(fetched.tag)
       }
            embed.addField(`List bot of ${mention.user.tag}`, arr.join(", "))
            message.channel.send(embed)
    }
})

bot.login("Bot token").catch(console.error);