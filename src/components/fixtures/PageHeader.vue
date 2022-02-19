<template>
  <header class="border-b-2 border-b-yellow-400 dark:border-b-stone-700">
    <nav class="p-4 flex gap-4">
      <router-link :to="{ name: 'ViewHome' }">{{ locale.home }}</router-link>
      <router-link :to="{ name: 'NewRecipe' }">{{ locale.new_recipe }}</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
};
</script>

<style>
.router-link-active {
  @apply font-bold no-underline;
}
</style>
