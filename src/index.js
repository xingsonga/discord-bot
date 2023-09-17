require('dotenv').config();
const { Client , IntentsBitField,EmbedBuilder } = require ('discord.js');

const client = new Client({
    intents:[
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});

client.on('ready',(c)=>{
    console.log(`${c.user.tag} is online.`);            //确保机器人正常在线
})

client.on('messageCreate', (message) =>{
    if(message.author.bot){
    return;
    }
    if(message.content ===  'hello'){
    message.reply('Hey!');                              // hey and hello
    }
    if(message.content === 'ping'){
    message.reply('pong')                               //ping and pong
    }
    if(message.content === 'random'){
    const randomNum =Math.floor(Math.random()*100)+1;   //生成随机数
    message.channel.send(`随机数: ${randomNum}`);
    }
    if(message.content === '时间'||message.content === 'time'){
    const currenttime = new Date();
    message.channel.send(`当前时间是:${currenttime}`);    //回复时间的行为
    }
    if(message.content === 'weather' || message.content === '天气')
    {    
    const state = new weather;
    message.channel.send('当前天气为：${state}');
    }
})

client.on('interactionCreate',(interaction)=>{
    if(!interaction.isChatInputCommand()) return;

    if(interaction.commandName === 'hey'){
    interaction.reply('hey!');                          //hey and hello
}
if(interaction.commandName === 'ping'){
    interaction.reply('pong!');                         // ping and pong
}
if(interaction.commandName === 'add'){
    const num1 = interaction.options.get('first-number').value;
    const num2 = interaction.options.get('second-number').value;

    interaction.reply(`The sum is ${num1 + num2 }`);
    }
    if(interaction.commandName === 'embed'){                            //计算两个数之和
        const embed = new EmbedBuilder()
        .setTitle('embed tittle')
        .setDescription('This is an embed description')
        .setColor('Random')
        .addFields({ name: 'field tittle', value: 'some random value' , inline: true },
        { name: '2nd field tittle', value: 'some random value' , inline: true })
        interaction.reply({ embeds: [embed] });
        }
});

client.on('messageCreate',(message)=>{
    if(message.content === 'embed'){                                //生成一些小东西
        const embed = new EmbedBuilder()
        .setTitle('embed tittle')
        .setDescription('This is an embed description')
        .setColor('Random')
        .addFields({ name: 'field tittle', value: 'some random value' , inline: true },
        { name: '2nd field tittle', value: 'some random value' , inline: true });

        message.channel.send({ embeds: [embed] });
    }
})

client.login(process.env.TOKEN);            //机器人密匙