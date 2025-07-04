// screens/DeckListScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Text, Button, TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'DeckDetail'>;


// const navigation = useNavigation();


interface Deck {
  name: string;
  cards: { question: string; answer: string }[];
}

export default function DeckListScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [decks, setDecks] = useState<Deck[]>([]);
  const [newDeckName, setNewDeckName] = useState('');

  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem('decks');
      if (saved) setDecks(JSON.parse(saved));
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('decks', JSON.stringify(decks));
  }, [decks]);

  const addDeck = () => {
    if (newDeckName.trim()) {
      setDecks([...decks, { name: newDeckName.trim(), cards: [] }]);
      setNewDeckName('');
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">📚 Your Decks</Text>
      <TextInput
        label="New Deck Name"
        value={newDeckName}
        onChangeText={setNewDeckName}
        style={styles.input}
      />
      <Button mode="contained" onPress={addDeck} style={styles.button}>Add Deck</Button>
      <FlatList
        data={decks}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Card onPress={() =>
            navigation.navigate('DeckDetail', {
              name: item.name,
              cards: item.cards, // ✅ cards must be passed here!
            })
          }>
          
                <Card.Title title={item.name} subtitle={`${item.cards.length} cards`} />
              </Card>
        )}
          />
          
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { marginTop: 12, marginBottom: 8 },
  button: { marginBottom: 16 },
  card: { marginBottom: 12 },
});

