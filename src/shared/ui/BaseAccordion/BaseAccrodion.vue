<script lang="ts" setup>
import { provide, ref } from 'vue';

const props = defineProps<{
  multiple?: boolean;
}>();

const opened = ref<string[]>([]);

provide('opened', opened);
provide('multiple', props.multiple);
</script>

<template>
  <slot />
</template>
