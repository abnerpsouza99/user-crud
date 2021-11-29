import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class User {

  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ name: 'username', nullable: false})
  username: string;

  @Column({ name: 'age', type: 'int', nullable: false})
  age: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: 'now()',
  })
  createdAt: Date;
    
  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
    default: 'now()',
  })
  updatedAt: Date;



}