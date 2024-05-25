export interface ITask {
  id: number;
  title: string;
  description?: string;
  responsible: string;
  status: string;
  time: string;
  attachments: Uint8Array; // dados binarios
}