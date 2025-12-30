
// @file constants.ts
// Contains static data and configuration for the quiz

import { Question, QuestionType } from './types';

/**
 * Sample quiz data for IOE Grade 6 (Vietnamese English Competition)
 */
export const QUIZ_DATA: Question[] = [
  {
    id: 1,
    type: QuestionType.MULTIPLE_CHOICE,
    questionText: "Choose the word that has the underlined part pronounced differently.",
    options: ["School", "Cheap", "Chair", "Check"],
    correctAnswer: "School",
    explanation: "In 'School', 'ch' is pronounced as /k/, while in 'Cheap', 'Chair', and 'Check', it is pronounced as /tʃ/.",
  },
  {
    id: 2,
    type: QuestionType.FILL_IN_BLANK,
    questionText: "My sister usually ______ her teeth after meals.",
    correctAnswer: "brushes",
    explanation: "For the third person singular subject 'My sister' in the simple present tense, we add 'es' to the verb 'brush'.",
  },
  {
    id: 3,
    type: QuestionType.REARRANGE,
    questionText: "Rearrange the words to form a correct sentence.",
    rearrangeParts: ["is", "He", "playing", "soccer", "now"],
    correctAnswer: "He is playing soccer now",
    explanation: "The correct structure is Subject (He) + Verb (is playing) + Object (soccer) + Time (now).",
  },
  {
    id: 4,
    type: QuestionType.MULTIPLE_CHOICE,
    questionText: "Where ______ your parents live?",
    options: ["do", "does", "are", "is"],
    correctAnswer: "do",
    explanation: "We use 'do' as an auxiliary verb for plural subjects like 'your parents' in questions.",
  },
  {
    id: 5,
    type: QuestionType.FILL_IN_BLANK,
    questionText: "Don't ______ too much television. It's bad for your eyes.",
    correctAnswer: "watch",
    explanation: "After 'Don't' in a negative imperative sentence, we use the base form of the verb.",
  },
  {
    id: 6,
    type: QuestionType.REARRANGE,
    questionText: "Unscramble the question.",
    rearrangeParts: ["old", "How", "are", "you", "?"],
    correctAnswer: "How old are you ?",
    explanation: "The standard structure for asking age is 'How old' followed by the verb 'are' and the subject 'you'.",
  }
];
