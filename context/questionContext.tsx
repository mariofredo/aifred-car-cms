'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

import Cookies from 'js-cookie';
import {QuestionInput, SelectedSpec, Tag} from '@/types';
import {API_ROUTES} from '@/consts';
interface ContextProps {
  getListQuestion: () => Promise<{
    [key: string]: any;
    data: [];
  }>;
  createQuestion: (
    question: QuestionInput[],
    payload: any
  ) => Promise<{[key: string]: any}>;
  updateQuestion: (
    question: QuestionInput[],
    payload: any
  ) => Promise<{[key: string]: any}>;
  getDetailQuestion: (id: string) => Promise<{[key: string]: any}>;
  deleteQuestion: (object_id: string) => Promise<{[key: string]: any}>;
}

const defaultValue: ContextProps = {
  getListQuestion: async () => ({data: []}),
  createQuestion: async (question, payload) => ({}),
  updateQuestion: async (question, payload) => ({}),
  getDetailQuestion: async (id) => ({}),
  deleteQuestion: async (object_id) => ({}),
};

const QuestionContext = createContext<ContextProps>(defaultValue);

export function QuestionContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = Cookies.get('token_aifred_neo_cms');

  const getListQuestion = async () => {
    try {
      const response = await fetch(API_ROUTES.question_list, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error');
      }
      const data = await response.json();
      return data;
    } catch (error) {}
  };
  const createQuestion = async (question: QuestionInput[], payload: any) => {
    try {
      const structuredQuestion = question.map((item, i) => ({
        type: item.question.type,
        question_item_content: item.question.value,
        ordinal: i + 1,
        question_choose_content: item.answer.map((ans) => ans.value),
        tag_id: item.tag.map((tag) => tag.value),
      }));
      const response = await fetch(API_ROUTES.question_create, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...payload,
          questions: structuredQuestion,
        }),
      });
      if (!response.ok) {
        throw new Error('Error');
      }
      const data = await response.json();
      return data;
    } catch (error) {}
  };
  const updateQuestion = async (question: QuestionInput[], payload: any) => {
    try {
      const structuredQuestion = question.map((item, i) => ({
        type: item.question.type,
        question_item_content: item.question.value,
        ordinal: i + 1,
        question_item_unique_id: item.question.unique_id,
        question_choice_content: item.answer.map((ans) => ans.value),
        tag_id: item.tag.map((tag) => tag.value),
        question_item_choice_unique_id: item.answer.map((ans) =>
          ans.unique_id.toString()
        ),
      }));
      const response = await fetch(API_ROUTES.question_update, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...payload,
          questions: structuredQuestion,
        }),
      });
      if (!response.ok) {
        throw new Error('Error');
      }
      const data = await response.json();
      return data;
    } catch (error) {}
  };
  const getDetailQuestion = async (id: string) => {
    try {
      const response = await fetch(API_ROUTES.question_detail(id), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Error');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const deleteQuestion = async (object_id: string) => {
    try {
      const response = await fetch(API_ROUTES.variant_delete('1'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id: object_id,
        }),
      });
      if (!response.ok) {
        throw new Error('Error');
      }
      const data = await response.json();
      return data;
    } catch (error) {}
  };
  const ctx = {
    getListQuestion,
    createQuestion,
    getDetailQuestion,
    updateQuestion,
    deleteQuestion,
  };
  return (
    <QuestionContext.Provider value={ctx}>{children}</QuestionContext.Provider>
  );
}

export const useQuestion = () => useContext(QuestionContext);
