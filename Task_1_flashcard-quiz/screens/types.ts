export type RootStackParamList = {
  Tabs: undefined;
  DeckDetail: {
    name: string;
    cards: { question: string; answer: string }[];
  };
  AddFlashcard: {
    deckName: string;
  };
  DeckQuiz: {
    cards: { question: string; answer: string }[];
  };
};
