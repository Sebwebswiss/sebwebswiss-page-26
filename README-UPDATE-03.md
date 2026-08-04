# Update 03 — SEO foundation

## Install

Download `sebwebswiss-v2-update-03-seo-foundation.zip` to Windows Downloads. Keep the existing `npm run dev` terminal running. In another WSL terminal:

```bash
cd ~/web/web_stranice/sebwebswiss2026/sebwebswiss-v2
unzip -o /mnt/c/Users/sebas/Downloads/sebwebswiss-v2-update-03-seo-foundation.zip
```

Then refresh `http://localhost:3000` with Ctrl+Shift+R.

## Important
The contact form works visually and validates requests locally. It does not send email yet. Before production deployment, the next update will connect it securely to Resend and `info@sebwebswiss.ch` using private environment variables.
