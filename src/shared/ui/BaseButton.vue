<template>
  <button
    type="button"
    :class="$style.button"
  >
    <slot />
  </button>
</template>

<style lang="scss" module>
@import '@app/styles/mixins';

.button {
  color: var(--color-text-secondary);
  text-decoration: underline;

  @include typography-caption-base-bold;

  &:hover,
  &:active {
    color: var(--color-text-primary);
  }

  &:disabled {
    cursor: default;
    color: var(--color-disabled);
  }
}
</style>
