<template>
  <section class="px-8 py-8 with-bg">
    <div class="font-bold text-center max-w-lg mx-auto mb-8">
      <span class="border-b-2 border-b-red-600 text-xs text-red-600 uppercase">Recept</span>
      <div class="font-normal font-serif mt-4 max-w-sm mx-auto">
        Simppeli kasvispiirakka syntyy punasipulista, jonka täyteläistä makumaailmaa
        tumma olut suvereenisti täydentää.
      </div>
      <h1 class="mt-4 text-3xl font-serif">Jauhelihapasta olutsipulilla</h1>
    </div>

    <div class="text-center max-w-sm mx-auto mt-8 mb-12 font-serif text-sm md:grid md:gap-2 md:grid-cols-4">
      <div class="metadata" title="Portioner">
        <CakeIcon class="h-5 w-5" />
        <span>6</span>
      </div>
      <div class="metadata" title="Total tid">
        <ClockIcon class="h-5 w-5" />
        <span>1,5 h</span>
      </div>
      <div class="metadata" title="Aktiv tid">
        <ChartPieIcon class="h-5 w-5" />
        <span>30 min</span>
      </div>
      <div class="metadata" title="Passiv tid">
        <FastForwardIcon class="h-5 w-5" />
        <span>60 min</span>
      </div>
    </div>

    <section class="six-columns">
      <div class="mb-8 ingredients">
        <h2 class="font-bold mb-2 uppercase">Ingredienser</h2>
        <!-- todo: scale recipe -->
        <h3 class="font-bold mb-1">Botten</h3>
        <ul>
          <li>100 g margarin</li>
          <li><IngredientItem :amount="3" unit="dl" name="tattarijauhoja" /></li>
          <li><IngredientItem name="salt" :amount="0.5" unit="tsk" /></li>
          <li><IngredientItem name="mörk lager-öl" :amount="1" unit="dl" /></li>
        </ul>

        <h3>Fyllning</h3>
        <ul>
          <li>100 g pinjenötter</li>
          <li>1 liten vitlöksklyfta</li>
        </ul>

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
          <li v-for="n in 10" :key="n" class="mb-2">
            <span class="text-sm font-bold pr-2">{{ n }}</span>
            <RecipeStep
              class="font-serif"
              description="Lorem ipsum dolor sit amet, <time>30 min</time> consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore."
            />
          </li>
        </ol>
      </div>
    </section>

    <section class="two-columns">
      <div class="font-bold my-8">
        <span class="border-b-2 border-b-red-600 text-xs text-red-600 uppercase">Dryck</span>
        <div class="font-normal mt-4">
          Simppeli kasvispiirakka syntyy punasipulista, jonka täyteläistä makumaailmaa
          tumma olut suvereenisti täydentää.
        </div>
      </div>

      <div class="font-bold my-8">
        <span class="border-b-2 border-b-red-600 text-xs text-red-600 uppercase">Information</span>
        <div class="font-normal mt-4">
          Simppeli kasvispiirakka syntyy punasipulista, jonka täyteläistä makumaailmaa
          tumma olut suvereenisti täydentää.
        </div>
      </div>

      <div class="font-bold my-8">
        <span class="border-b-2 border-b-red-600 text-xs text-red-600 uppercase">Källa</span>
        <div class="font-normal mt-4">
          <a href="https://ica.se/recept" target="_blank" rel="noopener noreferrer">ICA Recept</a>
          | 2022-01-20
        </div>
      </div>
    </section>

  </section>
</template>

<script>
import IngredientItem from './components/IngredientItem.vue';
import RecipeStep from './components/RecipeStep.vue';

import { CakeIcon, ClockIcon, FastForwardIcon, ChartPieIcon } from '@heroicons/vue/outline';

export default {
  name: 'RecipeSingle',
  components: { RecipeStep, IngredientItem, CakeIcon, ClockIcon, FastForwardIcon, ChartPieIcon },
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

h3 {
  @apply font-bold mb-1 mt-2;
}

.metadata {
  @apply flex gap-2 justify-items-center;
}

.with-bg {
  background-color: #ffffff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23ff002f' fill-opacity='0.06' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
}
</style>
