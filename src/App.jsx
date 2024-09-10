import * as React from 'react';
import { createRoot } from 'react-dom/client';

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Home from './Home.jsx'

const root = createRoot(document.body);
root.render(<Home/>);