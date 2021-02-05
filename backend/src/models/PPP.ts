import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('ppp')
class PPP {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column() 
    func_name: string;

    @Column() 
    exam_name: string;

    @Column() 
    agent_name: string;

    @Column() 
    medic_name: string;

    @Column() 
    description: string;

    @Column() 
    image: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn() 
    updated_at: Date;
}


export default PPP;