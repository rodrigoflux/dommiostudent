# Dommio Demo React App

This is the interactive Dommio demo for embedding in your landing page.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the app locally:**
   ```bash
   npm start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000)

3. **Embed in your landing page:**
   In your landing page's HTML, use:
   ```html
   <iframe src="http://localhost:3000" ...></iframe>
   ```

## Features
- Fully interactive Dommio demo
- Tailwind CSS styling
- Ready for local development and hot reload

## Build for production
If you want to deploy:
```bash
npm run build
```
Then deploy the `build/` folder to Vercel, Netlify, or your preferred static host. 