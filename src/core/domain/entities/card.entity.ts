import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Card {
  constructor(partial: Partial<Card>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  list: string;
}
