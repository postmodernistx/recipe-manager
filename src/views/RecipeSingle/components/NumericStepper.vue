<template>
  <div class="flex items-center justify-between max-w-[200px]">
    <button class="w-[50px] h-[35px] font-bold text-lg" @click="decreaseValue">-</button>
    <input v-model="inputValue" min="1" type="number" class="w-[65px] text-center p-1" @change="updateValue" />
    <button class="w-[50px] h-[35px] font-bold text-lg" @click="increaseValue">+</button>
  </div>
</template>

<script>
export default {
  name: 'NumericStepper',
  props: {
    initialValue: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  emits: ['valueChanged'],
  data() {
    return {
      inputValue: this.$props.initialValue,
    };
  },
  activated() {
    // Update on route change, as we have a keep-alive wrapper
    this.inputValue = this.$props.initialValue;
  },
  created() {
    this.inputValue = this.$props.initialValue;
  },
  methods: {
    decreaseValue() {
      if (this.inputValue - 1 > 0) {
        this.inputValue -= 1;
        this.$nextTick(this.acknowledgeValueChange);
      }
    },
    increaseValue() {
      this.inputValue += 1;
      this.$nextTick(this.acknowledgeValueChange);
    },
    updateValue() {
      if (this.inputValue < 1) {
        this.inputValue = 1;
      }
      this.$nextTick(this.acknowledgeValueChange);
    },
    acknowledgeValueChange() {
      this.$emit('valueChanged', this.inputValue);
    },
  },
};
</script>
