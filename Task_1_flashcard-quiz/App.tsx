// App.tsx
import { PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DeckListScreen from './screens/DeckListScreen';
import QuizScreen  from './screens/QuizScreen';
import DeckDetailScreen from './screens/DeckDetailScreen';
import FlashcardsScreen from './screens/FlashcardsScreen';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from './screens/types';
import AddFlashcardScreen from './screens/AddFlashcardScreen';
import DeckQuizScreen from './screens/DeckQuizScreen';


const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator<RootStackParamList>();


// Tabs at the bottom
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'albums-outline';
          if (route.name === 'Decks') iconName = 'albums-outline';
          else if (route.name === 'Quiz') iconName = 'help-circle-outline';
          else if (route.name === 'Flashcards') iconName = 'create-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Decks" component={DeckListScreen} />
      <Tab.Screen name="Flashcards" component={FlashcardsScreen} />
      <Tab.Screen name="Quiz" component={QuizScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
      <Stack.Navigator>
  <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
  <Stack.Screen name="DeckDetail" component={DeckDetailScreen} />
  <Stack.Screen name="AddFlashcard" component={AddFlashcardScreen} />
  <Stack.Screen name="DeckQuiz" component={DeckQuizScreen} />
</Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
