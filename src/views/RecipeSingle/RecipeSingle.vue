<template>
  <section class="px-8 py-8 with-bg print:p-2">
    <div v-if="recipeData">
      <div class="font-bold text-center max-w-lg mx-auto mb-8">
        <span class="border-b-2 border-b-red-600 print:border-b-black text-xs text-red-600 print:text-black uppercase">
          {{ locale.recipe }}
        </span>
        <div class="font-normal font-serif mt-4 max-w-sm mx-auto">
          {{ recipeData.description }}
        </div>
        <h1 class="mt-4 text-3xl font-serif">{{ recipeData.name }}</h1>
      </div>

      <div
        class="text-center max-w-lg mx-auto mt-8 mb-12 font-serif text-sm md:grid md:grid-cols-5 md:justify-between print:grid print:justify-between print:grid-cols-5 print:my-2"
      >
        <div class="metadata" :title="locale.recipeData.yields">
          <CakeIcon class="h-5 w-5" />
          <span>{{ recipeData.metadata.yields }}</span>
        </div>
        <div class="metadata" :title="locale.recipeData.totalTime">
          <ClockIcon class="h-5 w-5" />
          <span>{{ recipeData.metadata.totalTimeMinutes }} min</span>
        </div>
        <div class="metadata" :title="locale.recipeData.activeTime">
          <ChartPieIcon class="h-5 w-5" />
          <span>{{ recipeData.metadata.activeTimeMinutes }} min</span>
        </div>
        <div class="metadata" :title="locale.recipeData.passiveTime">
          <FastForwardIcon class="h-5 w-5" />
          <span>{{ recipeData.metadata.passiveTimeMinutes }} min</span>
        </div>

        <div class="metadata" :title="locale.recipeData.rating">
          <StarIcon class="h-5 w-5" />
          <span>{{ recipeData.metadata.rating }}</span>
        </div>
      </div>

      <section class="six-columns">
        <div class="mb-8 ingredients print:grid print:grid-cols-2">
          <div>
            <h2 class="font-bold mb-2 uppercase">{{ locale.recipeData.ingredients }}</h2>

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
          </div>

          <div class="mt-12 print:mt-0">
            <h3>{{ locale.recipeData.nutritionalValue }}</h3>
            <ul>
              <li>{{ recipeData.nutritionKcalTotal }} kcal {{ locale.total }}</li>
              <li>{{ kcalPerServing }} kcal {{ locale.per_serving }}</li>
            </ul>

            <h3>{{ locale.categories }}</h3>
            <ul>
              <li v-for="category in recipeData.categories" :key="category">{{ category }}</li>
            </ul>
          </div>
        </div>

        <div class="instructions">
          <h2 class="font-bold mb-2 uppercase">{{ locale.recipeData.instructions }}</h2>
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

      <section class="two-columns print:break-before-page">
        <div class="font-bold my-8">
          <span
            class="border-b-2 border-b-red-600 print:border-b-black text-xs text-red-600 print:text-black uppercase"
          >
            {{ locale.recipeData.drink }}
          </span>
          <div class="font-normal mt-4">
            {{ recipeData.drink }}
          </div>
        </div>

        <div class="font-bold my-8">
          <span
            class="border-b-2 border-b-red-600 print:border-b-black text-xs text-red-600 print:text-black uppercase"
          >
            {{ locale.recipeData.information }}
          </span>
          <div class="font-normal mt-4">
            {{ recipeData.information }}
          </div>
        </div>

        <div class="font-bold my-8">
          <span
            class="border-b-2 border-b-red-600 print:border-b-black text-xs text-red-600 print:text-black uppercase"
          >
            {{ locale.recipeData.source }}
          </span>
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

const recipeDataTemplate = {
  name: '',
  description: '',
  metadata: {
    yields: 0,
    totalTimeMinutes: 0,
    activeTimeMinutes: 0,
    passiveTimeMinutes: 0,
    rating: 0,
  },
  categories: [],
  nutritionKcalTotal: 0,
  ingredients: [
    {
      groupName: '',
      components: [
        {
          amount: 0,
          unit: 'g',
          product: '',
        },
      ],
    },
  ],
  steps: [],
  drink: '',
  information: '',
  source: {
    name: '',
    date: '',
    url: '',
  },
};

export default {
  name: 'RecipeSingle',
  components: { RecipeStep, IngredientItem, CakeIcon, ClockIcon, FastForwardIcon, ChartPieIcon, StarIcon },
  data() {
    return {
      recipeData: {},
    };
  },
  computed: {
    kcalPerServing() {
      if (this.recipeData) {
        return Math.ceil(this.recipeData.nutritionKcalTotal / this.recipeData.metadata.yields);
      }
      return 0;
    },
  },
  created() {
    this.recipeData = Object.assign(this.recipeData, recipeDataTemplate);
  },
  mounted() {
    this.getRecipeData();
    this.$watch(
      () => this.$route.params,
      () => {
        this.getRecipeData();
      }
    );
  },
  methods: {
    getRecipeData() {
      this.recipeData = Object.assign(this.recipeData, this.$store.getters.getRecipeById(this.$route.params.name));
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
  @apply dark:text-slate-200 print:text-black;
}

h3 {
  @apply font-bold mb-1 mt-4 print:mt-2;
}

.metadata {
  @apply flex gap-2 justify-center mb-4 md:mb-0;
}

.with-bg {
  min-height: calc(100vh - 56px);
  /* bg from https://heropatterns.com/ */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23ff002f' fill-opacity='0.2' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E"); /* eslint-disable-line */
}

@media print {
  .with-bg {
    @apply bg-none bg-transparent;
  }
}
</style>
