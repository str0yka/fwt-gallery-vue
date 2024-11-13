<template>
  <div :class="$style.container"><slot /></div>
</template>

<style lang="scss" module>
@import '@app/styles/mixins';

.container {
  padding: 12px 20px;

  @include media-from-tablet {
    padding: 24px 20px;
  }

  @include media-from-desktop {
    padding: 24px 20px;
  }

  @include media-from-desktop {
    padding: 20px 100px;
  }
}
</style>
