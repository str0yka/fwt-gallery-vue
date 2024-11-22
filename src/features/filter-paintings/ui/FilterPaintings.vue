<script setup lang="ts">
import { computed, onBeforeMount, ref } from 'vue';

import { type Author, type PaintingLocation, getAuthors, getLocations } from '@shared/api';
import {
  BaseAccordionContent,
  BaseAccordionItem,
  BaseAccordionTrigger,
  BaseAccrodion,
  BaseButton,
  BaseDrawer,
  type BaseDrawerProps,
  BaseInput,
  BaseSelect,
  MinusIcon,
  type Option,
} from '@shared/ui';

defineProps<BaseDrawerProps>();
defineOptions({ inheritAttrs: false });

const authors = ref<Author[]>([]);
const locations = ref<PaintingLocation[]>([]);

type AuthorOption = Option<Author['id'], Author>;
type LocationOption = Option<PaintingLocation['id'], PaintingLocation>;

const authorOptions = computed<AuthorOption[]>(() =>
  authors.value.map((author) => ({ label: author.name, value: author.id, data: author })),
);

const locationOptions = computed<LocationOption[]>(() =>
  locations.value.map((location) => ({ label: location.name, value: location.id, data: location })),
);

const selectedAuthorOption = ref<AuthorOption | null>(null);

onBeforeMount(async () => {
  const [locationsResponse, authorsResponse] = [await getLocations(), await getAuthors()];
  locations.value = locationsResponse.data;
  authors.value = authorsResponse.data;
});
</script>

<template>
  <Teleport to="body">
    <BaseDrawer
      :class="$style.container"
      :open="open"
      @close="onClose"
    >
      <div :class="$style.wrapper">
        <BaseAccrodion multiple>
          <BaseAccordionItem value="artist">
            <div :class="$style['accordion-item']">
              <BaseAccordionTrigger>Artist</BaseAccordionTrigger>
              <BaseAccordionContent>
                <BaseSelect
                  placeholder="Select the artist"
                  :value="selectedAuthorOption?.value"
                  :options="authorOptions"
                  @select="(option) => (selectedAuthorOption = option)"
                />
              </BaseAccordionContent>
            </div>
          </BaseAccordionItem>
          <BaseAccordionItem value="location">
            <div :class="$style['accordion-item']">
              <BaseAccordionTrigger>Location</BaseAccordionTrigger>
              <BaseAccordionContent>
                <BaseInput placeholder="Select the location" />
              </BaseAccordionContent>
            </div>
          </BaseAccordionItem>
          <BaseAccordionItem value="years">
            <div :class="$style['accordion-item']">
              <BaseAccordionTrigger>Years</BaseAccordionTrigger>
              <BaseAccordionContent :class="$style['years-container']">
                <BaseInput placeholder="From" />
                <MinusIcon :class="$style['years-icon']" />
                <BaseInput placeholder="To" />
              </BaseAccordionContent>
            </div>
          </BaseAccordionItem>
        </BaseAccrodion>
        <div :class="$style['bottom-panel']">
          <BaseButton>Show the results</BaseButton>
          <BaseButton disabled>Clear</BaseButton>
        </div>
      </div>
    </BaseDrawer>
  </Teleport>
</template>

<style lang="scss" module>
@import '@app/styles/mixins';

.container {
  max-width: 280px;
  width: 100%;

  @include media-from-tablet {
    max-width: 372px;
  }

  @include media-from-desktop {
    max-width: 492px;
  }
}

.wrapper {
  width: 240px;
  position: absolute;
  top: 124px;
  left: 20px;
  height: 355px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.accordion-item {
  display: flex;
  flex-direction: column;
}

.years-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.years-icon {
  color: var(--color-text-quaternary);
}

.bottom-panel {
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
