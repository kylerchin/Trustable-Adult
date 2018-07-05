# Chloe Discord Bot
Chloe Discord Bot

[![Discord Bots](https://discordbots.org/api/widget/462257314020327427.svg)](https://discordbots.org/bot/462257314020327427)

A multipurpose helpful bot with human interaction, top news, quotes, stock / crypto prices and charts, polls.

To activate this bot, mention it or use !c .

Chloe is a Discord bot by Weijing Wang and Kyler Chin.

Type ```!c help``` in the chat to get help.

Swearing is prohibited under this bot.

There are also chat features within the bot, like a regular ai assistant! 😄

## Commands

Commands must be prefixed with `!c` or @chloe. See below for examples.

### `price`

Use the `price` command to fetch stats from CoinMarketCap.

```
!c price btc
!c price stellar
!c price nano
```

### `convert`

Converts `to` in to `from`.

```
!c convert 10 btc nano
!c convert 10 ada eth
```

### `balance`

Returns the balance of the given Wallet. Currently supported currencies:

- `btc`
- `eth`
- `tokens` (Returns all ERC-20 Tokens)

```
!c balance btc 15urYnyeJe3gwbGJ74wcX89Tz7ZtsFDVew
!c balance tokens 0x57d90b64a1a57749b0f932f1a3395792e12e7055
```

### `top`

Returns the top `gainers`/`losers` for the given period. Valid periods:

- `1h`
- `24h`
- `7d`

```
!c top gainers 1h
!c top losers 7d
```

### `poll`

Creates a new Poll for people to vote on. Has very configurable options.

Specifying a Poll that has no options will add the 👍 and 👎 reactions for people to use:

```
!c poll Is the sky blue?
```

You can specify up to 10 options on new lines:

```
!c poll Which is your favourite animal?
Dog
Cat
Mouse
```

The above will give each option a letter of the alphabet, e.g. `A`, `B` and `C`, for the reactions. If you want to specify your own emojis for each option, you can do so:

```
!c poll Which is your favourite animal?
🐶) Dog
🐱) Cat
🐭) Mouse
```

You can also negate the text altogether and use just emojis:

```
!c poll Which is your favourite animal?
🐶
🐱
🐭
```

It is also possible to mix-and-max these options:

```
!c poll Which is your favourite animal?
Dog
🐱) Cat
🐭
```

**Note:** Whilst you can use custom emojis, please only use custom emojis from the server you're posting the poll in, otherwise it's unlikely the Bot will find them.

### `prefix`

Changes the Bot Prefix for this Server.

**Note:** Only the Server Owner can do this.

For example, using the following:

```
!c prefix .
```

Would mean that instead of `!c price btc` you would use `.price btc`.

If you want to end your prefix with a blank space (Such as the default `!c ` prefix), replace the space with `[space]`. E.g.:

```
!c prefix !c[space]
```

### `stats`

Print out statistical information about the current Server.

```
!c stats
```

### `flip`

Flips a coin. That's all.

```
!c flip
```

### `quote`

Output a random quote and it's author!

```
!c quote
```

### `dice`

Rolls a 6-sided dice.

```
!c dice
```

### `ping`

Returns the latency between Discord and the Bot.

```
!c ping
```

### `info`

Prints out Info text for the Bot. E.g.

```
!c info
```

### `help`

Prints out Usage text for the Chloe. E.g.

```
!c help
!c help price
```

## Development

### Requirements

- PostgreSQL
- NodeJS (8+)

### Instructions

### Environment Variables

Dependencies: NodeJS LTS or better, NPM

To install the package dependencies, use ```npm install```

Chloe uses `dotenv` for Env Var management. Copy the `.env.example` file to `.env` and use the guide below to fill out the variables:

- `DISCORD_TOKEN` - Your Discord Bot Token, found [here](https://discordapp.com/developers/applications/me).
- `DISCORDBOTS_TOKEN` [Optional] - Your DiscordBots.org API Key, used to inform DiscordBots of the Server Count.
- `ETHPLORER_TOKEN` - Your Ethplorer.io API Key. This can be left as `freekey`.
- `BUGSNAG_API_KEY` [Optional] - Your Bugsnag API Key for error reporting.
- `COMMAND_PREFIX` - The prefix that all Commands must be prefixed with.
- `CRYPTO_UPDATE_INTERVAL` - The milliseconds between querying CMC for new Cryptocurrencies.
- `INFO_UPDATE_INTERVAL` - The milliseconds between querying CMC for all market data.
- `STATS_PERSIST_INTERVAL` - The milliseconds between persisting the collected Statistical data.
- `POSTGRESQL_*` - Your PostgreSQL config.

First, get a discord bot token for the API here: https://github.com/reactiflux/discord-irc/wiki/Creating-a-discord-bot-&-getting-a-token. Then edit the file .env and paste in your token under the "token".

### Migrations

Chloe uses Migrations to make sure Database Integrity is maintained. Before developing with Chloe, you'll want to make sure you run the migrations via the following command:

```
npm run migrate
```

Additionally, this command should be run after every deployment to make sure your Database is up-to-date.

### Seeders

If it is your first time setting up Chloe, you'll need to run the Database Seeders to populate the Database with the initial data.

```
npm run seed
```

**ENJOY!!! :)**

## WE LIVE HERE:
# Impressiv Group Discord Server!

We have live trading floors and intelligence from 24/7 global markets. We share insight on trading strategy, stocks, cryptocurrency trading, Options, ETFs, Futures, commodities, Forex, Bonds, and Fixed income. We talk about the latest in buisness and technology, headlines and technical analysis from the smartest voices in the industry. We also discuss programming in our coding language channels, everything from game development, databases, python, js, Blockchain development, Dapps, etc. This server has a LOT OF BOTS, a place that people can build and test their own bots.
https://discord.gg/We9QexK
https://discordbots.org/servers/463565906711281694
