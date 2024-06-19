export interface Choice {
  content: string;
  id: number;
}
export interface Question {
  content: string;
  id: number;
  type: string;
}

export interface Answer {
  question: Question;
  choice: any;
  listChoice: Choice[];
}

export interface PayloadSideBar {
  started_answer_at: string;
  answer: any;
  is_finish: boolean;
  is_change: string;
  is_back: boolean;
  u_id: string;
  view: string;
}
