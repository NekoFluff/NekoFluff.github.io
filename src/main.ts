import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import { createAuth0 } from '@auth0/auth0-vue';

import "./assets/main.css";

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faTrash, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import {
    faTwitter,
    faLinkedin,
    faGithub,
} from "@fortawesome/free-brands-svg-icons";

/* add icons to the library */
library.add(faTrash, faArrowUp, faTwitter, faLinkedin, faGithub);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.component('VueDatePicker', VueDatePicker);
app.use(createPinia());
app.use(router);
app.use(createAuth0({
    domain: 'dev-75kn0e8bkkrpjrsp.us.auth0.com',
    clientId: 'qWweE9keu2ORLPHzkddqYMju4Uh4m2Vn',
    authorizationParams: {
        redirect_uri: window.location.origin
    },
}));


app.mount("#app");
