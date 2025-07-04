// screens/DeckQuizScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

export default function DeckQuizScreen() {
  const route = useRoute();
  const { cards } = route.params as {
    cards: { question: string; answer: string }[];
  };

  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (cards.length === 0) {
    return (
      <View style={styles.container}>
        <Text>No cards in this deck yet.</Text>
      </View>
    );
  }

  const current = cards[index];

  return (
    <View style={styles.container}>
      <Text variant="titleMedium">Card {index + 1} of {cards.length}</Text>
      <Card style={styles.card}>
        <Card.Title title={showAnswer ? current.answer : current.question} />
      </Card>
      <Button onPress={() => setShowAnswer(!showAnswer)} style={styles.button}>
        {showAnswer ? 'Hide Answer' : 'Show Answer'}
      </Button>
      {index < cards.length - 1 && (
        <Button onPress={() => {
          setIndex(index + 1);
          setShowAnswer(false);
        }} mode="contained" style={styles.button}>
          Next
        </Button>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { marginVertical: 16 },
  button: { marginTop: 8 },
});
