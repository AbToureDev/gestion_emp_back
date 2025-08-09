import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Employer {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    firstName:string;

    @Column()
    lastName:string;

    @Column({ unique: true, nullable: true })
    email: string;

    @Column()
    poste:string;

    @Column()
    Employed_date:string;

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
}
