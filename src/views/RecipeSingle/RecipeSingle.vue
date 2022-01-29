<template>
  <section class="px-8 py-8 with-bg">
    <div v-if="recipeData">
      <div class="font-bold text-center max-w-lg mx-auto mb-8">
        <span class="border-b-2 border-b-red-600 text-xs text-red-600 uppercase">Recept</span>
        <div class="font-normal font-serif mt-4 max-w-sm mx-auto">
          {{ recipeData.description }}
        </div>
        <h1 class="mt-4 text-3xl font-serif">{{ recipeData.name }}</h1>
      </div>

      <div class="text-center max-w-lg mx-auto mt-8 mb-12 font-serif text-sm md:grid md:grid-cols-5 md:justify-between">
        <div class="metadata" title="Portioner">
          <CakeIcon class="h-5 w-5" />
          <span>{{ recipeData.metadata.yields }}</span>
        </div>
        <div class="metadata" title="Total tid">
          <ClockIcon class="h-5 w-5" />
          <span>{{ recipeData.metadata.totalTimeMinutes }}</span>
        </div>
        <div class="metadata" title="Aktiv tid">
          <ChartPieIcon class="h-5 w-5" />
          <span>{{ recipeData.metadata.activeTimeMinutes }}</span>
        </div>
        <div class="metadata" title="Passiv tid">
          <FastForwardIcon class="h-5 w-5" />
          <span>{{ recipeData.metadata.passiveTimeMinutes }}</span>
        </div>

        <div class="metadata" title="Betyg">
          <StarIcon class="h-5 w-5" />
          <span>{{ recipeData.metadata.rating }}</span>
        </div>
      </div>

      <section class="six-columns">
        <div class="mb-8 ingredients">
          <h2 class="font-bold mb-2 uppercase">Ingredienser</h2>

          <template v-for="(ingredientGroup, index) in recipeData.ingredients" :key="`ig-${index}`">
            <h3 class="font-bold mb-1">{{ ingredientGroup.groupName }}</h3>
            <ul>
              <IngredientItem
                v-for="(item, index2) in ingredientGroup.components"
                :key="`ig-${index}-component-${index2}`"
                :amount="item.amount"
                :unit="item.unit"
                :name="item.product"
              />
            </ul>
          </template>

          <div class="mt-12">
            <h3>Näringsvärde</h3>
            <ul>
              <li>360 kcal totalt</li>
              <li>145 kcal per portion</li>
            </ul>

            <h3>Kategorier</h3>
            <ul>
              <li>Soppor</li>
              <li>Pasta</li>
              <li>Öl</li>
              <li>Med dryckesförslag</li>
            </ul>
          </div>
        </div>

        <div class="instructions">
          <h2 class="font-bold mb-2 uppercase">Instruktioner</h2>
          <ol class="recipe-steps">
            <RecipeStep
              v-for="(step, index) in recipeData.steps"
              :key="`step-${index}`"
              class="mb-2"
              :step-number="index + 1"
              :description="step"
            />
          </ol>
        </div>
      </section>

      <section class="two-columns">
        <div class="font-bold my-8">
          <span class="border-b-2 border-b-red-600 text-xs text-red-600 uppercase">Dryck</span>
          <div class="font-normal mt-4">
            {{ recipeData.drink }}
          </div>
        </div>

        <div class="font-bold my-8">
          <span class="border-b-2 border-b-red-600 text-xs text-red-600 uppercase">Information</span>
          <div class="font-normal mt-4">
            {{ recipeData.information }}
          </div>
        </div>

        <div class="font-bold my-8">
          <span class="border-b-2 border-b-red-600 text-xs text-red-600 uppercase">Källa</span>
          <div class="font-normal mt-4">
            <a :href="recipeData.source.url" target="_blank" rel="noopener noreferrer">{{ recipeData.source.name }}</a>
            | {{ recipeData.source.date }}
          </div>
        </div>
      </section>
    </div>
  </section>
</template>

<script>
import IngredientItem from './components/IngredientItem.vue';
import RecipeStep from './components/RecipeStep.vue';

import { CakeIcon, ClockIcon, FastForwardIcon, ChartPieIcon, StarIcon } from '@heroicons/vue/outline';

export default {
  name: 'RecipeSingle',
  components: { RecipeStep, IngredientItem, CakeIcon, ClockIcon, FastForwardIcon, ChartPieIcon, StarIcon },
  data() {
    return {
      recipeData: null,
    };
  },
  mounted() {
    console.log('mounted');
    this.getRecipeData();
  },
  methods: {
    getRecipeData() {
      this.recipeData = this.$store.getters.getRecipeById(this.$route.params.name);
    },
  },
};
</script>

<style scoped>
.two-columns,
.six-columns {
  @apply md:grid md:gap-8 max-w-5xl mx-auto;
}
.two-columns {
  @apply md:grid-cols-2;
}

.six-columns {
  @apply md:grid-cols-6;
}

.six-columns .ingredients {
  @apply col-span-2;
}

.six-columns .instructions {
  @apply col-span-4;
}

h1,
h2,
h3 {
  @apply dark:text-slate-200;
}

h3 {
  @apply font-bold mb-1 mt-2;
}

.metadata {
  @apply flex gap-2 justify-center;
}

.with-bg {
  /* bg from https://heropatterns.com/ */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23ff002f' fill-opacity='0.06' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
}
</style>
