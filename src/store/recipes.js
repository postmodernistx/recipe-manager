const recipeStore = {
  state: () => ({
    recipesLoaded: false,
    recipes: [],
    categories: [],
  }),
  getters: {
    allRecipes(state) {
      return state.recipes;
    },
    allRecipesLoaded(state) {
      return state.recipesLoaded;
    },
    allCategories(state) {
      return state.categories;
    },
    getRecipeById: state => recipeId => {
      return state.recipes.filter(recipe => recipe.id === recipeId)[0];
    },
  },
  mutations: {
    saveRecipe(state, payload) {
      state.recipes.push(payload);
    },
    markAllRecipesLoaded(state, payload) {
      state.recipesLoaded = payload;
    },
    sortRecipesAlphabetically(state) {
      state.recipes = state.recipes.sort((a, b) => {
        return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
      });
    },
    extractCategories(state) {
      let extractedCategories = state.recipes.map(recipe => recipe.categories);
      extractedCategories = Array.from(extractedCategories.flat());
      state.categories = [...new Set(extractedCategories)].sort();
    },
  },
  actions: {
    addRecipe({ commit }, payload) {
      commit('saveRecipe', payload);
    },
    setRecipesLoaded({ state, commit }, payload) {
      commit('markAllRecipesLoaded', payload);
      if (payload === true) {
        commit('sortRecipesAlphabetically');
        commit('extractCategories');
      }
    },
  },
};

export default recipeStore;
