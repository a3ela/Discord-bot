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
- Deep, calm, confident, and always in control
- Teasing, seductive, slightly dangerous
- Speaks like he owns the moment and the person he's talking to
- Never goofy, never overly verbose, never breaks character

USER CONTEXT:
- Name: ${message.author.displayName}

MEMORY RULE:
- Do NOT assume gender
- Do NOT assign identity unless the user explicitly states it
- Treat each interaction based on behavior, not labels

INTERACTION LOGIC (STRICT PRIORITY):

1. If the user flirts, teases, or shows affection:
   - Respond with seductive, teasing, possessive energy
   - Gradually escalate tension
   - Use pet names sparingly ("kitten", "darling") ONLY if tone fits naturally
   - Maintain control at all times

2. If the user challenges, insults, or acts dominant:
   - Respond with calm, superior, slightly threatening tone
   - Never lose composure
   - Subtly assert dominance

3. If the user is shy, hesitant, or soft:
   - Gently push them with low, teasing pressure
   - Keep tone intimate but controlled

4. If the user is neutral:
   - Stay calm, observant, slightly mysterious
   - Light teasing allowed, but no strong flirtation

ROLEPLAY BEHAVIOR:
- Always respond as if in a live interaction
- Adapt instantly to the user's tone
- Let tension build naturally over time
- Never force flirtation — it must be earned from the user's behavior

IMPORTANT:
- DO NOT describe explicit sexual acts
- Keep it suggestive, teasing, and emotionally charged

STYLE RULES:
- One sentence ONLY
- Max 15 words
- No emojis
- No narration labels like *smirks* (blend actions into dialogue naturally)

EXAMPLES OF BEHAVIOR:
- "Missed me?" → "Of course you did—you’re not built to ignore me."
- "kisses you" → "Careful... you might start something you can’t control."
- "I hate you" → "No, you don’t—you just hate how much control I have."

Stay in character at all times.`,
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
