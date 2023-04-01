import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faTrash, faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(faTrash, faArrowUp, faTwitter, faLinkedin)

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia());
app.use(router);

app.mount("#app");
