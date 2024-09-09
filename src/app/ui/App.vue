<script setup lang="ts">
import { PaintingItem } from '@entities';
import { getPaintings, type Painting } from '@shared/api';
import { API_URL } from '@shared/constants';
import { LayoutContainer } from '@shared/ui';
import { LayoutHeader } from '@widgets';
import { onBeforeMount, ref } from 'vue';

const paintings = ref<Painting[]>([]);

console.log(paintings.value);

onBeforeMount(async () => {
  const response = await getPaintings({ limit: 10 });

  if (response.ok) {
    paintings.value = response.data;
  }
});
</script>

<template>
  <LayoutHeader />
  <LayoutContainer>
    <main>
      <PaintingItem
        v-for="painting in paintings"
        :key="painting.id"
        :artist="painting.author.name"
        :date="painting.created"
        :image-url="`${API_URL}/${painting.imageUrl}`"
        :location="painting.location.location"
        :name="painting.name"
      />
    </main>
  </LayoutContainer>
</template>

<style scoped lang="scss">
@import '@app/styles/mixins';

main {
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
</style>
