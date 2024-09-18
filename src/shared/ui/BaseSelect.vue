<script setup lang="ts" generic="OptionValue extends string | number, OptionData extends unknown">
import { computed, defineOptions, defineProps, ref } from 'vue';

import BaseInput from './BaseInput.vue';
import { ExpandIcon } from './icons';

export interface Option<
  Value extends string | number = string | number,
  Data extends unknown = unknown,
> {
  value: Value;
  data?: Data;
  label: string;
}

const props = defineProps<{
  value?: OptionValue;
  options: Option<OptionValue, OptionData>[];
  onSelect?: (option: Option<OptionValue, OptionData>) => void;
}>();

defineOptions({ inheritAttrs: false });

const open = ref(false);
const inputValue = ref('');

const filteredOptions = computed(() =>
  props.options.filter((option) =>
    option.label.toLowerCase().includes(inputValue.value.toLowerCase()),
  ),
);

const handleOpen = () => {
  inputValue.value = '';
  open.value = true;
};

const handleSelect = (option: Option<OptionValue, OptionData>) => {
  open.value = false;
  props.onSelect?.(option);
};

const selectedOption = computed(() => props.options.find((option) => option.value === props.value));
</script>

<template>
  <div :class="$style.wrapper">
    <BaseInput
      :value="open ? inputValue : selectedOption?.label"
      @input="(event) => (inputValue = (event.target as HTMLInputElement).value)"
      @focus.prevent="handleOpen"
      v-bind="$attrs"
      v-click-outside="() => (open = false)"
    >
      <template #end-adornment>
        <ExpandIcon :class="[$style['expand-icon'], { [$style.open]: open }]" />
      </template>
    </BaseInput>
    <div
      v-if="open"
      :class="$style['list-wrapper']"
    >
      <ul :class="$style.list">
        <template v-if="open">
          <li
            v-for="option in filteredOptions"
            :key="option.value"
            :class="[$style['list-item'], { [$style.selected]: option.value === value }]"
            @click="handleSelect(option)"
          >
            <p :class="$style['list-item-label']">{{ option.label }}</p>
          </li>
        </template>
        <p
          v-else
          :class="$style['list-empty-message']"
        >
          There are no matching results for your query.
        </p>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" module>
@import '@app/styles/mixins';

.wrapper {
  position: relative;
}

.expand-icon {
  width: 20px;
  height: 20px;
  color: var(--color-placeholder);

  &.open {
    transform: rotate(180deg);
  }
}

.list-wrapper {
  z-index: 100000000000;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--color-background-tertiary);
  border-radius: 0 0 4px 4px;
}

.list {
  max-height: 220px;
  margin-top: 12px;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    height: 4px;
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    border-radius: 0;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background-color: var(--color-scrollbar-thumb);
  }
}

.list-item {
  width: 100%;
  color: var(--color-text-secondary);
  padding: 8px 16px;
  cursor: default;

  &:hover,
  &:focus-visible,
  &.active,
  &.selected {
    background-color: var(--color-hovered);
  }
}

.list-item-label {
  @include typography-paragraph-base-light;
}

.list-empty-message {
  max-width: 264px;
  padding: 8px 16px;
  color: var(--color-placeholder);

  @include typography-paragraph-base-light;
}
</style>
