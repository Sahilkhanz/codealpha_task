import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface Props {
  flashcard: { question: string; answer: string };
  onEdit: () => void;
  onDelete: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function Flashcard({ flashcard, onEdit, onDelete, onNext, onPrevious }: Props) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <View style={styles.card}>
      <Text style={styles.text}>
        {showAnswer ? flashcard.answer : flashcard.question}
      </Text>
      <Button
        title={showAnswer ? 'Hide Answer' : 'Show Answer'}
        onPress={() => setShowAnswer(!showAnswer)}
      />
      <View style={styles.row}>
        <Button title="Previous" onPress={onPrevious} />
        <Button title="Next" onPress={onNext} />
      </View>
      <View style={styles.row}>
        <Button title="Edit" onPress={onEdit} />
        <Button title="Delete" onPress={onDelete} color="red" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
    elevation: 2,
  },
  text: { fontSize: 18, marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
});
