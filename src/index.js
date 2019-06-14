import Discord from "discord.js";
import ScriptServer from 'scriptserver';
import dotenv from "dotenv";

const client = new Discord.Client();

dotenv.config();
client.login(process.env.BOT_TOKEN);

const server = new ScriptServer({
  core: {
    jar: './server/server.jar',
    args: ['-Xmx2G'],
    rcon: {
      port: '25575',
      password: process.env.RCON_PASSWORD
    }
  }
});

client.on("message", async message => {
  const firstQuote = message.content.trim().split(/ |　/g)[0];

  if (firstQuote === "MC") {
    const command = message.content.trim().split(/ |　/g).slice(1, message.content.trim().split(/ |　/g).length);

    server.send(command.join(" "));
  }

  server.send(message.content);
});

server.start();
