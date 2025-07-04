// screens/QuizScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Flashcard {
  question: string;
  answer: string;
}

export default function QuizScreen() {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('flashcards');
      if (saved) setFlashcards(JSON.parse(saved));
    })();
  }, []);

  const handleAnswer = (correct: boolean) => {
    if (correct) setScore(score + 1);
    if (currentIndex + 1 < flashcards.length) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    } else {
      setFinished(true);
    }
  };

  if (flashcards.length === 0) return <Text style={styles.info}>No flashcards available.</Text>;

  if (finished) {
    return (
      <View style={styles.container}>
        <Text variant="headlineMedium">✅ Quiz Finished!</Text>
        <Text style={styles.score}>Score: {score}/{flashcards.length}</Text>
        <Button mode="contained" onPress={() => {
          setCurrentIndex(0);
          setScore(0);
          setFinished(false);
        }}>Restart</Button>
      </View>
    );
  }

  const card = flashcards[currentIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.progress}>Card {currentIndex + 1} of {flashcards.length}</Text>
      <Card style={styles.card}>
        <Card.Title title={showAnswer ? card.answer : card.question} />
      </Card>
      <Button mode="text" onPress={() => setShowAnswer(!showAnswer)}>
        {showAnswer ? 'Hide Answer' : 'Show Answer'}
      </Button>
      <View style={styles.row}>
        <Button mode="contained" onPress={() => handleAnswer(true)} style={styles.button}>
          ✅ Correct
        </Button>
        <Button mode="contained" onPress={() => handleAnswer(false)} style={styles.button}>
          ❌ Wrong
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  card: { marginVertical: 20 },
  row: { flexDirection: 'row', justifyContent: 'space-around' },
  button: { marginTop: 10 },
  progress: { textAlign: 'center', marginBottom: 10 },
  score: { marginVertical: 20, textAlign: 'center', fontSize: 20 },
  info: { padding: 20, textAlign: 'center' }
});
