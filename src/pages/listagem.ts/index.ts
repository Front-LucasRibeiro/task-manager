import { ITask } from "../../interfaces";
import { Counter } from "./counter";

export default class ListPage {
  public counters: Map<string, Counter> = new Map();

  constructor(route: string) {
    window.history.pushState(null, '', route);

    this.render();
    this.getTasks();
  } 
    
  changeStatus() {
    const tableListTasks = document.querySelector('#tableListTasks');
    tableListTasks?.addEventListener('change', (event: Event) => {
      const target = event.target as HTMLSelectElement;
      if (target.classList.contains('select-status')) {
        const taskId = target.id;
        let parcialTime = document.querySelector(`[data-id="task-time-${taskId}"]`) as HTMLElement;
        let totalTime = document.querySelector(`[data-id="task-time-total-${taskId}"]`) as HTMLElement;
        
        let counter = this.counters.get(taskId);
        // Se não existir, crie um novo contador e associe-o ao elemento
        if (!counter) {
          counter = new Counter();
          this.counters.set(taskId, counter);
        }

        let totalSum = counter.sumTimes(totalTime.innerHTML, parcialTime.innerHTML)

        if (target.value === 'Iniciar') {
          counter.stopTimer();
          counter.startTimer(parcialTime);

          target.classList.remove('bg-gray-100');
          target.classList.add('bg-blue-500');
          target.classList.add('text-white');
        } else {
          totalTime.innerHTML = totalSum;
          parcialTime.innerHTML = '00:00:00';
        }
        
        
        if (target.value === 'Pausar') {
          target.classList.remove('bg-blue-500');
          target.classList.add('bg-orange-400');
          counter.pauseTimer();

          // salvar totalSum no banco de dados: 

        } else if (target.value === 'Finalizar') {
          target.classList.remove('bg-blue-500');
          target.classList.remove('bg-orange-400');
          target.classList.add('bg-green-600');
          counter.stopTimer();
        }
      }
    });
  }


  getTasks() {
    fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then(data => {
        const tbody = document.querySelector('#tableListTasks tbody');
        let html = '';

        data.forEach((task: ITask) => {
          html += `
            <tr data-id="task-${task.id}">
              <td class="py-2 px-4 border">${task.title}</td>
              <td class="py-2 px-4 border">${task.description}</td>
              <td class="py-2 px-4 border">${task.responsible}</td>
              <td class="border cursor-pointer status">
                <select class="select-status w-full bg-gray-100" id="${task.id}">
                  <option value="" disabled selected>Fila</option>
                  <option value="Iniciar">Em andamento</option>
                  <option value="Pausar">Pausado</option>
                  <option value="Finalizar">Finalizado</option>
                </select>
              </td>
              <td class="py-2 px-4 border"><span data-id="task-time-${task.id}">${task.time}</span></td>
              <td class="py-2 px-4 border"><span  data-id="task-time-total-${task.id}">${task.time}</span></td>
            </tr>
          `;
        })

        tbody!.innerHTML = html;

        this.changeStatus();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    const mainElement = document.getElementById('main');

    mainElement!.innerHTML = `
      <section class="max-w-3xl mx-auto form-task my-12">
        <h2 class="text-2xl mb-5 text-center">Listagem de Tarefas</h2>
        
        <div class="wrap-table">
          <table id="tableListTasks" class="border w-full text-center table-list-tasks">
            <thead>
              <tr>
                <th class="py-2 px-2 border bg-sky-700 text-gray-100 font-medium ">Título</th>
                <th class="py-2 px-2 border bg-sky-700 text-gray-100 font-medium ">Descrição</th>
                <th class="py-2 px-2 border bg-sky-700 text-gray-100 font-medium ">Responsável</th>
                <th class="py-2 px-2 border bg-sky-700 text-gray-100 font-medium">Status</th>
                <th class="py-2 px-2 border bg-sky-700 text-gray-100 font-medium ">Tempo</th>
                <th class="py-2 px-2 border bg-sky-700 text-gray-100 font-medium ">Tempo Total</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </section>
    `;
  }
}