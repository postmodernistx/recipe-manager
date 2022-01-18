<template>
  <header>
    <nav>
      <router-link :to="{ name: 'ViewHome' }">Home</router-link> |
      <router-link :to="{ name: 'RecipeSingle', params: { name: 'some-random-recipe' } }">Recipe</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
};
</script>
