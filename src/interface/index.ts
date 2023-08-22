export interface QuestionInter {
  id: number;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createdAt: string;
  isDeleted: boolean;
}

export type QuestionType = Omit<QuestionInter, 'isDeleted'>;

export interface RegisterInter {
  username: string;
  password: string;
  confirm: string;
  nickName: string;
}

export interface ListInter<T> {
  list: T[];
  total: number;
}

export interface FilterInter {
  keyword: string;
  isDeleted: boolean;
  isStar: boolean;
  page: number;
  pageSize: number;
}

export interface UserInfoInter {
  username: string;
  password: string;
  nickname?: string;
}
