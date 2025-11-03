# Drevshell

Drevshell is a **Node.js reverse shell tool** that uses Ngrok to create a public listener and generate payloads that can be executed on a target.  
This tool is designed for **educational purposes and legal penetration testing**, meaning it should only be used in controlled environments or your own network.

> ⚠️ WARNING: Drevshell is **for learning and legal testing only**. Using it on unauthorized systems is illegal and strictly prohibited.

---

## Description

Drevshell helps you understand the concept of **reverse shells**, TCP listeners, and how payloads work on a target machine.  
With Ngrok integration, the listener can be accessed from the internet without configuring port forwarding or exposing your public IP.  
It also provides a simple HTTP server to safely download the payload.

Drevshell is ideal for:

- Practicing penetration testing in a safe lab.
- Learning TCP listener and reverse shell concepts.
- Experimenting with Node.js, Ngrok, and Express.

---

## Key Features

- 🟢 **Dynamic TCP Listener**: Waits for incoming connections from the target.
- 🟢 **Payload Generator**: Creates a Node.js payload to run on the target.
- 🟢 **Ngrok Integration**: Exposes the listener publicly without router configuration.
- 🟢 **Payload Download Server**: Provides a URL to download the payload.
- 🟢 **Cross-Platform**: Works on Windows (`cmd.exe`) and Linux/macOS (`/bin/sh`).

---

## Installation

1. **Clone the repository:**
```bash
git clone https://github.com/ZeltNamizake/drevshell
cd drevshell
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
* Copy  `.env.example`  to  `.env`
* Fill in the values:
```env
IP_ADDRESS=127.0.0.1
PORT_TCP=4444
PORT_HTTP=8000
NGROK_AUTHTOKEN=your_ngrok_authtoken
```

## Usage

1. Run Drevshell:
```bash
node drevshell.js
```

2. The console will show:
* HOST and PORT for the listener via Ngrok
* Payload Download URL

3. Run the payload on the target (only in a safe lab environment):
```bash
node payload
```

4. Once the payload is executed, a reverse shell will appear in the Drevshell console.

## Example Output
```less
[+] Listener activated and payload successfully created
[+] HOST: 0.tcp.ngrok.io, PORT: 12345
[+] Payload Download Link: https://abcd1234.ngrok.io/payload
[*] Waiting for victim connection...
```

## Notes 
Drevshell is meant for learning and educational purposes, so it is also a great reference to understand:
* TCP networking in Node.js
* Reverse shell concepts
* Ngrok integration for public tunneling
* Express-based file download server

###### Created by  `ZeltNamizake (Driyas)`
