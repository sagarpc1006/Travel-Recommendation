// Canonical API Client re-export
// Ensures all frontend services utilize the singular apiClient instance defined in src/api/client.js
// avoiding duplicate interceptors, divergent base URLs, and duplicate Firebase auth token requests.

import apiClient from '../api/client.js';

export default apiClient;
