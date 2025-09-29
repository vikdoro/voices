# Voices from Auschwitz

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Deploy

Note: Deployment is restricted to authorised Cloudflare accounts.

This project deploys to Cloudflare Workers via Wrangler. Run:

```sh
npm run deploy
```

Deployment uses local Cloudflare auth. Only users with the required Cloudflare permissions can deploy.

### Add content

Project output items are in `src/assets/data/output`.

People items are in `src/assets/data/people`.

Define items in the JSON files and put the images in the images folder.

### Convert images

For optimal performance we serve image assets in different sizes. (Note: this step is optional.) 

When adding a new image asset, place them in `scripts/image-conversion/input` in the largest size available.
Image files should have the following in their file names:

- `coverImages` in `output.json` => the filename should have '-home' e.g. `image-2-home.png`

- `image` in `output.json` => the filename should have '-output' e.g. `image-2-output.png`

- `image` in `people.json` => the filename should have '-people' e.g. `Gabor_Mihaly_Toth-people.png`

To convert the images, run `npm run images`. Copy over the converted files from `scripts/image-conversion/ouput` to their appropriate folder, so:

- ouput and homepage output items: `src/assets/data/output/images`

- people items: `src/assets/data/people/images`

