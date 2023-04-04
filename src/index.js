import { tripler } from './module';

if (module.hot) module.hot.accept();

console.log('Hello damiro!' + tripler(50));
