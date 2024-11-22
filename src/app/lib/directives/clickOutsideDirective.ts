import type { Directive } from 'vue';

export const clickOutsideDirective: Directive<HTMLElement, (...args: unknown[]) => unknown> = {
  beforeMount(el, binding, vnode) {
    (el as any).clickOutsideEvent = (event: MouseEvent) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value();
      }
    };
    document.body.addEventListener('click', (el as any).clickOutsideEvent);
  },
  unmounted(el) {
    document.body.removeEventListener('click', (el as any).clickOutsideEvent);
  },
};
