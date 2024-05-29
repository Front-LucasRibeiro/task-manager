import { ITask, IUploadResponse } from "../interfaces";

class ServiceTask {
  private API = import.meta.env.VITE_API_URL;

  constructor() { }

  async list(): Promise<ITask[]> {
    try {
      const response = await fetch(`${this.API}/tasks`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: ITask[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }

  async create(postData: ITask): Promise<ITask | null> {
    try {
      const response = await fetch(`${this.API}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data: ITask = await response.json();
      return data;
    } catch (error) {
      console.error('Erro:', error);
      return null;
    }
  }

  
  async upload(files: FileList): Promise<IUploadResponse> {
    const formData = new FormData();
    
    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      formData.append('files', file);
    }

    try {
      const response = await fetch(`${this.API}/upload`, {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        const responseBody: IUploadResponse = await response.json();
        return responseBody;
      } else {
        console.error('There was an error with the request');
        return { response: ["error"] };
      }

    } catch (error) {
      console.error('Error:', error);
      return { response: ["error"] };
    }
  }
}

export default ServiceTask;
