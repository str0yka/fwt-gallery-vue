<script setup lang="ts">
import { range } from '@shared/lib';
import { defineProps, computed } from 'vue';
import { ChevronIcon } from './icons';

const props = withDefaults(
  defineProps<{
    totalPages: number;
    sideButtons?: boolean;
    siblingCount?: number;
  }>(),
  { siblingCount: 2 },
);

const firstPage = 1;
const lastPage = props.totalPages;

const currentPage = defineModel<number>({ required: true });

const previousPage = computed(() => Math.max(currentPage.value - 1, firstPage));
const nextPage = computed(() => Math.min(currentPage.value + 1, lastPage));

const totalVisiblePages = computed(() => 2 * props.siblingCount + 5);

const leftSiblingPage = computed(() => Math.max(currentPage.value - props.siblingCount, firstPage));
const rightSiblingPage = computed(() => Math.min(currentPage.value + props.siblingCount, lastPage));

const shouldHaveLeftSpace = computed(() => leftSiblingPage.value > firstPage + 2);
const shouldHaveRightSpace = computed(() => rightSiblingPage.value < lastPage - 2);

const pages = computed(() => {
  if (totalVisiblePages.value >= props.totalPages) {
    return range(firstPage, lastPage);
  } else if (!shouldHaveLeftSpace.value && !shouldHaveRightSpace.value) {
    return range(firstPage, lastPage);
  } else if (!shouldHaveLeftSpace.value && shouldHaveRightSpace.value) {
    return [...range(1, totalVisiblePages.value - 2), null, lastPage];
  } else if (shouldHaveLeftSpace.value && !shouldHaveRightSpace.value) {
    return [firstPage, null, ...range(props.totalPages - (totalVisiblePages.value - 3), lastPage)];
  }
  return [firstPage, null, ...range(leftSiblingPage.value, rightSiblingPage.value), null, lastPage];
});
</script>

<template>
  <nav class="wrapper">
    <button
      v-if="sideButtons"
      type="button"
      aria-label="previous page"
      :disabled="currentPage === previousPage"
      :class="['side-button', 'left']"
      @click="currentPage = previousPage"
    >
      <ChevronIcon />
    </button>
    <div class="list">
      <template
        v-for="page in pages"
        :key="page"
      >
        <button
          v-if="page"
          type="button"
          :class="[
            'list-item',
            {
              current: page === currentPage,
            },
          ]"
          @click="currentPage = page"
        >
          {{ page }}
        </button>
        <div
          v-else
          class="space-item"
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
      class="side-button"
      @click="currentPage = nextPage"
    >
      <ChevronIcon />
    </button>
  </nav>
</template>

<style lang="scss" scoped>
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
