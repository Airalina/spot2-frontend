import axios from 'axios';

// Configurar Axios para incluir el token CSRF en todas las solicitudes
// axios.defaults.withCredentials = true;

// const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
// if (csrfToken) {
//     axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
// }

export default axios;