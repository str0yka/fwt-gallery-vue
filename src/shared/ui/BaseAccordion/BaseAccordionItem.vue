<script lang="ts" setup>
import { type Ref, computed, inject, provide } from 'vue';

const props = defineProps<{ value: string }>();
const opened = inject<Ref<string[]>>('opened');

const open = computed(() => !!opened?.value.some((openedValue) => props.value === openedValue));

provide('value', props.value);
provide('open', open);
</script>

<template>
  <slot />
</template>
