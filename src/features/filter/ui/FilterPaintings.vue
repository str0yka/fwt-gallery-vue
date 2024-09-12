<script setup lang="ts">
import { BaseDrawer, type BaseDrawerProps } from '@shared/ui';

defineProps<BaseDrawerProps>();
defineOptions({ inheritAttrs: false });
</script>

<template>
  <Teleport to="body">
    <BaseDrawer
      class="container"
      :open="open"
      @close="onClose"
    ></BaseDrawer>
  </Teleport>
</template>

<style lang="scss" scoped>
@import '@app/styles/mixins';

.container {
  max-width: 600px;
}
</style>
