# Mobile Bottom Bar Builder

A React + Tailwind interface that ships as a WordPress plugin for customizing a mobile bottom navigation bar directly inside wp-admin.

## Prerequisites

- Node.js 20+
- npm 10+
- WordPress 6.0+ with REST API enabled

## Local development

```bash
npm install
npm run dev
```

This runs Vite with hot reloading at `http://localhost:5173/`. The UI uses mocked menu data when WordPress data is not injected.

## Building for WordPress

```bash
npm run build
```

- TypeScript is type-checked via `tsc -b`.
- Vite outputs hashed assets and `manifest.json` into `wp-mobile-bottom-bar/build`.

To package the plugin for distribution:

```bash
npm run wp:zip
```

This creates `mobile-bottom-bar-plugin.zip` that you can upload in the WordPress admin Plugins screen.

## Installing inside WordPress

1. Copy the `wp-mobile-bottom-bar` directory (after running `npm run build`) into `wp-content/plugins/`.
2. Activate **Mobile Bottom Bar Builder** from **Plugins → Installed Plugins**.
3. A new **Mobile Bottom Bar** entry appears in the left admin menu. Open it to load the React app, toggle **Activate Bottom Bar**, and pick the menu + styles you want.

## How the plugin works

- `wp-mobile-bottom-bar/wp-mobile-bottom-bar.php` registers the admin page, enqueues the Vite bundle, and exposes WordPress menus + saved settings to the React app via `mobileBottomBarData`.
- A REST endpoint at `/wp-json/mobile-bottom-bar/v1/settings` persists settings in the `mobile_bottom_bar_settings` option. The React **Save Changes** button calls this endpoint with the required nonce.
- Menu options are pulled from `wp_get_nav_menus()`. If the site has no menus yet, the UI falls back to mock entries.
- When activated, the plugin enqueues a lightweight front-end stylesheet and renders the configured menu at the bottom of every public page for viewports under 768px. The page body receives a `wp-mobile-bottom-bar-active` class so content clears the fixed bar.

## Development tips

- Run `npm run dev` to iterate on the React app with live reloads; saving will be disabled because WordPress data is not present.
- Always re-run `npm run build` before deploying the plugin so the latest manifest and assets are available.
- The plugin build directory is ignored by git, so include the generated files only when packaging for WordPress.
