<template>
  <header class="border-b-2 border-b-yellow-400 dark:border-b-stone-700">
    <nav class="p-4">
      <router-link :to="{ name: 'ViewHome' }">{{ locale.home }}</router-link>
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
