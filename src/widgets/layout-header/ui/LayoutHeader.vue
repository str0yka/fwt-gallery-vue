<script setup lang="ts">
import { BaseContainer, LogoIcon } from '@shared/ui';
import { ToggleThemeButton } from '@features';
</script>

<template>
  <BaseContainer>
    <header>
      <LogoIcon class="logo" />
      <ToggleThemeButton />
    </header>
  </BaseContainer>
</template>

<style scoped lang="scss">
@import '@app/styles/mixins';

header {
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
