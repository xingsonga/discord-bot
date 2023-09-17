require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const commands = [
  {
    name: 'hey',
    description: 'Replies with hey!',
  },
  {
    name: 'ping',
    description: 'pong!',
  },
  {
    name: 'add',
    description: 'Adds two members.',
    options: [
      {
        name: 'first-number',
        description: 'This is the first number.',
        type: ApplicationCommandOptionType.Number,
        choices: [
          {
            name: 'one',
            value: 1,
          },
          {
            name: 'two',
            value: 2,
          },
          {
            name: 'three',
            value: 3,
          },
        ],
        required: true,
      },
      {
        name: 'second-number',
        description: 'This is the second number.',
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ]
  },
  {
    name: 'weather',
    description: 'get weather',
    options: [
      {
        name: 'city',
        description: 'enter your city',
        type: ApplicationCommandOptionType.String,
        required: true,
      },
      {
        name: 'country',
        description: 'enter your country(using ISO 3166 Alpha-2 code)',
        type: ApplicationCommandOptionType.String,
      }
    ]
  },
  {
    name: 'embed',
    description: 'send an embed!',
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Registering slash commands...');

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    )

    console.log('Slash commands were registered succefully!');
  } catch (error) {
    console.log(`There was an error: ${error}`);
  }
})();