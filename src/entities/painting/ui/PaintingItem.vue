<script setup lang="ts">
import { defineProps } from 'vue';
import { ArrowIcon } from '@shared/ui';

const { name, imageUrl } = defineProps<{
  imageUrl: string;
  name: string;
  date: string;
  artist: string;
  location: string;
}>();
</script>

<template>
  <article
    ref="{ref}"
    class="card-container"
  >
    <img
      class="image"
      :src="imageUrl"
      :alt="name"
    />
    <div class="info-container">
      <div :class="['info', 'primary']">
        <h2 class="title">{{ name }}</h2>
        <p class="description">{{ date }}</p>
      </div>
      <div :class="['info', 'secondary']">
        <h2 class="title">{{ artist }}</h2>
        <p class="description">{{ location }}</p>
      </div>
      <button
        class="button"
        type="button"
        :aria-label="name"
      >
        <ArrowIcon class="button-icon" />
      </button>
    </div>
  </article>
</template>

<style scoped lang="scss">
@import '@app/styles/mixins';

.image {
  position: absolute;
  width: 100%;
  height: 100%;
  inset: 0;
  object-fit: cover;
  transition: transform 300ms ease-out;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  transition:
    transform 300ms ease-out,
    opacity 300ms ease-out;

  &.primary {
    opacity: 1;
    transform: translate(0%, 0%);
  }

  &.secondary {
    opacity: 0;
    transform: translate(-100%, -100%);
  }
}

.card-container {
  position: relative;
  aspect-ratio: 280 / 185;
  overflow: hidden;

  &:hover {
    .image {
      transform: scale(1.05);
    }

    .info {
      &.primary {
        opacity: 0;
        transform: translate(0%, 100%);
      }

      &.secondary {
        opacity: 1;
        transform: translate(0%, -100%);
      }
    }
  }
}

.info-container {
  padding: 8px 12px;
  position: absolute;
  left: 0;
  bottom: 0;
  width: calc(100% - var(--button-width));
  max-width: 236px;
  height: 45px;
  background-color: var(--color-background-primary);

  --button-width: 24px;
}

.button {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 100%;
  width: var(--button-width);
  height: 100%;
  background-color: var(--color-accent);
}

.button-icon {
  position: absolute;
  top: 10px;
  left: 0;
  width: 20px;
  height: 20px;
  color: var(--color-primary-light-gray);
}

.title {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-text-tertiary);

  @include typography-h2;
}

.description {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-accent);

  @include typography-caption-small-bold;
}

@include media-from-tablet {
  .card-container {
    aspect-ratio: 352 / 220;
  }

  .info-container {
    padding: 12px;
    max-width: 300px;
    height: 66px;
  }

  .info {
    gap: 8px;
  }

  .title {
    @include typography-h1;
  }

  .description {
    @include typography-caption-base-bold;
  }

  .button-icon {
    top: 21px;
  }
}

@include media-from-desktop {
  .card-container {
    aspect-ratio: 392 / 260;
  }

  .info-container {
    padding: 20px;
    max-width: 300px;
    height: 82px;

    &::after {
      content: '';
      position: absolute;
      top: 20px;
      left: 0;
      width: 2px;
      height: calc(100% - (2 * 20px));
      background-color: var(--color-accent);
    }
  }

  .button {
    display: none;
  }
}
</style>
