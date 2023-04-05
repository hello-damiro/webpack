if (module.hot) module.hot.accept(); // include this

import { tripler } from './module';
import './styles/style.css';

console.log('Hello damiro ' + tripler(8));
