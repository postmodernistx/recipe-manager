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
        <span> <input v-model="totalTime" type="number" class="metadata-input" /> mins </span>
      </div>
      <div class="metadata" :title="locale.recipeData.activeTime">
        <ChartPieIcon class="h-5 w-5" />
        <span> <input v-model="activeTime" type="number" class="metadata-input" /> mins </span>
      </div>
      <div class="metadata" :title="locale.recipeData.passiveTime">
        <FastForwardIcon class="h-5 w-5" />
        <span> <input v-model="passiveTime" type="number" class="metadata-input" /> mins </span>
      </div>

      <div class="metadata" :title="locale.recipeData.rating">
        <StarIcon class="h-5 w-5" />
        <input v-model="rating" min="1" max="5" type="number" class="metadata-input" />
      </div>
    </div>

    <section class="six-columns">
      <div class="recipe-ingredients-column ingredients">
        <div ref="ingredients">
          <h2>{{ locale.recipeData.ingredients }}</h2>

          <div v-for="(group, index) in ingredients" :key="`ingredient-group-${index}`">
            <h3 class="flex gap-2">
              <input type="text" :value="group.groupName" class="!text-left font-bold" />
              <span>
                <TrashIcon
                  v-if="ingredients.length > 1"
                  class="h-5 w-5 cursor-pointer"
                  @click="deleteRecipeGroup(index)"
                />
              </span>
            </h3>
            <ul>
              <li v-for="(item, subindex) in group.components" :key="item.product" class="flex gap-2">
                <NewRecipeIngredient
                  :amount="item.amount"
                  :product="item.product"
                  :unit="item.unit"
                  @tabbed="appendIngredient(index, subindex, $event)"
                />
                <span>
                  <TrashIcon class="h-5 w-5 cursor-pointer" @click="removeIngredient(index, subindex)" />
                </span>
              </li>
            </ul>
          </div>

          <button class="rounded-md bg-amber-600 text-white font-bold p-2 my-4" @click="addRecipeIngredientSection">
            {{ locale.placeholders.add_recipe_group }}
          </button>
        </div>
        
        <div class="nutrition-info">
          <h3>{{ locale.recipeData.nutritionalValue }}</h3>
          <ul>
            <li class="flex gap-2 mb-2">
              <input v-model="kcalTotal" type="number" class="!text-left" />
              <span class="w-full">kcal {{ locale.total }}</span>
            </li>
            <li>{{ Math.round(kcalTotal / yields) }} kcal {{ locale.per_serving }}</li>
          </ul>

          <h3>{{ locale.categories }}</h3>
          <ul ref="categories">
            <li v-for="category in $store.getters.allCategories" :key="category">
              <CategoryItem :category-name="category" :checked="additionalCategories.indexOf(category) > -1" />
            </li>
          </ul>
          <input
            v-model="newCategoryName"
            type="text"
            class="!text-left border-0 border-b-2 border-b-slate-600"
            :placeholder="locale.add_new_category"
            @keydown.enter="addNewCategory"
          />
        </div>
      </div>

      <div class="instructions">
        <h2 class="flex gap-2 items-center justify-between">
          {{ locale.recipeData.instructions }}
          <span :title="locale.ux.enter_to_add_recipe_step">
            <QuestionMarkCircleIcon class="h-5 w-5 cursor-help" />
          </span>
        </h2>
        <ol ref="recipeSteps">
          <li v-for="(step, index) in recipeSteps" :key="`step-${step.id}`" class="flex gap-2 mt-2 items-center">
            <span class="text-sm font-bold pr-2 dark:text-neutral-200 print:text-black">{{ index + 1 }}</span>
            <span class="font-serif w-full" tabindex="0">
              <RecipeStep
                :data-recipe-step="step.id"
                :step-description="step.desc"
                :index="index"
                @step-description-changed="updateStepContents"
                @tabbed="addRecipeStepAfter(index, $event)"
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
          <div><input v-model="sourceName" :placeholder="locale.recipeData.source" type="text" class="source" /></div>
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
import {
  CakeIcon,
  ClockIcon,
  FastForwardIcon,
  ChartPieIcon,
  StarIcon,
  TrashIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/vue/outline';
import RecipeStep from './components/RecipeStep.vue';
import CategoryItem from './components/CategoryItem.vue';
import NewRecipeIngredient from './components/Ingredient.vue';

export default {
  name: 'NewRecipe',
  components: {
    NewRecipeIngredient,
    CategoryItem,
    RecipeStep,
    CakeIcon,
    ClockIcon,
    FastForwardIcon,
    ChartPieIcon,
    StarIcon,
    TrashIcon,
    QuestionMarkCircleIcon,
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
      pairsWith: this.locale?.placeholders.pairs_with ?? '',
      additionalInfo: this.locale?.placeholders.additional_info ?? '',
      sourceName: '',
      sourceUrl: 'https://',
      sourceDate: '2022-02-19',
      recipeSteps: [{ id: 0, desc: 'Lorem ipsum dolor sit' }, { id: 1, desc: 'Lorem ipsum dolor sit' }],
      newCategoryName: '',
      additionalCategories: [],
      ingredients: [
        {
          groupName: 'Soup',
          components: [
            {
              amount: 1000,
              unit: 'g',
              product: 'water',
            },
            {
              amount: 300,
              unit: 'g',
              product: 'potatoes',
            },
            {
              amount: 0.5,
              unit: 'tbsp',
              product: 'salt',
            },
          ],
        },
      ],
      kcalTotal: 0,
    };
  },
  methods: {
    /**
     * When tabbing, add a recipe step after the current step.
     * Can be prevented by holding down the alt key.
     */
    addRecipeStepAfter(index, extraKeys) {
      if (extraKeys.alt || extraKeys.shift) {
        return;
      }
      this.$nextTick(() => {
        const newId = this.recipeSteps.length;
        this.recipeSteps.splice(index + 1, 0, { id: newId, desc: '' });

        this.$nextTick(() => {
          const newInput = document.querySelectorAll(`span[data-recipe-step="${newId}"] input`)[0];
          // Delay slightly, or focusing won't work
          if (newInput !== undefined) {
            setTimeout(() => {
              if (newInput !== undefined) {
                newInput.select();
              }
            }, 200);
          }
        });
      });
    },
    updateStepContents(newDescription, index) {
      this.recipeSteps[index] = newDescription;
    },
    /**
     * Deletes recipe step
     * @param index
     */
    deleteStep(index) {
      this.recipeSteps.splice(index, 1);
    },
    /**
     * Collect all recipe data
     */
    collectRecipeData() {
      const recipeObject = {
        name: this.recipeName,
        description: this.recipeDescription,
        metadata: {
          yields: this.yields,
          totalTimeMinutes: this.totalTime,
          activeTimeMinutes: this.activeTime,
          passiveTimeMinutes: this.passiveTime,
          rating: this.rating,
        },
        categories: this.collectCategories(),
        nutritionKcalTotal: this.kcalTotal,
        ingredients: this.collectIngredients(),
        steps: this.collectRecipeSteps(),
        drink: this.pairsWith,
        information: this.additionalInfo,
        source: {
          name: this.sourceName,
          date: this.sourceDate,
          url: this.sourceUrl,
        },
      };

      const a = document.createElement('a');
      const file = new Blob([JSON.stringify(recipeObject)], { type: 'application/json' });

      a.href = URL.createObjectURL(file);
      a.target = '_blank';
      a.download = `${this.recipeName}.json`;
      a.click();

      URL.revokeObjectURL(a.href);
    },
    /**
     * Collect cateogires
     */
    collectCategories() {
      return Array.from(this.$refs.categories.querySelectorAll('input:checked')).map(cat => cat.value);
    },
    collectRecipeSteps() {
      return Array.from(this.$refs.recipeSteps.querySelectorAll('li input')).map(input => input.value);
    },
    collectIngredients() {
      const mappedIngredients = [];

      const groupNames = Array.from(this.$refs.ingredients.querySelectorAll('h3 input')).map(el => el.value);

      const groups = Array.from(this.$refs.ingredients.querySelectorAll('ul'));
      groups.forEach((group, index) => {
        const ingredients = Array.from(group.querySelectorAll('li'));

        const components = [];
        ingredients.forEach(ingredient => {
          const single = Array.from(ingredient.querySelectorAll('input')).map(input => input.value);
          components.push({
            amount: Number(single[0]),
            unit: single[1],
            product: single[2],
          });
        });
        mappedIngredients.push({
          groupNames: groupNames[index],
          components,
        });
      });

      return mappedIngredients;
    },
    /**
     * Add new category
     */
    addNewCategory() {
      this.additionalCategories.push(this.newCategoryName);
      this.$store.dispatch('addCategory', this.newCategoryName);
      this.$nextTick(() => {
        this.newCategoryName = '';
      });
    },
    /**
     * Add a new recipe "group" component
     */
    addRecipeIngredientSection() {
      this.ingredients.push({
        groupName: '?',
        components: [
          { amount: 0, unit: '', product: '' },
          { amount: 0, unit: '', product: '' },
        ],
      });
    },
    /**
     * Delete recipe group
     * @param index
     */
    deleteRecipeGroup(index) {
      this.ingredients.splice(index, 1);
    },
    /**
     * When tabbing out from an ingredient field,
     * add a new field to the ingredients array.
     * Can be prevented by holding down alt key.
     */
    appendIngredient(index, subindex, altDown) {
      if (altDown === true) {
        return;
      }
      if (this.ingredients[index].components.length - 1 === subindex) {
        this.ingredients[index].components.push({ amount: 0, unit: '', product: '' });
      }
    },
    /**
     * Remove ingredient from group
     * @param index
     * @param subindex
     */
    removeIngredient(index, subindex) {
      this.ingredients[index].components.splice(subindex, 1);
    },
  },
};
</script>

<style lang="scss">
@import 'new_recipe';
</style>
