import React, { useEffect, useState } from 'react';
import { View, Text, Button, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashcardForm from '../components/FlashcardForm';
import Flashcard from '../components/Flashcard';

interface FlashcardType {
  question: string;
  answer: string;
}

export default function FlashcardsScreen() {
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    loadFlashcards();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('flashcards', JSON.stringify(flashcards));
  }, [flashcards]);

  const loadFlashcards = async () => {
    const saved = await AsyncStorage.getItem('flashcards');
    if (saved) setFlashcards(JSON.parse(saved));
  };

  const handleSave = (card: FlashcardType) => {
    if (editingIndex !== null) {
      const updated = [...flashcards];
      updated[editingIndex] = card;
      setFlashcards(updated);
      setEditingIndex(null);
    } else {
      setFlashcards([...flashcards, card]);
    }
  };

  const handleDelete = () => {
    const updated = flashcards.filter((_, i) => i !== currentIndex);
    setFlashcards(updated);
    setCurrentIndex(0);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>📚 Flashcard Quiz</Text>
      <FlashcardForm
        onSubmit={handleSave}
        cardToEdit={editingIndex !== null ? flashcards[editingIndex] : null}
      />
      {flashcards.length > 0 && (
        <Flashcard
          flashcard={flashcards[currentIndex]}
          onDelete={handleDelete}
          onEdit={() => setEditingIndex(currentIndex)}
          onNext={() => setCurrentIndex((prev) => (prev + 1) % flashcards.length)}
          onPrevious={() => setCurrentIndex((prev) => (prev === 0 ? flashcards.length - 1 : prev - 1))}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
});
