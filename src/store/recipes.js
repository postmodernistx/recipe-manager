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
  },
  mutations: {
    saveRecipe(state, payload) {
      state.recipes.push(payload);
    },
    markAllRecipesLoaded(state, payload) {
      state.recipesLoaded = payload;
    },
    extractCategories(state) {
      let extractedCategories = state.recipes.map(recipe => recipe.categories);
      extractedCategories = Array.from(extractedCategories.flat());
      state.categories = [...new Set(extractedCategories)].sort();
    },
  },
  actions: {
    addRecipe({ state, commit, rootState }, payload) {
      commit('saveRecipe', payload);
    },
    setRecipesLoaded({ state, commit }, payload) {
      commit('markAllRecipesLoaded', payload);
      if (payload === true) {
        commit('extractCategories');
      }
    },
  },
};

export default recipeStore;
