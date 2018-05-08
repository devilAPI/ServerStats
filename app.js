const Discord = require("discord.js");


const client = new Discord.Client();


const config = require("./config.json");



client.on("ready", () => {
  
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  console.log("Starting DiscordBot\nNode version: " + process.version + "\nDiscord.js version: " + Discord.version);
  console.log("Invite Url: https://discordapp.com/oauth2/authorize?&client_id=" + client.user.id + "&scope=bot&permissions=68608");
 
client.user.setActivity(`>help - ${client.guilds.size} servers`);
});

client.on("guildCreate", guild => {
 
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`>help - ${client.guilds.size} servers`);
});

client.on("guildDelete", guild => {
 
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`>help - ${client.guilds.size} servers`);
});


client.on("message", async message => {
 
  

  if(message.author.bot) return;
  

  if(message.content.indexOf(config.prefix) !== 0) return;
  
 
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if(command === "info") {
    const embed = {
      "title": "Bot Information",
      "description": "Information about ServerStats",
      "url": "",
      "color": 155953,
      "timestamp": "",
      "footer": {
        "icon_url": "https://i.imgur.com/zisQPDP.png",
        "text": "ServerStats"
      },
      "thumbnail": {
        "url": "https://i.imgur.com/zisQPDP.png"
      },
      "fields": [
        {
          "name": "Bot Creator",
          "value": "trashbag#0001",
          "inline": true
        },
        {
          "name": "Library",
          "value": "discord.js",
          "inline": true
        },
        {
          "name": "Prefix",
          "value": ">",
          "inline": true
        },
        {
          "name": "Help Command",
          "value": "`>help`",
          "inline": true
        }
      ]
    };
    message.channel.send({ embed });
  }

  if(command === "sinfo") {
    const embed = {
      "title": "Server Information",
      "description": "Information about " + message.guild.name,
      "url": "",
      "color": 155953,
      "timestamp": "",
      "footer": {
        "icon_url": message.guild.iconURL,
        "text": message.guild.name
      },
      "thumbnail": {
        "url": message.guild.iconURL,
      },
      "fields": [
        {
          "name": "Member Count",
          "value": message.guild.memberCount,
          "inline": true
        },
        {
          "name": "Verification Level",
          "value": message.guild.verificationLevel,
          "inline": true
        },
        {
          "name": "Region",
          "value": message.guild.region,
          "inline": true
        },
        {
          "name": "Guild ID",
          "value": message.guild.id,
          "inline": true
        },
        {
          "name": "Channel Amount",
          "value": message.guild.channels.size,
          "inline": true
        },
        {
          "name": "Content Filter",
          "value": message.guild.explicitContentFilter,
          "inline": true
        },
        {
          "name": "Is Guild Large?",
          "value": message.guild.large,
          "inline": true
        },
        {
          "name": "Created",
          "value": message.guild.createdAt,
          "inline": true
        },
      ]
    };
    message.channel.send({ embed });
  }

  if(command === "general") {
    const embed = {
      "title": "General Commands",
      "description": "General commands for ServerStats Bot.",
      "url": "",
      "color": 155953,
      "timestamp": "",
      "fields": [
        {
          "name": "General Commands",
          "value": "**>help** - get a list of commands. \n**>info** - get information about the bot. \n**>invite** - get the bots invite URL. \n**>ping** - see the bots response time. \n**>support** - join the bots support server."
        }
      ]
    };
    message.channel.send({ embed });
  }

  if(command === "stats") {
    const embed = {
      "title": "Statistics Commands",
      "description": "Statistics commands for ServerStats Bot.",
      "url": "",
      "color": 155953,
      "timestamp": "",
      "fields": [
        {
          "name": "General Commands",
          "value": "**>sinfo** - get server information. \n**>members** - get server member count."
        }
      ]
    };
    message.channel.send({ embed });
  }


  if(command === "help") {
    const embed = {
      "title": "",
      "description": "",
      "url": "",
      "color": 155953,
      "timestamp": "",
      "fields": [
        {
          "name": "General Commands",
          "value": "To view general commands, do **`>general`**"
        },
        {
          "name": "Statistics Commands",
          "value": "To view Statistics commands, do **`>stats`**"
        }
      ]
    };
    message.channel.send({ embed });
  }
  
  if(command === "invite") {
    const embed = {
      "title": "Bot Invite Link",
      "description": "https://discordapp.com/oauth2/authorize?&client_id=" + client.user.id + "&scope=bot&permissions=68608",
      "url": "",
      "color": 155953,
      "footer": {
        "icon_url": "",
        "text": ""
      },
    };
    message.channel.send({ embed });
  }

  if(command === "support") {
    const embed = {
      "title": "Bot Support Server",
      "description": "https://discord.gg/f5nZMcv",
      "url": "",
      "color": 155953,
      "footer": {
        "icon_url": "",
        "text": ""
      },
    };
    message.channel.send({ embed });
  }
  
  if(command === "members") {
    const embed = {
      "title": "Current Member Count",
      "description": message.guild.memberCount ,
      "url": "",
      "color": 155953,
      "footer": {
        "icon_url": "",
        "text": ""
      },
    };
    message.channel.send({ embed });
  }

  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{}); 
    message.channel.send(sayMessage);
  }
});

client.login(config.token);