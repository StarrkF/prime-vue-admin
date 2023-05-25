import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles.scss';
import PrimeVue from 'primevue/config';

import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Checkbox from 'primevue/checkbox';
import Dropdown from 'primevue/dropdown';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Knob from 'primevue/knob';
import Listbox from 'primevue/listbox';
import MultiSelect from 'primevue/multiselect';
import Rating from 'primevue/rating';
import RadioButton from 'primevue/radiobutton';
import Textarea from 'primevue/textarea';

const app = createApp(App);

app.use(router);
app.use(PrimeVue, { ripple: true });

app.component('Button', Button);
app.component('Calendar', Calendar);
app.component('Checkbox', Checkbox);
app.component('Dropdown', Dropdown);
app.component('InputSwitch', InputSwitch);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('Knob', Knob);
app.component('Listbox', Listbox);
app.component('MultiSelect', MultiSelect);
app.component('Rating', Rating);
app.component('RadioButton', RadioButton);
app.component('Textarea', Textarea);

app.mount('#app');
