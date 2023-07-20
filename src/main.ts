import { createApp } from 'vue';
import { router } from '@/router';
import App from './App.vue';

import 'geometr/styles';

const application = createApp(App);

application.use(router);

application.mount('#app');
