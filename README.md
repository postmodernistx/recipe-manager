# 🥐 Recipe Manager
Very basic recipe manager, built with Vue 3, Vite and Tailwind (and Vue Router + Vuex).

I wanted to keep the project as light-weight as possible, yet flexible enough to be extended if need be. I also wanted to keep it "database free", so deployment would be a straight-forward procedure.

Recipes are stored as JSON files in `src/data/recipes`.

⚠️ The project's `.gitignore` currently ignores all recipe files that do not contain the name `.example` in the file name.

There's a dark & light theme implemented.

![Screenshot of recipe manager with dark theme](public/recipe-manager-screenshot.png)

![Screenshot of recipe manager with light theme](public/recipe-manager-screenshot_light-theme.png)

## Deployment
Build the project through the `build` script in `package.json`. The current settings are set to up to run the project from a root directory (like a subdomain), but this can be configured through `vite.config.js` and by setting the [base path](https://vitejs.dev/guide/build.html#public-base-path).

## Translations/i18n
This is also kept really low-level in this project. Language JSON files are stored in the folder `src/locales`.

To create a new language, copy the contents of an existing language file and replace the strings to your liking.

The JSON file is imported in `main.js` as so:
```javascript
// 🌍 Change language here
import locale from './locales/en.json';
```

The language is then registered and made globally available through `app.config.globalProperties.locale = locale;` in `main.js`.

Currently there's 🇺🇸 English, 🇸🇪 Swedish and 🇫🇮 Finnish present.

- [ ] The `<title>` tag needs to be changed manually in `index.html`

## Tech notes
### Stack
This project runs on Vue 3 + Vite + Tailwind + Vue Router + Vuex (and Prettier for linting).

### Upgrading Vue
To upgrade project dependencies, run `vue upgrade`.
