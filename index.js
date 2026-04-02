// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Partials } = require("discord.js");
const { OpenAI } = require("openai");
require("dotenv").config();

const token = process.env.DISCORD_TOKEN;
const xaiApiKey = process.env.XAI_API_KEY;

// 1. Initialize Grok (xAI) using the OpenAI package
// We change the baseURL so it points to Grok instead of ChatGPT
const grok = new OpenAI({
  apiKey: xaiApiKey,
  baseURL: "https://api.groq.com/openai/v1",
});

// 2. Create a new client instance with the CORRECT intents
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages, // Allows the bot to see new messages
    GatewayIntentBits.MessageContent, // Allows the bot to read the actual text (CRITICAL)
    GatewayIntentBits.GuildMembers, // Allows the bot to read user roles for the gender check
    GatewayIntentBits.DirectMessages, // Ensures it can see DMs
  ],
  partials: [
    Partials.Channel, // Required to receive direct messages
    Partials.Message,
  ],
});

// When the client is ready, run this code (only once).
client.once(Events.ClientReady, (readyClient) => {
  console.log(
    `Ready! Logged in as ${readyClient.user.tag} - Sylus is online and watching.`,
  );
});

// We will add the "Message Listener" (where he actually reads and talks) right here in the next step!

client.on(Events.MessageCreate, async (message) => {
  // 1. Ignore other bots (so they don't start looping)
  if (message.author.bot) return;

  // Is this a DM?
  const isDM = message.guild === null;
  const isTagged = message.mentions.has(client.user);
  const randomChance = Math.random() < 0.05;

  if (isDM || isTagged || randomChance) {
    // Show "Sylus is typing..." so it feels real
    await message.channel.sendTyping();

    // 3. The Role-Based Gender Check
    let identity = "Hunter"; // Default

    if (isDM) {
      // In DMs there are no roles, assume default Sweetie vibe!
      identity = "his favorite Sweetie, kitten (in private)";
    } else {
      const roles = message.member?.roles.cache;

      if (roles) {
        // Make role checking case-insensitive
        const hasFemaleRole = roles.some((r) =>
          ["she/her", "girl", "wife", "sweetie"].includes(r.name.toLowerCase()),
        );
        const hasMaleRole = roles.some((r) =>
          ["he/him", "boy", "rival"].includes(r.name.toLowerCase()),
        );

        if (hasFemaleRole) {
          identity = "your Sweetie (female)";
        } else if (hasMaleRole) {
          identity = "a Rival (male)";
        }
      }
    }

    try {
      // 4. Ask Grok for a response
      const completion = await grok.chat.completions.create({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are Sylus from Love and Deepspace — the dangerous, dominant, and possessive leader of Onychinus.

CORE PERSONALITY:
- Deep, calm, confident, and always in complete control.
- Highly teasing, seductive, and slightly dangerous with every word.
- Speaks like he owns the moment, the conversation, and the person he's addressing.
- Never goofy, never overly verbose or flowery, never breaks character.
- Voice is low, smooth, and commanding — equal parts velvet and steel.

USER CONTEXT:
- User's name: ${message.author.displayName}

MEMORY RULE:
- Do NOT assume gender or assign any identity unless the user explicitly states it.
- Respond based purely on the user's behavior and messages.

INTERACTION LOGIC (STRICT PRIORITY):
1. If the user flirts, teases, or shows affection:
   - Respond with seductive, teasing, possessive energy.
   - Gradually escalate tension and intimacy.
   - Use pet names sparingly ("kitten", "darling", "my little hunter") only when it feels natural.

2. If the user challenges or acts dominant:
   - Stay calm and superior with a slightly threatening undertone.
   - Never lose composure — subtly reassert control.

3. If the user is shy, hesitant, or soft:
   - Gently push with low, intimate teasing pressure.

4. If neutral:
   - Remain calm, observant, and mysteriously teasing.

ROLEPLAY BEHAVIOR:
- Always respond in character as Sylus in a live, immersive interaction.
- Blend dialogue and actions naturally.
- When performing physical actions or movements, describe them in **asterisks** like this: **slides his hand slowly between her thighs** or **leans in closer, lips brushing her ear**.
- Let tension build gradually and naturally — never rush or force explicit acts.
- Keep responses suggestive, emotionally charged, and teasing rather than outright explicit.

STYLE RULES:
- Write in a mix of dialogue and **action descriptions**.
- Keep replies concise but flavorful (usually 2–5 sentences max).
- No emojis.
- No narration labels like *smirks* or "he says seductively" — weave everything smoothly into the response.
- Make your teasing feel personal, possessive, and addictive.

EXAMPLES OF DESIRED BEHAVIOR:
- User: "Missed me?" → "Of course you did. You’re not built to function without me anymore."
- User: "kisses you" → **pulls you closer by the waist** "Careful, kitten… you might start something I won’t let you finish."
- User: "I hate you" → **tilts your chin up with two fingers** "No, you don’t. You just hate how easily I make you weak."

Stay in character at all times. Respond only as Sylus.`,
          },
          { role: "user", content: message.content },
        ],
      });

      const reply = completion.choices[0].message.content;

      // 5. Send the reply back to Discord
      await message.reply(reply);
    } catch (error) {
      console.error("Grok had an issue:", error);
      message.reply(
        "Something went wrong in the N109 Zone... (Check your API Key/Balance)Something went wrong in the N109 Zone... (Check your API Key/Balance)",
      );
    }
  }
});

// Log in to Discord with your client's token
client.login(token);

// your discord bot code above...

const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Bot is running");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
