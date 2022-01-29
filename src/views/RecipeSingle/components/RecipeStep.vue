<template>
  <li @click="toggle" @keydown.enter="toggle" @keydown.space="toggle">
    <span class="text-sm font-bold pr-2 dark:text-neutral-200 print:text-black">{{ stepNumber }}</span>
    <span class="font-serif" tabindex="0" :class="{ used: toggled }" v-html="description"></span>
  </li>
</template>

<script>
export default {
  name: 'RecipeStep',
  props: {
    stepNumber: {
      type: [String, Number],
      default: 0,
    },
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
      if (!window.getSelection().isCollapsed) {
        // User is selecting text, rather than clicking to toggle recipe step
        return;
      }
      this.toggled = !this.toggled;
    },
  },
};
</script>

<style scoped>
li {
  @apply cursor-pointer;
}
.used {
  @apply line-through text-slate-400 dark:text-gray-600 print:no-underline print:text-black;
}
span ::v-deep(time) {
  @apply font-mono text-emerald-800 text-xs dark:text-emerald-500 print:text-black;
}

.used ::v-deep(time) {
  @apply text-slate-400 dark:text-gray-600 print:text-black;
}
</style>
