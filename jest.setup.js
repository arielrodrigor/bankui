import '@testing-library/jest-dom/extend-expect';
require('dotenv').config({ path: '.env.local' });
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost';
