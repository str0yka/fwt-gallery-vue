<script setup lang="ts">
import { computed, defineProps } from 'vue';

import { range } from '@shared/lib';

import { ChevronIcon } from './icons';

const props = withDefaults(
  defineProps<{
    totalPages: number;
    sideButtons?: boolean;
    siblingCount?: number;
  }>(),
  { siblingCount: 2 },
);

const currentPage = defineModel<number>({ required: true });

const firstPage = 1;
const lastPage = computed(() => props.totalPages);

const previousPage = computed(() => Math.max(currentPage.value - 1, firstPage));
const nextPage = computed(() => Math.min(currentPage.value + 1, lastPage.value));

const totalVisiblePages = computed(() => 2 * props.siblingCount + 5);

const leftSiblingPage = computed(() => Math.max(currentPage.value - props.siblingCount, firstPage));
const rightSiblingPage = computed(() =>
  Math.min(currentPage.value + props.siblingCount, lastPage.value),
);

const shouldHaveLeftSpace = computed(() => leftSiblingPage.value > firstPage + 2);
const shouldHaveRightSpace = computed(() => rightSiblingPage.value < lastPage.value - 2);

const pages = computed(() => {
  if (totalVisiblePages.value >= props.totalPages) {
    return range(firstPage, lastPage.value);
  } else if (!shouldHaveLeftSpace.value && !shouldHaveRightSpace.value) {
    return range(firstPage, lastPage.value);
  } else if (!shouldHaveLeftSpace.value && shouldHaveRightSpace.value) {
    return [...range(1, totalVisiblePages.value - 2), null, lastPage.value];
  } else if (shouldHaveLeftSpace.value && !shouldHaveRightSpace.value) {
    return [
      firstPage,
      null,
      ...range(props.totalPages - (totalVisiblePages.value - 3), lastPage.value),
    ];
  }
  return [
    firstPage,
    null,
    ...range(leftSiblingPage.value, rightSiblingPage.value),
    null,
    lastPage.value,
  ];
});
</script>

<template>
  <nav :class="$style.wrapper">
    <button
      v-if="sideButtons"
      type="button"
      aria-label="previous page"
      :disabled="currentPage === previousPage"
      :class="[$style['side-button'], $style.left]"
      @click="currentPage = previousPage"
    >
      <ChevronIcon />
    </button>
    <div :class="$style.list">
      <template
        v-for="page in pages"
        :key="page"
      >
        <button
          v-if="page"
          type="button"
          :class="[
            $style['list-item'],
            {
              [$style.current]: page === currentPage,
            },
          ]"
          @click="currentPage = page"
        >
          {{ page }}
        </button>
        <div
          v-else
          :class="$style['space-item']"
        >
          ...
        </div>
      </template>
    </div>
    <button
      v-if="sideButtons"
      type="button"
      aria-label="next page"
      :disabled="currentPage === nextPage"
      :class="$style['side-button']"
      @click="currentPage = nextPage"
    >
      <ChevronIcon />
    </button>
  </nav>
</template>

<style lang="scss" module>
@import '@app/styles/mixins';

.wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
}

.list {
  display: flex;
  align-items: center;
  gap: 4px;
}

.list-item {
  padding: 1px 8px;
  color: var(--color-text-secondary);
  border-bottom: 1px transparent solid;

  @include typography-paragraph-big-light;

  &:hover {
    border-bottom: 1px var(--color-border-primary) solid;

    @include typography-paragraph-big-medium;
  }

  &.current {
    border-radius: 4px;
    background-color: var(--color-background-quaternary);
    border-bottom: 1px transparent solid;

    @include typography-paragraph-big-medium;
  }
}

.space-item {
  padding: 1px 8px;
  color: var(--color-text-secondary);

  @include typography-paragraph-big-light;
}

.side-button {
  width: 20px;
  height: 20px;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:disabled {
    pointer-events: none;
  }

  &:hover {
    color: var(--color-text-primary);
    background-color: var(--color-background-quaternary);
  }

  &.left {
    transform: rotate(180deg);
  }
}
</style>
