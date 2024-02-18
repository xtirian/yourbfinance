import { type CategoryModel } from './category.model';
import { type GoalModel } from './goal.model';
import { type TransactionModel } from './transaction.model';

export interface UserModel {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  email: string;
  name: string;
  last_name: string | null;
  password: string;
  avatar: string | null;

  Goals?: GoalModel[];
  Transactions?: TransactionModel[];
  Categories?: CategoryModel[];
}
