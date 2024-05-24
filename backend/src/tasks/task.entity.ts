import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'bytea', nullable: true })
  attachments: Uint8Array;

  @Column({ nullable: true })
  responsible: string;

  @Column()
  status: string;
}
