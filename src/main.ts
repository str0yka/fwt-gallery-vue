import './app/styles/global.scss';
import './app/styles/mixins.scss';
import './app/styles/themes.scss';
import './app/styles/variables.scss';
import './app/styles/fonts.scss';
import './app/styles/reset.scss';

import { createApp } from 'vue';
import { App } from '@app/ui';
import { createPinia } from 'pinia';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

app.mount('#app');
