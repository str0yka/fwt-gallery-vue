<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';

import { LayoutHeader } from '@widgets';

import { FilterPaintings } from '@features';

import { PaintingItem } from '@entities';

import { type Painting, getPaintings } from '@shared/api';
import { API_URL } from '@shared/constants';
import {
  BaseAccordionContent,
  BaseAccordionItem,
  BaseAccordionTrigger,
  BaseAccrodion,
  BaseContainer,
  BaseDrawer,
  BaseIconButton,
  BaseInput,
  BasePagination,
  FilterIcon,
  SearchIcon,
} from '@shared/ui';

const paintings = ref<Painting[]>([]);

const loading = ref(false);
const error = ref('');

const page = ref(1);
const pages = ref<number | null>(null);
const searchValue = ref('');

const filterOpen = ref(false);

const handleGetPaintings = async () => {
  loading.value = true;
  error.value = '';

  try {
    const response = await getPaintings({
      query: { limit: 6, page: page.value, search: searchValue.value },
    });
    pages.value = response.data.pages;
    paintings.value = response.data.paintings;
  } catch {
    error.value = 'Oops! Something went wrong!';
  } finally {
    loading.value = false;
  }
};

watch(page, handleGetPaintings);
watch(searchValue, () => {
  page.value = 1;
  handleGetPaintings();
});
onBeforeMount(handleGetPaintings);
</script>

<template>
  <LayoutHeader />
  <BaseContainer>
    <main :class="$style.main">
      <div :class="$style.list">
        <div :class="$style['search-container']">
          <BaseInput
            :class="$style['search-input']"
            :value="searchValue"
            @input="searchValue = ($event.target as HTMLInputElement).value"
            placeholder="Painting title"
          >
            <template #start-adornment>
              <SearchIcon />
            </template>
          </BaseInput>
          <BaseIconButton @click="filterOpen = !filterOpen">
            <FilterIcon />
          </BaseIconButton>
        </div>
      </div>
      <template v-if="!loading">
        <div :class="$style.list">
          <PaintingItem
            v-for="painting in paintings"
            :key="painting.id"
            :artist="painting.author.name"
            :date="painting.created"
            :image-url="`${API_URL}/${painting.imageUrl}`"
            :location="painting.location.name"
            :name="painting.name"
          />
        </div>
        <BasePagination
          v-if="pages"
          :class="$style.pagination"
          side-buttons
          v-model="page"
          :total-pages="pages"
        />
      </template>
      <template v-else>
        {{ error }}
      </template>
    </main>
    <FilterPaintings
      :open="filterOpen"
      @close="filterOpen = false"
    />
  </BaseContainer>
</template>

<style lang="scss" module>
@import '@app/styles/mixins';

.main {
  display: flex;
  flex-direction: column;
}

.list {
  margin-top: 20px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 20px;

  @include media-from-tablet {
    grid-template-columns: repeat(2, 1fr);
    gap: 24px;
  }

  @include media-from-desktop {
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
  }
}

.search-container {
  grid-column: 1 / 2;
  display: flex;
  align-items: center;
  gap: 20px;

  @include media-from-tablet {
    grid-column: 2 / 3;
  }

  @include media-from-desktop {
    grid-column: 3 / 4;
  }
}

.search-input {
  flex-grow: 1;
}

.pagination {
  margin: 40px auto 0;
}
</style>
