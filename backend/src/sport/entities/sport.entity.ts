import { User } from 'src/users/entities/user.entity';
import { CURRENT_TIMESTAMP } from 'src/utils/constans';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'sports' })
export class Sport {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  typeActivity: string;
  @Column()
  username: string;
  @Column({ type: 'int', nullable: true })
  usernumber: number;
  @Column({ type: 'varchar', length: '250', nullable: true })
  email: string;
  @Column({ type: 'timestamp' })
  history: Date;
  @Column({ type: 'varchar' })
  time: string;
  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  createdAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updatedAt: Date;
  @ManyToOne(() => User, (user) => user.sports, { eager: true })
  user: User;
}
