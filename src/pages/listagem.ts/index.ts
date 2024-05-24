import { ITask } from "../../interfaces";


export default class ListPage {
  constructor(route: string) {
    window.history.pushState(null, '', route);

    this.render();
    this.getTasks();
  }

  getTasks() {
    fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then(data => {
        const tbody = document.querySelector('#tableListTasks tbody');
        let html = '';

        data.forEach((task: ITask) => {
          html += `
            <tr>
              <td class="py-2 px-4 border">${task.title}</td>
              <td class="py-2 px-4 border">${task.description}</td>
              <td class="py-2 px-4 border">${task.responsible}</td>
              <td class="py-2 px-4 border cursor-pointer">${task.status}</td>
              <td class="py-2 px-4 border"><input type="time"></td>
            </tr>
          `;
        })

        tbody!.innerHTML = html;

      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    const mainElement = document.getElementById('main');

    mainElement!.innerHTML = `
      <section class="max-w-2xl mx-auto form-task mt-12">
        <h2 class="text-2xl mb-5 text-center">Listagem de Tarefas</h2>
        
        <div class="wrap-table">
          <table id="tableListTasks" class="border w-full text-center table-list-tasks">
            <thead>
              <tr>
                <th class="py-2 px-4 border bg-sky-700 text-gray-100 font-medium ">Título</th>
                <th class="py-2 px-4 border bg-sky-700 text-gray-100 font-medium ">Descrição</th>
                <th class="py-2 px-4 border bg-sky-700 text-gray-100 font-medium ">Responsável</th>
                <th class="py-2 px-4 border bg-sky-700 text-gray-100 font-medium ">status</th>
                <th class="py-2 px-4 border bg-sky-700 text-gray-100 font-medium ">Tempo</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </section>
    `;
  }
}