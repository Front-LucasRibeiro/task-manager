export default class CreateTaskPage {
  constructor(route: string) {
    window.history.pushState(null, '', route);

    this.render();
    this.create();
  }

  create() {
    document.getElementById('btnCreateTask')?.addEventListener('click', function (e) {
      e.preventDefault();

      const form = document.getElementById('formCreateTask') as HTMLFormElement;
      const formData = new FormData(form);

      const postData = {
        title: formData.get('title'),
        description: formData.get('description'),
        responsible: formData.get('responsible'),
        status: 'Iniciar',
        attachments: formData.get('attachments')
      };  
  
      fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData) 
      })
        .then(res => res.json())
        .then(() => {

          ['responsible', 'title', 'description', 'attachments'].forEach(field => {
            let elem = document.getElementById(field) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
            elem.value = '';
          });
        
          alert('Cadastro realizado com sucesso');
        })
        .catch(error => {
          console.error('Erro:', error);
        });
    })
  }

  render() {
    const mainElement = document.getElementById('main');

    mainElement!.innerHTML = `
      <section class="max-w-2xl mx-auto form-task my-12">
        <h2 class="text-2xl mb-5 text-center">Criar tarefa</h2>

        <form id="formCreateTask">
          <div class="field flex flex-col mb-5">
            <label for="responsible" class="font-medium mb-2">Selecione o responsável:</label>
            <select name="responsible" id="responsible" class="border rounded px-3 py-2 ">
              <option value="">Selecione...</option>
              <option value="Lucas">Lucas</option>
              <option value="João">João</option>
            </select>
          </div>

          <div class="field flex flex-col mb-5">
            <label for="title" class="font-medium">Título:</label>
            <input type="text" id="title" name="title" class="border pd-8 rounded h-9 px-3 py-2 text-gray-700" />
          </div>

          <div class="field mb-5 flex flex-col">
            <label for="description" class="font-medium">Descrição:</label>
            <textarea type="text" id="description" name="description" class="border pd-8 min-h-200 rounded h-48 px-3 py-2 text-gray-700"></textarea>
          </div>

          <div class="field mb-5">
            <label for="attachments" class="font-medium">Anexos</label>
            <input type="file" id="attachments" multiple name="attachments" class="border-gray-300 border-solid border pr-3 rounded w-full">
          </div>

          <button id="btnCreateTask" class="bg-sky-700 text-white h-9 px-5 rounded hover:bg-sky-900 w-full">Criar</button>
        </form>
      </section>
    `;
  }
}
