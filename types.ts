
// @file types.ts
// Defining common types and enums for the IOE Quiz application

/**
 * Supported question types for the quiz
 */
export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  FILL_IN_BLANK = 'FILL_IN_BLANK',
  REARRANGE = 'REARRANGE'
}

/**
 * Represents a single quiz question
 */
export interface Question {
  id: number;
  type: QuestionType;
  questionText: string;
  correctAnswer: string;
  explanation: string;
  options?: string[];
  rearrangeParts?: string[];
  audioUrl?: string;
}

/**
 * Represents a user's answer to a specific question
 */
export interface UserAnswer {
  questionId: number;
  userResponse: string;
  isCorrect: boolean;
}
