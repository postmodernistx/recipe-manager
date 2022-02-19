<template>
  <section class="recipe-wrapper new-recipe">
    <div class="heading-container">
      <span class="red-bordered-text">
        {{ locale.new_recipe }}
      </span>
      <div class="recipe-description">
        <textarea v-model="recipeDescription" rows="3" class="recipe-description editable"></textarea>
      </div>
      <div>
        <input v-model="recipeName" type="text" class="recipe-name" />
      </div>
    </div>

    <div class="recipe-metadata">
      <div class="metadata" :title="locale.recipeData.yields">
        <CakeIcon class="h-5 w-5" />
        <input v-model="yields" type="number" class="metadata-input" />
      </div>
      <div class="metadata" :title="locale.recipeData.totalTime">
        <ClockIcon class="h-5 w-5" />
        <span>
          <input v-model="totalTime" type="number" class="metadata-input" /> mins
        </span>
      </div>
      <div class="metadata" :title="locale.recipeData.activeTime">
        <ChartPieIcon class="h-5 w-5" />
        <span>
          <input v-model="activeTime" type="number" class="metadata-input" /> mins
        </span>
      </div>
      <div class="metadata" :title="locale.recipeData.passiveTime">
        <FastForwardIcon class="h-5 w-5" />
        <span>
          <input v-model="passiveTime" type="number" class="metadata-input" /> mins
        </span>
      </div>

      <div class="metadata" :title="locale.recipeData.rating">
        <StarIcon class="h-5 w-5" />
        <input v-model="rating" min="1" max="5" type="number" class="metadata-input" />
      </div>
    </div>

    <section class="six-columns">
      <div class="recipe-ingredients-column ingredients">
        <div>
          <h2>{{ locale.recipeData.ingredients }}</h2>

          <h3>ingredient group name</h3>
          <ul>
            1000 g water
          </ul>
        </div>

        <div class="nutrition-info">
          <h3>{{ locale.recipeData.nutritionalValue }}</h3>
          <ul>
            <li>311 kcal in total</li>
            <li>52 kcal per serving</li>
          </ul>

          <h3>{{ locale.categories }}</h3>
          <ul ref="categories">
            <li v-for="category in $store.getters.allCategories" :key="category">
              <CategoryItem :category-name="category" :checked="this.additionalCategories.indexOf(category) > -1" />
            </li>
          </ul>
          <input
            v-model="newCategoryName"
            type="text"
            class="!text-left"
            @keydown.enter="addNewCategory"
            :placeholder="locale.add_new_category"
          />
        </div>
      </div>

      <div class="instructions">
        <h2>{{ locale.recipeData.instructions }}</h2>
        <ol>
          <li v-for="(step, index) in recipeSteps" :key="step" class="flex gap-2 mt-2 items-center">
            <span class="text-sm font-bold pr-2 dark:text-neutral-200 print:text-black">{{ index + 1 }}</span>
            <span class="font-serif w-full" tabindex="0">
              <RecipeStep
                :step-description="step"
                :index="index"
                @step-description-changed="updateStepContents"
                @keydown.tab="addRecipeStepAfter(index)"
              />
            </span>
            <TrashIcon v-if="recipeSteps.length > 1" class="h-5 w-5 cursor-pointer" @click="deleteStep(index)" />
          </li>
        </ol>
      </div>
    </section>

    <section class="two-columns print:break-before-page">
      <div class="recipe-additional-info">
        <span class="red-bordered-text">
          {{ locale.recipeData.drink }}
        </span>
        <div class="font-normal mt-4">
          <textarea v-model="pairsWith" rows="3" class="additional-info editable"></textarea>
        </div>
      </div>

      <div class="recipe-additional-info">
        <span class="red-bordered-text">
          {{ locale.recipeData.information }}
        </span>
        <div class="font-normal mt-4">
          <textarea v-model="additionalInfo" rows="3" class="additional-info editable"></textarea>
        </div>
      </div>

      <div class="recipe-additional-info">
        <span class="red-bordered-text">
          {{ locale.recipeData.source }}
        </span>
        <div class="font-normal mt-4">
          <div><input v-model="sourceName" type="text" class="source" /></div>
          <div><input v-model="sourceUrl" type="url" class="source" /></div>
          <div><input v-model="sourceDate" type="date" class="source" /></div>
        </div>
      </div>
    </section>

    <div>
      <button class="rounded-md bg-lime-600 text-white font-bold p-4 mx-auto block my-8" @click="collectRecipeData">
        {{ locale.save_recipe }}
      </button>
    </div>
  </section>
</template>

<script>
import { CakeIcon, ClockIcon, FastForwardIcon, ChartPieIcon, StarIcon, TrashIcon } from '@heroicons/vue/outline';
import RecipeStep from './components/RecipeStep.vue';
import CategoryItem from './components/CategoryItem.vue';

export default {
  name: 'NewRecipe',
  components: {
    CategoryItem,
    RecipeStep,
    CakeIcon,
    ClockIcon,
    FastForwardIcon,
    ChartPieIcon,
    StarIcon,
    TrashIcon,
  },
  data() {
    return {
      recipeDescription: 'Recipe description',
      recipeName: 'Recipe name',
      yields: 4,
      totalTime: 0,
      activeTime: 0,
      passiveTime: 0,
      rating: 1,
      pairsWith: 'Serving & drink suggestions…',
      additionalInfo: 'Additional notes…',
      sourceName: 'Source name',
      sourceUrl: 'https://',
      sourceDate: '2022-02-19',
      recipeSteps: ['Add description here'],
      newCategoryName: '',
      additionalCategories: [],
    };
  },
  methods: {
    addRecipeStepAfter(index) {
      this.$nextTick(() => {
        this.recipeSteps.splice(index + 1, 0, `New Step ${index + 1}`);
      });
    },
    updateStepContents(newDescription, index) {
      this.recipeSteps[index] = newDescription;
    },
    deleteStep(index) {
      this.recipeSteps.splice(index, 1);
    },
    collectRecipeData() {
      this.collectCategories();
    },
    collectCategories() {
      const checkedExistingCategories = Array.from(this.$refs.categories.querySelectorAll('input:checked')).map(
        cat => cat.value
      );
      console.log(checkedExistingCategories);
    },
    addNewCategory() {
      this.additionalCategories.push(this.newCategoryName);
      this.$store.dispatch('addCategory', this.newCategoryName);
      this.$nextTick(() => {
        this.newCategoryName = '';
      });
    },
  },
};
</script>

<style lang="scss">
@import 'new_recipe';
</style>
