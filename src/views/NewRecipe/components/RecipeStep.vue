<template>
  <input v-model="stepDesc" type="text" class="!text-left" @change="updateDescription" />
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
  emits: ['stepDescriptionChanged'],
  data() {
    return {
      stepDesc: this.$props.stepDescription ?? '',
    };
  },
  methods: {
    updateDescription() {
      this.$emit('stepDescriptionChanged', this.stepDesc, this.index);
    },
  },
};
</script>
