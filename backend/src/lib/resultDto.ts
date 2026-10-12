interface AnswerRow {
  questionId: string;
  optionId: string;
  isCorrect: boolean;
  question: { options: { id: string; isCorrect: boolean }[] };
}

export const answersDto = (answers: AnswerRow[]) =>
  answers.map((a) => ({
    questionId: a.questionId,
    optionId: a.optionId,
    isCorrect: a.isCorrect,
    correctOptionId: a.question.options.find((o) => o.isCorrect)?.id ?? null,
  }));
