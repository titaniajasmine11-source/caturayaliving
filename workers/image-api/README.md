# Caturaya Image API Worker

Deploy:

```bash
npx wrangler secret put API_KEY
npx wrangler deploy
```

Use the same value in the Next app:

```env
IMAGE_API_URL=https://caturaya-image-api.<your-subdomain>.workers.dev/
IMAGE_API_KEY=<same API_KEY>
```
