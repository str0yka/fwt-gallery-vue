import { createPinia } from 'pinia';
import { createApp } from 'vue';

import { clickOutsideDirective } from '@app/lib';
import { App } from '@app/ui';

import './app/styles/fonts.scss';
import './app/styles/global.scss';
import './app/styles/mixins.scss';
import './app/styles/reset.scss';
import './app/styles/themes.scss';
import './app/styles/variables.scss';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.directive('click-outside', clickOutsideDirective);
app.mount('#app');
