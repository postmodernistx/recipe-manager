import { createApp, h, watch } from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import './styles/styles.css';

const app = createApp({
  render() {
    return h(App);
  },
});

// ------------------------------------------------------------
// ------------------------------ 🌍 Change language here -----
// ------------------------------------------------------------
import locale from './locales/en.json';
app.config.globalProperties.locale = locale;

// ------------------------------------------------------------
// ------------------------------ 🚀 MOUNT APP ----------------
// ------------------------------------------------------------
app.use(store);
app.use(router);

app.mount('#app');

// ------------------------------------------------------------
// ------------------------------ 🥙 IMPORT RECIPES -----------
// ------------------------------------------------------------
let recipes;

if (import.meta.env.MODE === 'github') {
  recipes = import.meta.glob('./data/recipes/*.example.json');
} else {
  recipies = import.meta.glob('./data/recipes/*.json');
}

const numberOfRecipes = Object.keys(recipes).length;

const waitForRecipesToLoad = watch(
  () => store.getters.allRecipes.length,
  (newVal) => {
    if (numberOfRecipes === newVal) {
      console.timeEnd('Loaded recipes in');
      console.log('Database contains', numberOfRecipes, 'recipes');
      store.dispatch('setAreRecipesLoaded', true);
      waitForRecipesToLoad();
    }
  }
);

console.time('Loaded recipes in');

for (const path in recipes) {
  recipes[path]()
    .then(singleRecipe => {
      // Set the filename as an ID (and thus ensure no duplicates)
      let recipeId = path.replace('./data/recipes/', '').replace('.json', '');
      recipeId = recipeId.replaceAll(' ', '_');
      recipeId = recipeId.replaceAll('.', '-');
      recipeId = encodeURIComponent(recipeId);

      singleRecipe.default.id = recipeId;
      store.dispatch('addRecipe', singleRecipe.default);
    })
    .catch(error => {
      console.log('Error catching!', error);
    });
}
