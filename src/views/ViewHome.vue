<template>
  <div>
    <p>Home!</p>
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Recipe Manager</h1>
    <div v-if="!$store.getters.allRecipesLoaded">
      Loading…
    </div>
    <div v-else>
      <section class="filters">

      <ul v-for="recipe in $store.getters.allRecipes" :key="recipe.id">
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
};
</script>
