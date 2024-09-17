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
    :class="$style.overlay"
    @click="onClose"
  />
  <Transition
    name="drawer"
    :enter-active-class="$style['drawer-enter-active']"
    :leave-active-class="$style['drawer-leave-active']"
    :enter-from-class="$style['drawer-enter-from']"
    :leave-to-class="$style['drawer-leave-to']"
  >
    <div
      v-bind="$attrs"
      v-if="open"
      :class="$style.drawer"
    >
      <slot />
    </div>
  </Transition>
</template>

<style lang="scss" module>
.overlay {
  position: fixed;
  inset: 0;
}

.drawer {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: var(--color-background-primary);
}

.drawer-enter-active,
.drawer-leave-active {
  transition: transform 300ms ease-in;
}

.drawer-enter-from,
.drawer-leave-to {
  transform: translateX(100%);
}
</style>
