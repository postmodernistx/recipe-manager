<template>
  <section class="recipe-wrapper">
    <div v-if="recipeData && !falsePath">
      <div class="heading-container">
        <span class="red-bordered-text">
          {{ locale.recipe }}
        </span>
        <div class="recipe-description">
          {{ recipeData.description }}
        </div>
        <h1 class="recipe-name">{{ recipeData.name }}</h1>
      </div>

      <div class="recipe-metadata">
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
        <div class="recipe-ingredients-column ingredients">
          <div>
            <h2>{{ locale.recipeData.ingredients }}</h2>

            <template
              v-for="(ingredientGroup, index) in processedRecipeData.ingredients"
              :key="`ig-${processedRecipeData.id}-${index}`"
            >
              <h3>{{ ingredientGroup.groupName }}</h3>
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

          <div class="recipe-scaler" :title="locale.scale_recipe">
            <NumericStepper v-if="!falsePath" :initial-value="yields" @value-changed="scaleRecipe" />
          </div>

          <div class="nutrition-info">
            <h3>{{ locale.recipeData.nutritionalValue }}</h3>
            <ul>
              <li>{{ processedRecipeData.nutritionKcalTotal }} kcal {{ locale.total }}</li>
              <li>{{ kcalPerServing }} kcal {{ locale.per_serving }}</li>
            </ul>

            <h3>{{ locale.categories }}</h3>
            <ul>
              <li v-for="category in recipeData.categories" :key="category">{{ category }}</li>
            </ul>
          </div>
        </div>

        <div class="instructions">
          <h2>{{ locale.recipeData.instructions }}</h2>
          <ol class="recipe-steps">
            <RecipeStep
              v-for="(step, index) in recipeData.steps"
              :key="`step-${recipeData.id}-${index}`"
              class="mb-2"
              :step-number="index + 1"
              :description="step"
            />
          </ol>
        </div>
      </section>

      <section class="two-columns print:break-before-page">
        <div v-if="recipeData.drink" class="recipe-additional-info">
          <span class="red-bordered-text">
            {{ locale.recipeData.drink }}
          </span>
          <div class="font-normal mt-4">
            {{ recipeData.drink }}
          </div>
        </div>

        <div v-if="recipeData.information" class="recipe-additional-info">
          <span class="red-bordered-text">
            {{ locale.recipeData.information }}
          </span>
          <div class="font-normal mt-4">
            {{ recipeData.information }}
          </div>
        </div>

        <div class="recipe-additional-info">
          <span class="red-bordered-text">
            {{ locale.recipeData.source }}
          </span>
          <div class="font-normal mt-4">
            <a :href="recipeData.source.url" target="_blank" rel="noopener noreferrer">{{ recipeData.source.name }}</a>
            | {{ recipeData.source.date }}
          </div>
        </div>
      </section>
    </div>
    <div v-if="falsePath">
      <h1 class="mt-4 text-3xl font-serif">{{ locale.recipe_not_found }}</h1>
    </div>
  </section>
</template>

<script>
import IngredientItem from './components/IngredientItem.vue';
import RecipeStep from './components/RecipeStep.vue';
import NumericStepper from './components/NumericStepper.vue';

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
  components: {
    NumericStepper,
    RecipeStep,
    IngredientItem,
    CakeIcon,
    ClockIcon,
    FastForwardIcon,
    ChartPieIcon,
    StarIcon,
  },
  data() {
    return {
      recipeData: {},
      scaledRecipeData: {},
      falsePath: true,
      yields: 0,
      recipeIsScaled: false,
      scaleFactor: 1,
    };
  },
  computed: {
    kcalPerServing() {
      if (this.recipeData) {
        return Math.ceil(
          this.processedRecipeData.nutritionKcalTotal / (this.recipeData.metadata.yields * this.scaleFactor)
        );
      }
      return 0;
    },
    /**
     * Return different objects based on if the recipe is scaled, or not.
     * Although, not sure exactly why I cannot just return the basic recipe setup… *facepalm*
     * @returns {*}
     */
    processedRecipeData() {
      return this.recipeIsScaled ? this.scaledRecipeData : this.recipeData;
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
      this.falsePath = this.recipeData.name === '';

      if (!this.falsePath) {
        this.yields = Number(this.recipeData.metadata.yields);
      }
    },
    roundToDecimals(value, decimals) {
      const multiple = Math.pow(10, decimals);
      return Math.round(value * multiple) / multiple;
    },
    scaleRecipe(newValue) {
      this.recipeIsScaled = newValue !== this.recipeData.metadata.yields;

      if (this.recipeIsScaled) {
        this.scaleFactor = newValue / this.recipeData.metadata.yields;

        // Copy object
        this.scaledRecipeData = JSON.parse(JSON.stringify(this.recipeData));

        this.scaledRecipeData.nutritionKcalTotal *= this.scaleFactor;

        this.scaledRecipeData.ingredients.forEach(group => {
          group.components.forEach(ingredient => {
            ingredient.amount = this.roundToDecimals(this.scaleFactor * ingredient.amount, 2);
          });
        });

        // console.table(this.scaledRecipeData.ingredients[0].components);
      } else {
        this.scaledRecipeData = {};
        this.scaleFactor = 1;
      }
    },
  },
};
</script>
