<script setup lang="ts">
import BaseLayoutContainer from './BaseLayoutContainer.vue';
import BaseLayoutHeader from './BaseLayoutHeader.vue';
</script>

<template>
  <BaseLayoutHeader />
  <BaseLayoutContainer>
    <slot />
  </BaseLayoutContainer>
</template>
