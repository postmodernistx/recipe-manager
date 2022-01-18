<template>
  <span tabindex="0" :class="{ used: toggled }" @click="toggle" @keydown.enter="toggle">
    {{ amount }} {{ unit }} {{ name }}
  </span>
</template>

<script>
export default {
  name: 'IngredientItem',
  props: {
    amount: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      default: '',
    },
    name: {
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
</style>
