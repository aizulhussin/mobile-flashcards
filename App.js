import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListDecksComponent from './components/ListDecksComponent';
import StatusBarComponent from './components/StatusBarComponent';
import DeckComponent from './components/DeckComponent';
import QuizComponent from './components/QuizComponent';
import NewDeckComponent from './components/NewDeckComponent';
import { StackNavigator } from 'react-navigation';
import { getDecks } from './utils/api'



const Stack = StackNavigator(
  {
    ListDecksComponent: {
      screen: ListDecksComponent,
    },
    DeckComponent: {
      screen: DeckComponent,
    },
    QuizComponent:{
      screen:QuizComponent
    },
    NewDeckComponent:{
      screen:NewDeckComponent
    },

  },
  {
    initialRouteName: 'ListDecksComponent',
  }
)


export default class App extends React.Component {


  render() {
    return (
      <Stack />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

