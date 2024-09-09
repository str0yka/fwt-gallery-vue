<template>
  <div class="container"><slot /></div>
</template>

<style scoped lang="scss">
@import '@app/styles/mixins.scss';

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
