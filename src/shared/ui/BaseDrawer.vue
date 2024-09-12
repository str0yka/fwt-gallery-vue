<script setup lang="ts">
import { defineProps, defineOptions } from 'vue';

export interface BaseDrawerProps {
  open?: boolean;
  onClose?: () => void;
}

defineProps<BaseDrawerProps>();
defineOptions({ inheritAttrs: false });
</script>

<template>
  <div
    v-if="open"
    class="overlay"
    @click="onClose"
  />
  <Transition name="drawer">
    <div
      v-bind="$attrs"
      v-if="open"
      class="drawer"
    >
      <slot />
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.overlay {
  position: fixed;
  inset: 0;
}

.drawer {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  max-width: 280px;
  width: 100%;
  background-color: var(--color-background-primary);
}

.drawer-enter-active,
.drawer-leave-active {
  transition: transform 300ms ease-in;
}

.drawer-enter-from {
  transform: translateX(100%);
}

.drawer-leave-to {
  transform: translateX(100%);
}
</style>
