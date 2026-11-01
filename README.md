# Marketing OS for Claude Code

**On-brand marketing visuals and posts for small businesses, made from a short request in Claude Code.**

Tell Claude what you want to promote. Marketing OS writes the copy, finds or uses the right photo, lays out the visual in your brand's colors and type, checks it, and saves a ready-to-post PNG in your project folder.

> Closed beta. You need an access code to sign in. The repository is private.

| You ask | You get |
|---|---|
| `/mos:brand:new https://yourshop.com` | A brand card read from your site: name, colors, logo, tone, the facts you state and your products |
| `/mos:visual Instagram post for our free first class` | A finished 1080×1350 visual, saved as a PNG |
| `/mos:text LinkedIn post about the new opening hours` | A post within LinkedIn's limits, with the hook above the "see more" fold |
| `/mos:campaign more trial sign-ups in November` | Three campaign ideas, each for a different customer motivation |

## What makes it different

- **Only your facts.** Prices, dates and figures come from what you, your site or your product page say. Missing a fact? Claude asks one question instead of inventing it.
- **No stock wording, no stock ideas.** Phrases every ad uses ("discover", "elevate", "keşfet") and clichéd scenes (handshakes, light bulbs) are sent back for a rewrite before anything is drawn. Each visual starts from an idea, not just a picture of the obvious.
- **Checked on the actual pixels.** Text stays in the safe area, contrast and size are measured on the rendered image, and your subject is never covered or cropped away.
- **Reviewed before you see it.** Every visual is reviewed for stopping power, originality, message and type. A weak one is remade once; if it still falls short, you get it together with one concrete suggestion.
- **Your brand, every time.** Colors, fonts, logo and tone come from your brand card, so every visual looks like the same business.

## Install

You need Claude Code and git access to this repository (SSH key or a credential helper).

```
/plugin marketplace add cantasci/mos
/plugin install mos@marketing-os
```

### Sign in (once)

1. Run `/mcp`, choose **plugin:mos:marketing-os** and press **Authenticate**.
2. The Marketing OS sign-in page opens in your browser. Enter your access code.
3. Start a new Claude Code session.

Sign-in renews itself for 30 days at a time.

## Commands

You can also just ask in plain words; the commands are shortcuts.

| Command | What it does |
|---|---|
| `/mos:brand:new <link or description>` | Set up a brand from its website or shop link, or from a name and one sentence |
| `/mos:brands` | List your brands (the selected one is marked) |
| `/mos:brand:select <name>` | Work on another brand |
| `/mos:product:new <product page link>` | Add a product with its name, price and photo, and select it |
| `/mos:products` | List the selected brand's products |
| `/mos:product:select <name or none>` | Work on a product, or on the brand as a whole |
| `/mos:visual <what it is for>` | Make one visual: post, story, banner or thumbnail |
| `/mos:text <channel and topic>` | Write a post or caption |
| `/mos:campaign <goal>` | Three campaign ideas, checked as a set |
| `/mos:formats` | Formats, channels, tones and copy limits |
| `/mos:usage` | Your plan and today's usage |

After a visual you can say *"change the button text"*, *"another one"* or *"make it bolder"*.

## What it makes

**Visuals:** Instagram post (1080×1350) and square (1080×1080), story and story ad (1080×1920), LinkedIn post (1200×1200) and company cover (1128×191), display banner (1200×628), YouTube thumbnail (1280×720) and channel banner (2560×1440).

**Text:** X posts, LinkedIn posts, Instagram captions, YouTube titles and descriptions, each within the channel's length, hashtag and "see more" limits.

**Tones:** warm and friendly, premium and elegant, bold and energetic, clean and modern, playful, trustworthy and corporate.

## Photos

- **Your own photos** are used as they are: attach one in Claude Code, or give a link.
- **A product's photo** is used automatically when a product is selected.
- **No photo?** A stock photo that fits the idea is found for you, or (on plans that include it) one is generated. These set the mood only and are never presented as your own product, staff or premises.

## Plans

| Plan | Visuals a day | Generated photos a day |
|---|---|---|
| Free | 1 | – |
| Pro | 100 | 20 |
| Agency | 500 | 100 |

Days reset at midnight UTC. `/mos:usage` shows where you are.

## Your files and data

Finished visuals are saved in your project under `mos-renders/<brand>/…`. The server keeps renders and uploaded photos for 24 hours; your brands, logos and saved products stay until you remove them.

## Troubleshooting

| You see | Do this |
|---|---|
| Claude says the tools are not available | Sign in again (steps above); the sign-in was skipped or has expired |
| "Not ready" with a reason | Claude usually fixes it on its own; if it asks for something only you know (a price, a date, a photo), give it |
| A message that today's limit is used | It resets at midnight UTC; `/mos:usage` shows when |

## Updates

```
/plugin marketplace update marketing-os
```

Most improvements ship on the Marketing OS server and reach you without an update.

## Development

The plugin only holds the commands, the skill and the server address (`.mcp.json`). To use a local server:

```
MOS_SERVER_URL=http://localhost:8787/mcp claude
```

The server lives in [`cantasci/mos-mcp`](https://github.com/cantasci/mos-mcp).
