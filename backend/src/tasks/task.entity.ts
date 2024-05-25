import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'bytea', nullable: true })
  attachments: Uint8Array;

  @Column({ nullable: true, length: 40 })
  responsible: string;

  @Column({ length: 15 })
  status: string;

  @Column({ length: 15 })
  time: string;
}
