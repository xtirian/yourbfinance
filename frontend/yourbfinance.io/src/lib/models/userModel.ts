export type UserModel = Partial<{
  id: string;
  createdAt: Date;
  updatedAt: Date;

  email: string;
  name: string;
  last_name: string | null;
  password: string;
  avatar: string | null;

  /*Goals?: GoalModel[];
  Transactions?: TransactionModel[];
  Categories?: CategoryModel[];*/
}>;
