require('dotenv').config();
const { Client, IntentsBitField, EmbedBuilder } = require('discord.js');
const getWeather = require('./getWeather.js')

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`);            //确保机器人正常在线
})

client.on('messageCreate', (message) => {
    if (message.author.bot) return; // Check if the message sender is a bot

    //reply hey and pong
    if (message.content === 'hello') {
        message.reply('Hey!');
    }
    if (message.content === 'ping') {
        message.reply('pong')
    }

    //generate a random number
    if (message.content === 'random') {
        const randomNum = Math.floor(Math.random() * 100) + 1;
        message.channel.send(`随机数: ${randomNum}`);
    }

    //reply current time
    if (message.content === '时间' || message.content === 'time') {
        const currenttime = new Date();
        message.channel.send(`当前时间是:${currenttime}`);
    }
})

client.on('interactionCreate', (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    //reply hey and pong
    if (interaction.commandName === 'hey') {
        interaction.reply('hey!');
    }
    if (interaction.commandName === 'ping') {
        interaction.reply('pong!');
    }

    //add two numbers
    if (interaction.commandName === 'add') {
        const num1 = interaction.options.get('first-number').value;
        const num2 = interaction.options.get('second-number').value;

        interaction.reply(`The sum is ${num1 + num2}`);
    }

    if (interaction.commandName === 'weather') {
        getWeather(interaction)
            .then(weatherData => {
                interaction.reply(weatherData);
            })
            .catch(error => {
                console.error(error);
            });

    }


    if (interaction.commandName === 'embed') {
        const embed = new EmbedBuilder()
            .setTitle('embed tittle')
            .setDescription('This is an embed description')
            .setColor('Random')
            .addFields({ name: 'field tittle', value: 'some random value', inline: true },
                { name: '2nd field tittle', value: 'some random value', inline: true })
        interaction.reply({ embeds: [embed] });
    }
});

client.on('messageCreate', (message) => {
    if (message.content === 'embed') {                                //生成一些小东西
        const embed = new EmbedBuilder()
            .setTitle('embed tittle')
            .setDescription('This is an embed description')
            .setColor('Random')
            .addFields({ name: 'field tittle', value: 'some random value', inline: true },
                { name: '2nd field tittle', value: 'some random value', inline: true });

        message.channel.send({ embeds: [embed] });
    }
})

client.login(process.env.TOKEN);    //bot token on .env file