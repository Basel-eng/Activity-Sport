import { Exclude } from 'class-transformer';
import { Sport } from 'src/sport/entities/sport.entity';
import { CURRENT_TIMESTAMP } from 'src/utils/constans';
import { UserType } from 'src/utils/enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', nullable: true, length: '150' })
  username: string;
  @Column({ type: 'varchar', length: '250', unique: true })
  email: string;
  @Column()
  @Exclude()
  password: string;
  @Column({ default: false })
  isAccountVerified: boolean;
  @Column({ nullable: true })
  verificationToken: string;
  @Column({ nullable: true })
  resetPasswordToken: string;
  @Column({ type: 'enum', enum: UserType, default: UserType.NORMAL_USER })
  userType: UserType;
  @CreateDateColumn({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
  createAt: Date;
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => CURRENT_TIMESTAMP,
    onUpdate: CURRENT_TIMESTAMP,
  })
  updateAt: Date;

  @OneToMany(() => Sport, (sport) => sport.user)
  sports: Sport[];
}
