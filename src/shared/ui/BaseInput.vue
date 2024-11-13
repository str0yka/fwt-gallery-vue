<script setup lang="ts">
import type { InputHTMLAttributes } from 'vue';

interface Props extends /* @vue-ignore */ InputHTMLAttributes {}

defineProps<Props>();
defineOptions({ inheritAttrs: false });
const model = defineModel();
</script>

<template>
  <label :class="[$style.wrapper, $attrs.class]">
    <slot name="start-adornment" />
    <input
      v-bind="{ ...$attrs, class: undefined }"
      :class="$style.input"
      :size="1"
      v-model="model"
    />
    <slot name="end-adornment" />
  </label>
</template>

<style lang="scss" module>
@import '@app/styles/mixins';

.wrapper {
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 4px;
  background-color: var(--color-background-tertiary);
  border: 1px var(--color-border-light) solid;
  color: var(--color-text-secondary);
  cursor: text;

  @include typography-paragraph-base-light;

  &:focus-within {
    border: 1px var(--color-border-medium) solid;
  }
}

.input {
  flex-grow: 1;

  &::placeholder {
    color: var(--color-placeholder);
  }
}
</style>
