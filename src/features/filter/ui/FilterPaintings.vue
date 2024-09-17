<script setup lang="ts">
import {
  BaseAccordionContent,
  BaseAccordionItem,
  BaseAccordionTrigger,
  BaseAccrodion,
  BaseButton,
  BaseDrawer,
  BaseInput,
  BaseSelect,
  MinusIcon,
  type BaseDrawerProps,
} from '@shared/ui';

defineProps<BaseDrawerProps>();
defineOptions({ inheritAttrs: false });
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
              <BaseAccordionContent style="overflow: visible">
                <BaseSelect
                  placeholder="Select the artist"
                  :options="[
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                  ]"
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
