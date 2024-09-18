<script setup lang="ts">
import { ToggleThemeButton } from '@features';

import { BaseContainer, LogoIcon } from '@shared/ui';
</script>

<template>
  <BaseContainer>
    <header :class="$style.header">
      <LogoIcon :class="$style.logo" />
      <ToggleThemeButton />
    </header>
  </BaseContainer>
</template>

<style lang="scss" module>
@import '@app/styles/mixins';

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  width: 73px;
  height: 16px;
  color: var(--color-text-secondary);

  @include media-from-desktop {
    width: 91px;
    height: 20px;
  }
}
</style>
