# Pluto - Markov Telegram Bot
Just another Telegram bot based on the Markov chain generation method.

This bot reads messages from a group and periodically speaks generating random messages.

This is a modified version of [Marte](https://github.com/inixioamillano/marte-markov-telegram-bot) which includes several differences in the markov generation algorithm. Like using a variable order 2 markov generation algorithm and having sentences which end less abruptly

<div>
</div>
<div align="center">

[![Generic badge](https://img.shields.io/badge/Version-0.1.2-green.svg)]()
[![Maintenance](https://img.shields.io/badge/Maintained%3F-Yes-green.svg)](https://github.com/LuisMayo/pluto-markov-telegram-bot/graphs/commit-activity)
[![Generic badge](https://img.shields.io/badge/BotUp-Yes-green.svg)](https://telegram.me/pluto_markov_bot/)

</div>

<div align="center">

[![GitHub contributors](https://img.shields.io/github/contributors/LuisMayo/pluto-markov-telegram-bot.svg)](https://github.com/LuisMayo/pluto-markov-telegram-bot/graphs/contributors/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/LuisMayo/pluto-markov-telegram-bot/pulls)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/LuisMayo/pluto-markov-telegram-bot.svg)](https://github.com/LuisMayo/pluto-markov-telegram-bot/pull/)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr-closed/LuisMayo/pluto-markov-telegram-bot.svg)](https://github.com/LuisMayo/pluto-markov-telegram-bot/pull/)
</div>


<div align="center">

![Uses Node Js](https://img.shields.io/badge/node.js%20-%2343853D.svg?&label=Uses&style=for-the-badge&logo=node.js)

[![Try this bot on Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white&label=Try%20this%20bot%20on)](https://t.me/pluto_markov_bot)

</div>

## Launch

Configure the environment variables in the .env file. You'll need a Telegram API key. You can easily generate it with the Telegram BotFather bot ([@BotFather](https://t.me/BotFather)).

After correctly configuring the token, the database URL and the encryption key, you can run the bot 

```sh
npm install # Just the first time
npm start
```

## Demo

To try it out, you can add the [bot](https://telegram.me/pluto_markov_bot) to any of your Telegram groups!

