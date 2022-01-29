<template>
  <header>
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
