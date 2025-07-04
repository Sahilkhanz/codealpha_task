// screens/AddFlashcardScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddFlashcardScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { deckName } = route.params as { deckName: string };

  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const addCard = async () => {
    const stored = await AsyncStorage.getItem('decks');
    const decks = stored ? JSON.parse(stored) : [];

    const updatedDecks = decks.map((deck: any) =>
      deck.name === deckName
        ? { ...deck, cards: [...deck.cards, { question, answer }] }
        : deck
    );

    await AsyncStorage.setItem('decks', JSON.stringify(updatedDecks));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Add Flashcard to {deckName}</Text>
      <TextInput label="Question" value={question} onChangeText={setQuestion} style={styles.input} />
      <TextInput label="Answer" value={answer} onChangeText={setAnswer} style={styles.input} />
      <Button mode="contained" onPress={addCard}>Save</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { marginVertical: 10 },
});
