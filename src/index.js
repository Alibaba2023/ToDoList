import './style.css';

const allTask = [
  { index: 0, description: 'Sport', completed: false },
  { index: 1, description: 'Breakfast', completed: false },
  { index: 2, description: 'University', completed: true },
  { index: 3, description: 'Dinner', completed: false },
];

const taskList = document.querySelector('.to-do-list');
function iterate() {
  taskList.innerHTML = '';
  allTask.forEach((element) => {
    // creat an item for the list
    const item = document.createElement('li');

    const taskCompelet = document.createElement('input');
    taskCompelet.type = 'checkbox';
    taskCompelet.checked = element.completed;

    const taskText = document.createElement('p');
    taskText.textContent = element.description;

    const editIcon = document.createElement('ion-icon');
    editIcon.name = 'construct-outline';
    editIcon.className = 'icon-item';

    const deleteIcon = document.createElement('ion-icon');
    deleteIcon.name = 'trash-outline';
    deleteIcon.className = 'icon-item';

    item.appendChild(taskCompelet);
    item.appendChild(taskText);
    item.appendChild(editIcon);
    item.appendChild(deleteIcon);

    taskList.appendChild(item);
  });
}
iterate();