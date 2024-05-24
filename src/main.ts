import './styles.scss';
import CreateTaskPage from './pages/tarefa';
import ListPage from './pages/listagem.ts';

// Routes 
switch (window.location.pathname) {
  case '/':
    new ListPage('/');
    break;
  case '/tarefa':
    new CreateTaskPage('/tarefa');
    break;
}


// Menu 
let menuList = document.querySelectorAll('.nav li')
menuList.forEach(elem => {
  elem.addEventListener('click', function(e: Event) {
    e.preventDefault();

    const target = e.target as HTMLElement;
    const datasetValue = target.dataset.id;

    switch (datasetValue) {
      case 'showTask':
        new ListPage('/');
        break;
      case 'createTask':
        new CreateTaskPage('/tarefa');
        break;
    }
  })
})





