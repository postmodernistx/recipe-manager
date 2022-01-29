<template>
  <div>
    <h1>Recipe Manager</h1>
    <div v-if="!$store.getters.allRecipesLoaded">
      Loading…
    </div>
    <div v-else>
      <section class="filters">
        <select @change="filterRecipeList" v-model="recipeFilter">
          <option>Alla kategorier</option>
          <option v-for="category in $store.getters.allCategories" :key="category">{{ category }}</option>
        </select>
      </section>

      <ul v-for="recipe in filteredRecipes" :key="recipe.id">
        <li>
          <router-link :to="{ name: 'RecipeSingle', params: { name: recipe.id } }">{{ recipe.name }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ViewHome',
  data() {
    return {
      recipeList: [],
      recipeFilter: 'Alla kategorier',
      filteredRecipes: [],
    };
  },
  mounted() {
    if (!this.$store.getters.allRecipesLoaded) {
      this.$store.subscribeAction(action => {
        if (action.type === 'setRecipesLoaded') {
          this.$nextTick(() => {
            this.recipeList = this.$store.getters.allRecipes;
            this.filterRecipeList();
          });
        }
      });
    } else {
      this.recipeList = this.$store.getters.allRecipes;
      this.filterRecipeList();
    }
  },
  methods: {
    filterRecipeList() {
      if (this.recipeFilter === 'Alla kategorier') {
        this.filteredRecipes = this.recipeList;
        return;
      }
      this.filteredRecipes = this.recipeList.filter(recipe => recipe.categories.includes(this.recipeFilter));
    },
  },
};
</script>
