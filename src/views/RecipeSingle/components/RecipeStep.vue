<template>
  <span tabindex="0" :class="{ used: toggled }" @click="toggle" @keydown.enter="toggle" v-html="description"></span>
</template>

<script>
export default {
  name: 'RecipeStep',
  props: {
    description: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      toggled: false,
    };
  },
  methods: {
    toggle() {
      this.toggled = !this.toggled;
    },
  },
};
</script>

<style scoped>
span {
  @apply cursor-pointer;
}
.used {
  @apply line-through text-slate-400 dark:text-gray-600;
}
span ::v-deep(time) {
  @apply font-mono text-emerald-800 text-xs dark:text-emerald-500;
}

.used ::v-deep(time) {
  @apply text-slate-400 dark:text-gray-600;
}
</style>
