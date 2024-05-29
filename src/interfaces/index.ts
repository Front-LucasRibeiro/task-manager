export interface ITask {
  id?: number;
  title: string;
  description: string;
  responsible: string;
  status: string;
  time: string;
}

export interface IUploadResponse {
  response: string[];
}
