import './style.css';
import Task from './task.js';

window.addEventListener('load', () => {
  const items = new Task();
  items.displayTask();
});
