<script setup lang="ts">
const value = defineModel<string>();
defineOptions({ inheritAttrs: false });
</script>

<template>
  <label
    class="wrapper"
    v-bind:class="$attrs.class"
  >
    <slot name="start-adornment" />
    <input
      v-bind="{ ...$attrs, class: undefined }"
      class="input"
      :size="1"
      :value="value"
      @input="value = ($event.target as HTMLInputElement).value"
    />
    <slot name="end-adornment" />
  </label>
</template>

<style scoped lang="scss">
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
