<script lang="ts" setup>
import { THEME } from '@shared/config';
import { useThemeStore } from '@shared/model';
import { MoonIcon, SunIcon } from '@shared/ui';

const themeStore = useThemeStore();
</script>

<template>
  <button
    :class="$style['toggle-theme-button']"
    @click="themeStore.toggle"
  >
    <SunIcon v-if="themeStore.theme === THEME.DARK" />
    <MoonIcon v-if="themeStore.theme === THEME.LIGHT" />
  </button>
</template>

<style lang="scss" module>
.toggle-theme-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-background-secondary);
  color: var(--color-text-tertiary);
}
</style>
