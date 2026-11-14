# Marketing OS for Claude Code

**On-brand marketing visuals and posts for small businesses, made from a short request in Claude Code.**

Tell Claude what you want to promote. Marketing OS writes the copy, finds or uses the right photo, lays out the visual in your brand's colors and type, checks it, and saves a ready-to-post PNG in your project folder.

| You ask | You get |
|---|---|
| `/mos:brand:new https://yourshop.com` | A brand card read from your site: name, colors, logo, tone, the facts you state and your products |
| `/mos:design Instagram post for our free first class` | A finished ad drawn in one picture, with your logo set on it |
| `/mos:ideas` | Four posts your competitors are not making, to pick from a list; the one you pick is made |
| `/mos:text LinkedIn post about the new opening hours` | A post within LinkedIn's limits, with the hook above the "see more" fold |
| `/mos:campaign more trial sign-ups in November` | Three campaign ideas, each for a different customer motivation |

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
| `/mos:product:new <product page link>` | Add a product with its name, price and photo, and select it |
| `/mos:products` | List the selected brand's products |
| `/mos:product:select <name or none>` | Work on a product, or on the brand as a whole |
| `/mos:text <channel and topic>` | Write a post or caption |
| `/mos:design <what it is for>` | Ask the studio for a finished ad drawn in one picture, with your logo set on it; `/mos:design <job id>` fetches it a few minutes later |
| `/mos:ideas <competitors, or nothing>` | Read your competitors, propose four posts they are not making, and make the one you pick from the list |
| `/mos:studio` | Studio only: make the waiting design jobs and hand them back |
| `/mos:campaign <goal>` | Three campaign ideas, checked as a set |
| `/mos:formats` | Formats, channels, tones and copy limits |
| `/mos:usage` | How much you have made today |
| `/mos:status` | Where your last visual (or one you name) ended, and what it took |
| `/mos:review` | The review your last visual (or one you name) got |

After a visual you can say *"change the button text"*, *"another one"* or *"make it bolder"*.

## What it makes

**Visuals:** Instagram post (1080×1350) and square (1080×1080), story and story ad (1080×1920), LinkedIn post (1200×1200) and company cover (1128×191), display banner (1200×628), YouTube thumbnail (1280×720) and channel banner (2560×1440).

**Text:** X posts, LinkedIn posts, Instagram captions, YouTube titles and descriptions, each within the channel's length, hashtag and "see more" limits.

**Tones:** warm and friendly, premium and elegant, bold and energetic, clean and modern, playful, trustworthy and corporate.

## Photos

- **Your own photos** are used as they are: attach one in Claude Code, or give a link.
- **A product's photo** is used automatically when a product is selected.
- **No photo?** A photo that fits the idea is found for you. It sets the mood only and is never presented as your own product, staff or premises.

Finished visuals are saved in your project under `mos-renders/<brand>/`.

## Updates

```
/plugin marketplace update marketing-os
```
