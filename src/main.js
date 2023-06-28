import { createApp, markRaw } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/styles.scss';
import PrimeVue from 'primevue/config';
import { createPinia } from "pinia";

import Breadcrumb from 'primevue/breadcrumb';
import Button from 'primevue/button';
import Calendar from 'primevue/calendar';
import Card from 'primevue/card';
import Checkbox from 'primevue/checkbox';
import DataTable from 'primevue/datatable';
import Dialog from 'primevue/dialog';
import Column from 'primevue/column';
import Dropdown from 'primevue/dropdown';
import Editor from 'primevue/editor';
import FileUpload from 'primevue/fileupload';
import InputSwitch from 'primevue/inputswitch';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Image from 'primevue/image';
import Knob from 'primevue/knob';
import Listbox from 'primevue/listbox';
import MultiSelect from 'primevue/multiselect';
import Rating from 'primevue/rating';
import RadioButton from 'primevue/radiobutton';
import Password from 'primevue/password';
import Textarea from 'primevue/textarea';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import InlineMessage from 'primevue/inlinemessage';
import Message from 'primevue/message';
import Tag from 'primevue/tag';
import TieredMenu from 'primevue/tieredmenu';
import Paginator from 'primevue/paginator';
import ProgressSpinner from 'primevue/progressspinner';


const pinia = createPinia();
const app = createApp(App);

app.use(pinia);

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.use(router);
app.use(PrimeVue, { ripple: true });
app.use(ToastService);

app.component('Breadcrumb', Breadcrumb);
app.component('Button', Button);
app.component('Calendar', Calendar);
app.component('Card', Card);
app.component('Checkbox', Checkbox);
app.component('Column', Column);
app.component('DataTable', DataTable);
app.component('Dialog', Dialog);
app.component('Dropdown', Dropdown);
app.component('Editor', Editor);
app.component('FileUpload', FileUpload);
app.component('InputSwitch', InputSwitch);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('Image', Image);
app.component('Knob', Knob);
app.component('Listbox', Listbox);
app.component('MultiSelect', MultiSelect);
app.component('Rating', Rating);
app.component('RadioButton', RadioButton);
app.component('Password', Password);
app.component('Textarea', Textarea);
app.component('Toast', Toast);
app.component('InlineMessage', InlineMessage);
app.component('Message', Message);
app.component('Tag', Tag);
app.component('TieredMenu', TieredMenu);
app.component('Paginator', Paginator);
app.component('ProgressSpinner', ProgressSpinner);



app.mount('#app');
