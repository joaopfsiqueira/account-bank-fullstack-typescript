import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Accounts } from './Accounts';
import { ColumnNumericTransformer } from '../common/transformersNumerics';

@Entity()
export class Transactions {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  value: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Accounts)
  @JoinColumn()
  debitedAccount: Accounts;

  @ManyToOne(() => Accounts)
  @JoinColumn()
  creditedAccount: Accounts;
}
