const recipeStore = {
  /**
   * This is the module's state.
   */
  state: () => ({
    areRecipesLoaded: false,
    recipes: [],
    categories: [],
  }),
  /**
   * Getters are, well, getting state.
   */
  getters: {
    allRecipes(state) {
      return state.recipes;
    },
    areAllRecipesLoaded(state) {
      return state.areRecipesLoaded;
    },
    allCategories(state) {
      return state.categories;
    },
    getRecipeById: state => recipeId => {
      return state.recipes.filter(recipe => recipe.id === recipeId)[0];
    },
  },
  /**
   * State mutations are triggered by actions.
   */
  mutations: {
    saveRecipe(state, payload) {
      state.recipes.push(payload);
    },
    markAllRecipesLoaded(state, payload) {
      state.areRecipesLoaded = payload;
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
    addSingleCategory(state, payload) {
      if (state.categories.indexOf(payload) === -1) {
        state.categories.push(payload);
        state.categories.sort();
      }
    },
  },
  /**
   * Actions are dispatched in order to mutate state.
   */
  actions: {
    addRecipe({ commit }, payload) {
      commit('saveRecipe', payload);
    },
    setAreRecipesLoaded({ state, commit }, payload) {
      commit('markAllRecipesLoaded', payload);
      if (payload === true) {
        commit('sortRecipesAlphabetically');
        commit('extractCategories');
      }
    },
    addCategory({ commit }, payload) {
      commit('addSingleCategory', payload);
    },
  },
};

export default recipeStore;
