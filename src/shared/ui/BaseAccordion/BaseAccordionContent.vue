<script lang="ts" setup>
import { inject, type ComputedRef, defineOptions } from 'vue';

const open = inject<ComputedRef<boolean>>('open');
defineOptions({ inheritAttrs: false });
</script>

<template>
  <Transition
    :enter-active-class="$style['v-enter-active']"
    :leave-active-class="$style['v-leave-active']"
    :enter-from-class="$style['v-enter-from']"
    :enter-to-class="$style['v-enter-to']"
    :leave-from-class="$style['v-leave-from']"
    :leave-to-class="$style['v-leave-to']"
  >
    <div
      v-if="open"
      :class="[$style.container]"
    >
      <div
        :class="$style.content"
        v-bind="$attrs"
      >
        <slot />
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" module>
.content {
  overflow: hidden;
}

.container {
  display: grid;
  margin-top: 24px;
  grid-template-rows: 1fr;
}

.v-enter-active,
.v-leave-active {
  transition:
    grid-template-rows 300ms,
    margin-top 300ms;
}

.v-enter-from,
.v-leave-to {
  margin-top: 0px;
  grid-template-rows: 0fr;
}
</style>
