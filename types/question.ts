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
  brand_name: string;
  created_at: string;
  is_active: number;
  question_set_title: string;
  total_question: number;
  unique_id: string;
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
    type: string;
    unique_id: string;
  };
  answer: {
    name: string;
    value: string;
    unique_id: string;
  }[];
  tag: {name: string; value: string}[];
}
