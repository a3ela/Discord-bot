# 🦅 Sylus - Love and Deepspace Discord Bot

A custom AI Discord bot that brings the dangerous, possessive, and flirtatious energy of **Sylus from Love and Deepspace** directly into your server or Direct Messages. Built with `discord.js` and powered by an OpenAI-compatible LLM (like Grok or Groq).

## ✨ Features
* **In-Character AI:** Perfectly mimics Sylus’s dark romance personality. He uses his canon nicknames (Kitten, Sweetie, Princess) and speaks in short, sultry, or commanding sentences.
* **Role-Based Memory:** Sylus reads server roles to dynamically change his behavior. He acts sweet and protective toward female-identifying users, and cold and dismissive toward male-identifying users.
* **DM Support:** Users can slide into his Direct Messages for private 1-on-1 conversations.
* **Unprompted Interactions:** In a server, he will reply when tagged, but he also has a 5% chance to chime into the conversation uninvited—because the leader of Onychinus does what he wants.

---

## 🛠️ Prerequisites
Before running this bot, you need:
1. **Node.js** installed on your machine.
2. A **Discord Bot Token** from the [Discord Developer Portal](https://discord.com/developers/applications).
3. An **API Key** from your chosen AI provider (e.g., [Groq](https://console.groq.com/) for a free tier, or [xAI/Grok](https://console.x.ai/) for premium).

## 🚀 Installation & Setup

**1. Install Dependencies** Open your terminal in the project folder and install the required packages:
\`\`\`bash
npm install discord.js openai
\`\`\`

**2. Configure your Secrets** Create a file named \`config.json\` in the root directory and add your credentials:
\`\`\`json
{
  "token": "YOUR_DISCORD_BOT_TOKEN_HERE",
  "apiKey": "YOUR_AI_API_KEY_HERE"
}
\`\`\`

**3. Discord Developer Portal Settings** For Sylus to function correctly, you **must** enable the following **Privileged Gateway Intents** in the Discord Developer Portal under the "Bot" tab:
* ✅ Presence Intent (Optional but recommended)
* ✅ Server Members Intent (Required for reading roles/gender)
* ✅ Message Content Intent (Required to read messages)

Ensure your bot has **Guild Install** and **User Install** checked under the "Installation" tab so he can be added to servers and accept DMs.

## ⚙️ Server Setup (Crucial for Gender Logic)
To trigger the correct personality, the Discord server **must** have roles set up.
* **Female/Sweetie Trigger:** The user needs a role named exactly `She/Her`, `Girl`, `Wife`, or `Sweetie`.
* **Male/Rival Trigger:** The user needs a role named exactly `He/Him`, `Boy`, or `Rival`.
*(If no roles are found, he defaults to treating the user as a female Hunter.)*

## 💻 Running the Bot
Start the bot by running the following command in your terminal:
\`\`\`bash
node index.js
\`\`\`
If everything is set up correctly, your terminal will display:  
**`Ready! Logged in as Sylus - Sylus is online and watching.`**

---
*Welcome to the N109 Zone.*
