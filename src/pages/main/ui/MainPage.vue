<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue';

import { BaseLayout } from '@widgets/base-layout';

import { FilterPaintings } from '@features/filter-paintings';

import { PaintingItem } from '@entities/painting';

import { type Painting, getPaintings } from '@shared/api';
import { API_URL } from '@shared/config';
import { BaseIconButton, BaseInput, BasePagination, FilterIcon, SearchIcon } from '@shared/ui';

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
    console.log(response.data);
    pages.value = response.data.pages;
    paintings.value = response.data.paintings;
    console.log(pages.value);
  } catch {
    error.value = 'Oops! Something went wrong!';
  } finally {
    loading.value = false;
  }
};

onBeforeMount(handleGetPaintings);
watch([page, searchValue], handleGetPaintings);
watch(searchValue, () => {
  page.value = 1;
  console.log('@@');
});
</script>

<template>
  <BaseLayout>
    <main :class="$style.main">
      <div :class="$style.list">
        <div :class="$style['search-container']">
          <BaseInput
            :class="$style['search-input']"
            :value="searchValue"
            v-model="searchValue"
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
      <template v-if="!error">
        <div :class="$style.list">
          <PaintingItem
            v-for="painting in paintings"
            :key="painting.id"
            :artist="painting.author.name"
            :date="painting.created"
            :image-url="`${API_URL}/${painting.imageUrl}`"
            :location="painting.location.location"
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
  </BaseLayout>
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
