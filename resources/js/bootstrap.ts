/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
import Pusher from 'pusher-js';

axios.defaults.withCredentials = true;

if (typeof window !== 'undefined') {
  window.axios = axios;
  window.Pusher = Pusher;
  window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
}
