import { createPinia } from 'pinia';
import { createApp } from 'vue';

import { clickOutsideDirective } from '@app/lib';

import { MainPage } from '@pages/main';

import './styles/fonts.scss';
import './styles/global.scss';
import './styles/mixins.scss';
import './styles/reset.scss';
import './styles/themes.scss';
import './styles/variables.scss';

const pinia = createPinia();
const app = createApp(MainPage);

app.use(pinia);
app.directive('click-outside', clickOutsideDirective);
app.mount('#app');
