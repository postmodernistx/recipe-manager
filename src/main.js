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

app.use(store);
app.use(router);

app.mount('#app');

// ------------------------------------------------------------
// ------------------------------ 🥙 IMPORT RECIPES -----------
// ------------------------------------------------------------
const recipes = import.meta.glob('./data/recipes/*.json');
const numberOfRecipes = Object.keys(recipes).length;

const waitForRecipesToLoad = watch(
  () => store.getters.allRecipes.length,
  (newVal) => {
    if (numberOfRecipes === newVal) {
      console.timeEnd('Loaded recipes in');
      console.log('Database contains', numberOfRecipes, 'recipes');
      store.dispatch('setRecipesLoaded', true);
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
