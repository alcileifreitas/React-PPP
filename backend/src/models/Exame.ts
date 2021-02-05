import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('exames')
class Exame {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column() // define que é uma coluna normal que por padrão se não especificar o tipo, ele irá usar varchar(string).
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn() 
    updated_at: Date;
}


export default Exame;