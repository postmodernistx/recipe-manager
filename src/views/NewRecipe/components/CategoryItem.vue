<template>
  <label class="flex gap-2 items-center mb-2">
    <input type="checkbox" class="!w-[20px]" :value="categoryName" :checked="checked" />
    <span>{{ categoryName }}</span>
  </label>
</template>

<script>
export default {
  name: 'CategoryItem',
  props: {
    categoryName: {
      type: String,
      default: '',
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
