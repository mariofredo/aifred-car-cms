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

export interface Question {
  company_brand_name: string;
  batch: number;
}

export interface ListQuestionItem {
  question_id: number;
  question: string;
  answer: {
    answer_tag_id: number;
    next_question_id: number;
  }[];
}

export interface QuestionInput {
  question: {
    name: string;
    value: string;
  };
  answer: {
    name: string;
    value: string;
  }[];
  flow: {name: string; value: string}[];
}
