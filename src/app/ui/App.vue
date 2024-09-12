<script setup lang="ts">
import { PaintingItem } from '@entities';
import { FilterPaintings } from '@features';
import { getPaintings, type Painting } from '@shared/api';
import { API_URL } from '@shared/constants';
import {
  FilterIcon,
  BaseContainer,
  BaseIconButton,
  BasePagination,
  BaseInput,
  SearchIcon,
  BaseAccrodion,
  BaseAccordionTrigger,
  BaseAccordionContent,
  BaseAccordionItem,
  BaseDrawer,
} from '@shared/ui';
import { LayoutHeader } from '@widgets';
import { onBeforeMount, ref, watch } from 'vue';

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
    const response = await getPaintings({ limit: 6, page: page.value, query: searchValue.value });
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
    <main>
      <div class="list">
        <div class="search-container">
          <BaseInput
            class="search-input"
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
      <template v-if="!loading">
        <div class="list">
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
          class="pagination"
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

<style scoped lang="scss">
@import '@app/styles/mixins';

main {
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
