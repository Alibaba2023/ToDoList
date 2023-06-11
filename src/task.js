class Task {
  // initializing the localstorage and add eventlistener to addBtn
  constructor() {
    this.allTask = JSON.parse(localStorage.getItem('data')) || [];
    this.addBtn = document.querySelector('.add-btn');
    this.addBtn.addEventListener('click', this.addTask.bind(this));
  }

  // function for saving the data to localStorage
  saveData() {
    localStorage.setItem('data', JSON.stringify(this.allTask));
  }

  // function for reindexing the Tasks
  reindex() {
    this.allTask.forEach((element, index = 1) => {
      element.index = index;
    });
  }

  // function for deleting the Tasks
  removeTask(index) {
    this.allTask.splice(index, 1);
    this.saveData();
    this.displayTask();
    this.reindex();
  }

  // function for adding Tasks to "allTask" array of object
  addTask() {
    const inputAdd = document.querySelector('.input-add');
    if (inputAdd.value) {
      const newTask = {
        description: inputAdd.value,
        completed: false,
        index: this.allTask.length,
      };
      this.allTask.push(newTask);
      inputAdd.value = '';
      this.saveData();
      this.displayTask();
    }
  }

  // function for both displaying and editing
  displayTask() {
    const taskList = document.querySelector('.to-do-list');
    taskList.innerHTML = '';
    // displaying Tasks
    this.allTask.forEach((element, addindex) => {
      const item = document.createElement('li');
      item.className = 'item-element';

      const taskComplete = document.createElement('input');
      taskComplete.type = 'checkbox';
      taskComplete.className = 'is-completed';
      taskComplete.checked = element.completed;

      taskComplete.addEventListener('change', () => {
        element.completed = taskComplete.checked;
        this.saveData();
        this.displayTask();
      });

      const taskText = document.createElement('p');
      taskText.textContent = element.description;

      const editIcon = document.createElement('ion-icon');
      editIcon.name = 'construct-outline';
      editIcon.classList.add('editIcon');

      const deleteIcon = document.createElement('ion-icon');
      deleteIcon.name = 'trash-outline';
      deleteIcon.classList.add('removeIcon');

      item.appendChild(taskComplete);
      item.appendChild(taskText);
      item.appendChild(editIcon);
      item.appendChild(deleteIcon);

      taskList.appendChild(item);

      deleteIcon.addEventListener('click', () => {
        this.removeTask(addindex);
        this.saveData();
        this.reindex();
      });
      // adding edit popup
      const editItem = document.createElement('li');
      editItem.className = 'edit-div';
      editItem.classList.add('display-none');
      const editForm = document.createElement('form');
      const editDescription = document.createElement('input');
      editDescription.type = 'text';
      editDescription.className = 'edit-input';
      editDescription.required = true;
      editDescription.value = `${element.description}`;
      editDescription.placeholder = `Edit "${element.description}"`;

      const saveEdit = document.createElement('button');
      saveEdit.type = 'submit';
      saveEdit.textContent = 'Save';
      saveEdit.className = 'save-edit-btn';

      const cancelEdit = document.createElement('button');
      cancelEdit.type = 'text';
      cancelEdit.textContent = 'Cancel';
      cancelEdit.className = 'cancel-edit-btn';

      editForm.appendChild(editDescription);
      editForm.appendChild(cancelEdit);
      editForm.appendChild(saveEdit);
      editItem.appendChild(editForm);
      taskList.appendChild(editItem);

      editIcon.addEventListener('click', () => {
        editItem.classList.remove('display-none');
        editDescription.focus();
        this.saveData();
      });

      cancelEdit.addEventListener('click', () => {
        editItem.classList.add('display-none');
        this.displayTask();
      });
      saveEdit.addEventListener('click', (event) => {
        event.preventDefault();
        if (editDescription.value !== '') {
          element.description = editDescription.value;
          this.addTask();
          this.saveData();
          this.displayTask();
          editItem.classList.add('display-none');
        } else {
          editDescription.reportValidity();
        }
      });
      // function for clearing all completed task
      const allCompletedBtn = document.querySelector('.all-completed');
      allCompletedBtn.addEventListener('click', () => {
        this.allTask = this.allTask.filter((el) => !el.completed);
        this.reindex();
        this.saveData();
        this.displayTask();
      });
    });
  }
}
export default Task;
