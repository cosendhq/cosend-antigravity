# Cosend for Antigravity

Run your business's WhatsApp from Google Antigravity: the shared inbox, campaigns, templates,
automation and the AI receptionist. Every message, campaign and template submission, and every
automation deploy and switch-on, comes to you as a preview you approve.

Every tool is listed on [cosend.app/mcp](https://cosend.app/mcp).

## Install

```bash
git clone https://github.com/cosendhq/cosend-antigravity.git
agy plugin install ./cosend-antigravity
```

You sign in to Cosend in your browser the first time the connector connects.

## How this repository is made

This repository is generated from
[cosendhq/cosend-plugin](https://github.com/cosendhq/cosend-plugin) at commit
`6f43780fba0c84de4d4cf0347f62ba994c74db08`. It holds the files Antigravity reads, copied byte for
byte: `.antigravity-plugin/plugin.json`, `mcp_config.json`, `skills/`, `assets/logo.svg` and
`LICENSE`. To regenerate it from a commit of cosend-plugin:

```bash
node scripts/generate.mjs 6f43780fba0c84de4d4cf0347f62ba994c74db08
```

## License

MIT. See [LICENSE](LICENSE).
