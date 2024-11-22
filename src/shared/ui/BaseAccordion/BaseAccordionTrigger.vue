<script lang="ts" setup>
import { type ComputedRef, type Ref, inject } from 'vue';

import { MinusIcon, PlusIcon } from '../icons';

const opened = inject<Ref<string[]>>('opened');
const value = inject<string>('value');
const open = inject<ComputedRef<boolean>>('open');
const multiple = inject<boolean>('multiple');

const handleClick = () => {
  if (open && opened && typeof value === 'string' && typeof multiple === 'boolean') {
    if (open.value) {
      if (multiple) opened.value = opened.value.filter((openValue) => value !== openValue);
      else opened.value = [];
    } else {
      if (multiple) opened.value.push(value);
      else opened.value = [value];
    }
  }
};
</script>

<template>
  <button
    type="button"
    :class="$style.trigger"
    @click="handleClick"
  >
    <p :class="$style['trigger-text']">
      <slot />
    </p>
    <MinusIcon
      v-if="open"
      :class="$style['expand-icon']"
    />
    <PlusIcon
      v-else
      :class="$style['expand-icon']"
    />
  </button>
</template>

<style lang="scss" module>
@import '@app/styles/mixins';

.trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.trigger-text {
  color: var(--color-text-primary);

  @include typography-h2;

  @include media-from-tablet {
    @include typography-h1;
  }
}

.expand-icon {
  width: 12px;
  height: 12px;
  color: var(--color-text-secondary);

  @include media-from-tablet {
    width: 20px;
    height: 20px;
  }
}
</style>
