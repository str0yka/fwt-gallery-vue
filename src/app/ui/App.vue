<script setup lang="ts">
import { PaintingItem } from '@entities';
import { getPaintings, type Painting } from '@shared/api';
import { API_URL } from '@shared/constants';
import {
  FilterIcon,
  IconButton,
  LayoutContainer,
  LayoutPagination,
  SearchIcon,
  TextInput,
} from '@shared/ui';
import { LayoutHeader } from '@widgets';
import { onBeforeMount, ref, watch } from 'vue';

const paintings = ref<Painting[]>([]);

const page = ref(1);
const pages = ref<number | null>(null);
const searchValue = ref('');

const handleGetPaintings = async () => {
  const response = await getPaintings({ limit: 6, page: page.value });

  if (response.ok) {
    pages.value = response.data.pages;
    paintings.value = response.data.paintings;
  }
};

watch(page, handleGetPaintings);
onBeforeMount(handleGetPaintings);
</script>

<template>
  <LayoutHeader />
  <LayoutContainer>
    <main>
      <div class="list">
        <div class="search-container">
          <TextInput
            class="search-input"
            v-model="searchValue"
            placeholder="awdawd"
          >
            <template #start-adornment>
              <SearchIcon />
            </template>
          </TextInput>
          <IconButton>
            <FilterIcon />
          </IconButton>
        </div>
      </div>
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
      <LayoutPagination
        v-if="pages"
        class="pagination"
        side-buttons
        v-model="page"
        :total-pages="pages"
      />
    </main>
  </LayoutContainer>
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
