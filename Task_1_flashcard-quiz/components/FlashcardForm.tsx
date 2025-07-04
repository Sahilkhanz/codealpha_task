import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface Props {
  onSubmit: (card: { question: string; answer: string }) => void;
  cardToEdit: { question: string; answer: string } | null;
}

export default function FlashcardForm({ onSubmit, cardToEdit }: Props) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    if (cardToEdit) {
      setQuestion(cardToEdit.question);
      setAnswer(cardToEdit.answer);
    }
  }, [cardToEdit]);

  const handleSave = () => {
    if (question.trim() && answer.trim()) {
      onSubmit({ question, answer });
      setQuestion('');
      setAnswer('');
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Question"
        value={question}
        onChangeText={setQuestion}
        style={styles.input}
      />
      <TextInput
        placeholder="Answer"
        value={answer}
        onChangeText={setAnswer}
        style={styles.input}
      />
      <Button title={cardToEdit ? 'Update Flashcard' : 'Add Flashcard'} onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
});
