<template>
  <div>
    <h1 class="text-2xl font-bold my-4 text-center">{{ locale.app_title }}</h1>

    <div v-if="!$store.getters.areAllRecipesLoaded">
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
        <transition-group
          mode="in-out"
          :css="false"
          @before-enter="beforeEnter"
          @enter="enter"
          @enter-cancelled="enterCancelled"
          @leave="leave"
          @leave-cancelled="leaveCancelled"
        >
          <li
            v-for="recipe in filteredRecipes"
            :key="recipe.id"
            class="mb-4 overflow-hidden"
          >
            <router-link :to="{ name: 'RecipeSingle', params: { name: recipe.id } }">{{ recipe.name }}</router-link>
          </li>
        </transition-group>
      </ul>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';

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
    if (!this.$store.getters.areAllRecipesLoaded) {
      this.$store.subscribeAction(action => {
        if (action.type === 'setAreRecipesLoaded') {
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
    // ----------------------------------------------------------------------
    // ----------------------------------- 💫 ANIMATIONS --------------------
    // ----------------------------------------------------------------------
    // TODO: Needs work
    beforeEnter(el) {
      gsap.set(el, { opacity: 0, y: '-30px', duration: 0.3 });
    },
    enter(el, done) {
      gsap.to(el, { opacity: 1, y: 0, onComplete: done });
    },
    enterCancelled(el) {
      gsap.set(el, { opacity: 0 });
    },
    leave(el, done) {
      gsap.to(el, { opacity: 0, y: '30px', duration: 0.3, onComplete: done });
    },
    leaveCancelled(el) {
      gsap.set(el, { opacity: 1, y: 0 });
    },
    // ----------------------------------------------------------------------
    // ----------------------------------- HELPER METHODS -------------------
    // ----------------------------------------------------------------------
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
