<template>
  <header>
    <nav>
      <router-link :to="{ name: 'ViewHome' }">Home</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'PageHeader',
};
</script>
