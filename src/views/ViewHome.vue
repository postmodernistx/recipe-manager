<template>
  <div>
    <h1 class="text-2xl font-bold my-4 text-center">{{ locale.app_title }}</h1>

    <div v-if="!$store.getters.allRecipesLoaded">
      {{ locale.loading }}
    </div>

    <div v-else>
      <section class="text-center my-8">
        <select v-model="recipeFilter" @change="filterRecipeList">
          <option>{{ locale.all_categories }}</option>
          <option v-for="category in $store.getters.allCategories" :key="category">{{ category }}</option>
        </select>
      </section>

      <ul class="max-w-lg mx-auto">
        <li v-for="recipe in filteredRecipes" :key="recipe.id" class="mb-4">
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
      recipeFilter: this.locale.all_categories,
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
      if (this.recipeFilter === this.locale.all_categories) {
        this.filteredRecipes = this.recipeList;
        return;
      }
      this.filteredRecipes = this.recipeList.filter(recipe => recipe.categories.includes(this.recipeFilter));
    },
  },
};
</script>
