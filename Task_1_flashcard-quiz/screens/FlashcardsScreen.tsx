// screens/FlashcardsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Card, IconButton, Dialog, Portal, Paragraph } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Flashcard {
  question: string;
  answer: string;
}

export default function FlashcardsScreen() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('flashcards');
      if (saved) setFlashcards(JSON.parse(saved));
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

  const handleAdd = () => {
    if (question && answer) {
      setFlashcards([...flashcards, { question, answer }]);
      setQuestion('');
      setAnswer('');
    }
  };

  const handleDelete = () => {
    if (deleteIndex !== null) {
      const updated = [...flashcards];
      updated.splice(deleteIndex, 1);
      setFlashcards(updated);
      setDeleteIndex(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">📝 Add Flashcards</Text>

      <TextInput
        label="Question"
        value={question}
        onChangeText={setQuestion}
        style={styles.input}
      />
      <TextInput
        label="Answer"
        value={answer}
        onChangeText={setAnswer}
        style={styles.input}
      />
      <Button mode="contained" onPress={handleAdd} style={styles.button}>Add Flashcard</Button>

      {flashcards.map((card, index) => (
        <Card key={index} style={styles.card}>
          <Card.Title
            title={card.question}
            subtitle={visibleIndex === index ? card.answer : 'Tap to reveal answer'}
            right={() => (
              <View style={{ flexDirection: 'row' }}>
                <IconButton
                  icon={visibleIndex === index ? 'eye-off' : 'eye'}
                  onPress={() => setVisibleIndex(visibleIndex === index ? null : index)}
                />
                <IconButton
                  icon="delete"
                  onPress={() => setDeleteIndex(index)}
                />
              </View>
            )}
          />
        </Card>
      ))}

      <Portal>
        <Dialog visible={deleteIndex !== null} onDismiss={() => setDeleteIndex(null)}>
          <Dialog.Title>Delete Flashcard?</Dialog.Title>
          <Dialog.Content>
            <Paragraph>This action cannot be undone.</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDeleteIndex(null)}>Cancel</Button>
            <Button onPress={handleDelete}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { marginTop: 12, marginBottom: 8, backgroundColor: '#f1eaff' },
  button: { marginBottom: 16, borderRadius: 25 },
  card: {
    backgroundColor: '#f6f1ff',
    marginBottom: 12,
    borderRadius: 12,
    elevation: 2,
  },
});
