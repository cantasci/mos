# Marketing OS for Claude Code

**On-brand marketing visuals and posts for small businesses, made from a short request in Claude Code.**

Tell Claude what you want to promote. Marketing OS writes the copy, has the whole ad drawn as one picture in your brand's colors, sets your logo on it and gives you the finished image with its post text and tags.

| You ask | You get |
|---|---|
| `/mos:brand:new https://yourshop.com` | A brand card read from your site: name, colors, logo, tone, the facts you state and your products |
| `/mos:image Instagram post for our free first class` | A finished ad drawn in one picture, with your logo set on it |
| `/mos:ideas` | Four posts your competitors are not making, to pick from a list; the one you pick is made |
| `/mos:text LinkedIn post about the new opening hours` | A post within LinkedIn's limits, with the hook above the "see more" fold |

## What makes it different

- **Only your facts.** Prices, dates and figures come from what you, your site or your product page say. Missing a fact? Claude asks one question instead of inventing it.
- **No stock wording, no stock ideas.** Phrases every ad uses ("discover", "elevate", "keşfet") and clichéd scenes (handshakes, light bulbs) are rewritten before anything is drawn. Each visual starts from an idea, not just a picture of the obvious.
- **Checked before you see it.** Text stays readable and in place, your subject is never covered or cropped away, and every visual is sent for review (stopping power, originality, message and type). You are told what each one is: ready, below the target (with one concrete suggestion), not fully reviewed (when the review could not complete, so its quality is unknown), not ready or failed. Ready means those checks passed, not that a person approved it.
- **Your brand, every time.** Colors, fonts, logo and tone come from your brand card, so every visual looks like the same business.

## Install

One command, in any terminal (the VS Code terminal too):

```
npx --yes github:cantasci/mos
```

It checks that Claude Code is installed, removes a hand-added server that would stop sign-in (it asks first), installs or updates the plugin and checks that the server answers. Then sign in once with your access code: start a new Claude Code session, run `/mcp`, choose **plugin:mos:marketing-os**, press **Authenticate** and enter the code on the page that opens.

Something not working? `npx --yes github:cantasci/mos --check` reports the state and changes nothing.

<details>
<summary>Install by hand instead</summary>

In the Claude Code terminal app:

```
/plugin marketplace add cantasci/mos
/plugin install mos@marketing-os
```

In the VS Code extension, or anywhere `/plugin` is not available, run the same two steps in a terminal:

```
claude plugin marketplace add cantasci/mos
claude plugin install mos@marketing-os
```

Then sign in as above.

</details>

Install the plugin only. Do not add the server yourself with `claude mcp add`: the plugin already connects to it, and a second entry with the same name stops sign-in.

### Troubleshooting

**"Couldn't start sign-in for marketing-os"**, or `marketing-os` shown as failed in `/mcp`: the server was also added by hand. The plugin's own entry is named `plugin:mos:marketing-os`; a plain `marketing-os` is the extra one.

1. Remove it: run the installer again and answer yes, or `claude mcp remove marketing-os`
2. Start a new Claude Code session.
3. Run `/mcp`, choose **plugin:mos:marketing-os** and press **Authenticate**.

**`/plugin` is not available:** use the one-line installer above; it does not need `/plugin`.

**Commands are missing after an update:** run the installer again (it updates the plugin), then start a new session.

## Commands

You can also just ask in plain words; the commands are shortcuts.

| Command | What it does |
|---|---|
| `/mos:brand:new <link or description>` | Set up a brand from its website or shop link, or from a name and one sentence |
| `/mos:brands` | List your brands (the selected one is marked) |
| `/mos:brand:select <name>` | Work on another brand |
| `/mos:text <channel and topic>` | Write a post or caption |
| `/mos:image <what it is for>` | Ask the studio for a finished ad drawn in one picture, with your logo set on it; `/mos:image <job id>` fetches it a few minutes later |
| `/mos:ideas <competitors, or nothing>` | Read your competitors, propose four posts they are not making, and make the one you pick from the list |
| `/mos:studio` | Studio only: make the waiting design jobs and hand them back |
| `/mos:usage` | How much you have made today |

After an image you can ask for another one in plain words.

## What it makes

**Images:** Instagram post (4:5) and square, LinkedIn post (square), a post for X (square), YouTube thumbnail (16:9), and a vertical frame for a story or TikTok (9:16). Each is one picture in one of four kinds: your product at work, a documentary moment, a before and after, a still life of the work's objects. Banners and covers are not made.

**Text:** X posts, LinkedIn posts, Instagram captions, YouTube titles and descriptions, each within the channel's length, hashtag and "see more" limits.

**Tones:** warm and friendly, premium and elegant, bold and energetic, clean and modern, playful, trustworthy and corporate.

## Photos

A photo you give (your product, your van, an installed unit) appears in the image as it is: attach it in Claude Code. Nothing is presented as your product, staff or premises unless you gave it.

## Updates

```
/plugin marketplace update marketing-os
```
