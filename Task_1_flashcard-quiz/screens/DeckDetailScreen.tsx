// DeckDetailScreen.tsx
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Card, Button } from 'react-native-paper';
import { useRoute, useNavigation } from '@react-navigation/native';

interface Flashcard {
  question: string;
  answer: string;
}

export default function DeckDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { name, cards } = route.params as {
    name: string;
    cards: Flashcard[];
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineLarge">{name} Deck</Text>

      {cards.length === 0 ? (
        <Text style={{ marginTop: 20 }}>No flashcards yet. Add some!</Text>
      ) : (
        <FlatList
          data={cards}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Title title={item.question} subtitle={item.answer} />
            </Card>
          )}
        />
      )}

      <Button
        mode="contained"
        style={styles.button}
        onPress={() => navigation.navigate('AddFlashcard', { deckName: name })}
      >
        ➕ Add Flashcard
      </Button>

      <Button
        mode="outlined"
        style={styles.button}
        onPress={() => navigation.navigate('DeckQuiz', { cards })}
      >
        🧠 Start Quiz
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { marginVertical: 8, backgroundColor: '#f4f0fa' },
  button: { marginTop: 16 },
});
