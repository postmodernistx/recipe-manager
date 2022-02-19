<template>
  <div class="my-1 flex gap-4">
    <input v-model="newAmount" type="number" class="!w-[80px] !text-left border" />
    <input v-model="newUnit" type="text" class="!w-[60px] !text-left border" />
    <input v-model="newProduct" type="text" class="!text-left border" @keydown.tab="tabOut($event)" />
  </div>
</template>

<style scoped>
.border {
  @apply border-0 border-b-2 border-b-slate-600;
}
</style>

<script>
export default {
  name: 'NewRecipeIngredient',
  props: {
    amount: {
      type: Number,
      default: 0,
    },
    unit: {
      type: String,
      default: 'g',
    },
    product: {
      type: String,
      default: '',
    },
  },
  emits: ['tabbed'],
  data() {
    return {
      newAmount: this.$props.amount ?? 0,
      newUnit: this.$props.unit ?? 'g',
      newProduct: this.$props.product ?? 'tomato',
    };
  },
  methods: {
    tabOut(e) {
      const altKey = e.altKey || e.shiftKey;
      this.$emit('tabbed', altKey);
    },
  },
};
</script>
