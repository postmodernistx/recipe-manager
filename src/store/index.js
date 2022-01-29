import { createStore } from 'vuex';
import recipeStore from './recipes';

export default createStore({
  modules: {
    recipeStore,
  },
});
