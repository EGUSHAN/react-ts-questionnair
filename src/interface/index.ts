export interface QuestionInter {
  id: number;
  title: string;
  isPublished: boolean;
  isStar: boolean;
  answerCount: number;
  createAt: string;
}

export interface RegisterInter {
  username: string;
  password: string;
  confirm: string;
  nickName: string;
}
