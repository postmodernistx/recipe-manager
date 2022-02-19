<template>
  <span>
    <input
      v-model="stepDesc"
      type="text"
      class="!text-left"
      @keydown.tab="tabOut($event)"
      placeholder="…"
    />
  </span>
</template>

<script>
export default {
  name: 'NewRecipeStep',
  props: {
    stepDescription: {
      type: String,
      default: '',
    },
    index: {
      type: Number,
      required: true,
    },
  },
  emits: ['stepDescriptionChanged', 'tabbed'],
  data() {
    return {
      stepDesc: this.$props.stepDescription ?? '',
    };
  },
  methods: {
    tabOut(e) {
      this.$emit('tabbed', { alt: e.altKey, shift: e.shiftKey });
    },
  },
};
</script>
