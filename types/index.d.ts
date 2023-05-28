export interface IUser {
  email: string;
  name: string;
  password: string;
}

export interface IColor {
  name: string;
  id: string;
  code: string;
}

export interface IIcon {
  name: string;
  id: string;
  symbol: string;
}

export interface ICategory {
  _id: string;
  name: string;
  user: IUser | string;
  isEditable: boolean;
  color: IColor;
  icon: IIcon;
}

export interface ITask {
  _id: string;
  name: string;
  categoryId: string;
  user: string;
  isCompleted: boolean;
  isEditable: boolean;
  date: string;
  createAt: string;
  updateAt: string;
}
