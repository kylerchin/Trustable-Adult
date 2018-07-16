const commands = require('./bags/commands');
const developers = require('./bags/developers');
const { discord } = require('./client');
const { prefix: getPrefix } = require('./servers');
const { prepare } = require('./helpers');
const swears = require('./../modules/swears/swears.js');
const pickupline = require('./../modules/pickupline.js');
// Initial stores for all Commands.
const supported = Object.keys(commands);
const totalCommands = supported.length;
const aliases = {};
let aliasKeys = [];

// Compile all Aliases.
for (let c = 0; c < totalCommands; c++) {
    const cmd = commands[supported[c]];
    const total = cmd.aliases.length;

    for (let a = 0; a < total; a++) {
        aliases[cmd.aliases[a]] = supported[c];
    }
}
aliasKeys = Object.keys(aliases);

/**
 * Parses incoming messages and, if needed, executes commands.
 *
 * @param {String} msg
 *
 * @return {Boolean}
 */

module.exports = msg => {
    // Fetch the Prefix used for this Server (May be custom).
    const isDm = msg.guild === null;
    const isMention = msg.isMentioned(discord.user);
    let prefix = getPrefix(isDm ? null : msg.guild.id);
    let { content } = msg;

    // Allow executing commands via mentioning the Bot instead of the prefix.
    if (isMention) {
        const split = content.split(' ');
        prefix = `${split[0]} `;
    }

    console.log("Author: " + msg.author + "; Channel:" + msg.channel + "; Message: " + msg.content);

      //check all msg against a bad kid list list
      if (msg.guild) {
        //format txt into readable format
        var string = msg.content;
        var word = string.split(" ");
        var lower = string.toLowerCase();

        //check for sadness
        var sadArray = ["I'm sorry you're feeling sad. I'm here for you if you need anything.","If you want to talk, I'm a good listener!","Oh,no. It may not be much, but let me know if there is anything I can do for you.","I wish I had arms so I could give you a hug. But for now, maybe a joke or some music might help."]

        if (lower.includes('sad') || lower.includes("depression") || lower.includes("depressed") || lower.includes("upset") || lower.includes("feel down") || lower.includes("feeling down") || lower.includes("under the weather")) {
          msg.channel.send(sadArray[Math.floor(Math.random() * sadArray.length)]);
          return true;
        }

        if (lower.includes('hello') && lower.includes('world')) {
          msg.channel.send("Now you're speaking my language 😄");
          return true;
        }

        if (lower.includes('pick') && lower.includes('up') && lower.includes('line')) {
          msg.channel.send(pickupline[Math.floor(Math.random() * pickupline.length)]);
          return true;
        }

        function suicideContact() {
    msg.author.send("You're not alone. Confidential help is avaliable for free");
    msg.author.send({embed: {
  color: 3447003,
  description: "National Suicide Hotline",
  author: {
    name: "National Suicide Hotline 24/7",
    icon_url: "https://static.logic0x.com/baseline-phone-24px.svg"
  },
  fields: [
      {
        name: "Need help? United States:",
        value: "## 1 (800) 273-8255"
      }
    ],
}});
}

if (lower.includes("kill myself") || lower.includes("hurt someone") || lower.includes("suicide") || lower.includes("killmyself") || lower.includes("killme") || lower.includes("don't want to live anymore") || lower.includes("want to die now")) {
  console.log("test 0x12")
    suicideContact();
}

        if (msg.author == "<@460625745169874964>" && (content.length > 0)) {
          msg.author.send(content);
        }

      //console.log(lower);
      //console.log(string);
      //console.log(swears);
      //loop 1000 times
      for (i = 0; i < 2000; i++) {
          //checks through all values in the list.
          if (content.indexOf(swears.list[i]) >= 0)
          {
            //If really bad word is true
              console.log(i);
              console.log(swears.list[i]);
              //remove message from channel
              msg.delete();
              //fansy dancy msg
              //msg.channel.send("Hey! Your on santa's bad list now!");
              break;
        }
    }
}

// If the message doesn't start with the prefix then we don't care about it.
if (content.indexOf(prefix) !== 0) {
        return false;
    }

    // Parse the message content in to command and parameters.
    content = content.substr(prefix.length);
    const lines = content.split('\n');
    const paramsRaw = lines[0].split(' ');
    let cmd = paramsRaw[0].toLowerCase();
    paramsRaw.shift();
    lines.shift();

    // Check if the Command is supported or is an alias.
    if (supported.indexOf(cmd) === -1) {
        cmd = '';

        if (aliasKeys.indexOf(cmd) !== -1) {
            cmd = aliases[cmd];
        }
    }

    if (
        // Double-check the user specified a command.
        !cmd.length ||
        // Check that the user can run this command if Guild Owner only.
        (commands[cmd].guildOwnerOnly && parseInt(msg.member.guild.ownerID) !== parseInt(msg.member.user.id)) ||
        // Check that the command is enabled.
        (!commands[cmd].enabled && developers.indexOf(parseInt(msg.author.id)) === -1)
    ) {
        return false;
    }

    // Fetch the command instance.
    const command = commands[cmd];

    // Check that the Bot & User have permission to execute the command.
    const perms = {
        bot: {},
        user: {},
    };
    const pass = {
        bot: true,
        user: true,
    };

    if (!isDm && msg.channel.type === 'text') {
        for (let i = 0; i < 2; i++) {
            const store = i === 0 ? 'bot' : 'user';
            const user = i === 0 ? discord.user : msg.member;
            const rawPerms = command.perms[store];
            const compiledPerms = rawPerms.required.concat(rawPerms.optional);
            const totalPerms = compiledPerms.length;

            for (let p = 0; p < totalPerms; p++) {
                const perm = compiledPerms[p];
                const isRequired = rawPerms.required.indexOf(perm) !== -1;

                perms[store][perm] = msg.channel.permissionsFor(user).has(perm);

                if (!perms[store][perm] && isRequired) {
                    pass[store] = false;
                }
            }
        }
    }

    if (!pass.bot) {
        msg.channel.send(prepare(`Sorry, I need the following permission(s) to do that:
\`${command.perms.bot.required.join(', ')}\``));
        return false;
    } else if (!pass.user) {
        msg.channel.send(prepare(`You need the following permission(s) to do that:
\`${command.perms.user.required.join(', ')}\``));
        return false;
    }

    // Check the Parameters are valid.
    const paramKeys = Object.keys(command.params);
    const totalParams = paramKeys.length;
    const params = {};
    const invalid = () => {
        let formatPrefix = '';

        if (!isDm && !isMention) {
            formatPrefix = prefix;
        }

        let message = `Valid format:

**${formatPrefix} ${cmd}`;

        for (let p = 0; p < totalParams; p++) {
            const param = command.params[paramKeys[p]];
            let range = `[${paramKeys[p]}]`;

            if (param.range) {
                range = param.range.join('/');
            }

            message += ` \`${range}\``;
        }

        message += '**';

        return msg.channel.send(prepare(message));
    };

    for (let p = 0; p < totalParams; p++) {
        const param = command.params[paramKeys[p]];
        let given = paramsRaw[p];

        if (given === undefined || given === null) {
            if (param.required) {
                invalid();
                return false;
            } else if (param.default !== undefined) {
                given = param.default;
            }
        }

        // Check whether the parameter is a full parameter (Entire param inc. spaces).
        if (param.full) {
            given = paramsRaw.join(' ');
        }

        // Check that the parameter is within range, if specified.
        if (
            param.range &&
            (param.range.indexOf(given) === -1)
        ) {
            invalid();
            return false;
        }

        params[paramKeys[p]] = given;
    }

    // Now that all checks have passed - execute the Command!
    command.execute({
        msg,
        params,
        lines,
        perms,
        commands, // Purely for `help` command.
        is: {
            dm: isDm,
            mention: isMention,
        },
    });

    return true;
};
