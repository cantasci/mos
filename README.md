# Marketing OS (mos)

On-brand marketing visuals and posts for small businesses, inside Claude Code: ad visuals, social
posts and stories, banners, thumbnails, captions, LinkedIn and X posts. Layout, rendering and all
quality checks run on the Marketing OS server.

## Install

The repository is private: your GitHub account needs access to it, and git on your machine must be
able to clone it (SSH key or a credential helper).

In Claude Code:

```
/plugin marketplace add cantasci/mos
/plugin install mos@marketing-os
```

Then sign in once:

1. Run `/mcp`, choose **plugin:mos:marketing-os** and press **Authenticate**.
2. The Marketing OS sign-in page opens in your browser; enter the access code you received.
3. Start a new session. Sign-in renews itself for 30 days at a time.

If Claude says the tools are not available, the sign-in step was skipped or has expired; repeat it.

## Commands

| Command | What it does |
|---|---|
| `/mos:brand:new <link or description>` | Set up a brand from its website or shop link, or from a short description |
| `/mos:brands` | List your brands |
| `/mos:brand:select <name>` | Choose the brand to work on |
| `/mos:product:new <product link>` | Add a product (name, price, photo) from its page |
| `/mos:products` · `/mos:product:select <name>` | List and choose products |
| `/mos:visual <what you need>` | Make a visual (post, story, banner, thumbnail) |
| `/mos:text <channel and topic>` | Write a caption or post |
| `/mos:campaign <goal>` | Three campaign ideas |

You can also just ask in plain words.

## Updates

```
/plugin marketplace update marketing-os
```

Most improvements ship on the server and need no update here.
