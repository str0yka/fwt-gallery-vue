<template>
  <button>
    <slot />
  </button>
</template>

<style lang="scss" scoped>
button {
  width: 36px;
  height: 36px;
  border-radius: 4px;
  background-color: var(--color-background-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);

  &:hover,
  &:active {
    background-color: var(--color-hovered);
    color: var(--color-text-primary);
  }
}
</style>
