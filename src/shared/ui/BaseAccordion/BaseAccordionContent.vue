<script lang="ts" setup>
import { inject, type ComputedRef } from 'vue';

const open = inject<ComputedRef<boolean>>('open');
</script>

<template>
  <div :class="['wrapper', { expanded: open }]">
    <di class="content">
      <slot />
    </di>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 300ms;

  &.expanded {
    grid-template-rows: 1fr;
  }
}

.content {
  overflow: hidden;
}
</style>
