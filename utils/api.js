import { AsyncStorage } from 'react-native';


const KEY = "MFC";
const QUIZ_END_COUNT = "QUIZ_END_COUNT";
const decks =
  {
    React: {
      title: 'React',
      questions: [
        {
          question: 'Is React a programming language?',
          answer: 'No',
          description: 'React is a UI framework'
        },
        {
          question: 'Is componentDidMount part of Component lifecycle event?',
          answer: 'Yes',
          description: 'Its one of the lifecycle event'
        }
      ]
    }
  }




export function getDecks() {
  console.log("KEY IS ",KEY);
  return AsyncStorage.getItem(KEY)
    .then(parseResult);
}

export function addCardToDeck(title, card) {

  return AsyncStorage.getItem(KEY).then((decks) => {
    decksObj = JSON.parse(decks);
    decksObj[title].questions.push(card);
    return AsyncStorage.setItem(KEY, JSON.stringify(decksObj));
  })
}


export function saveDeckTitle(title) {

  return getDecks().then((res) => {
    decks = JSON.parse(res);

    deck = {

      title: title,
      questions: []

    }

    decks[title] = deck;

    console.log("Save Deck:", JSON.stringify(decks));
    return AsyncStorage.setItem(KEY, JSON.stringify(decks));

  });

}

export function saveQuizCount(){
  
  AsyncStorage.getItem(QUIZ_END_COUNT).then((res)=>{
       var count = parseInt(res);
       count = count + res;
       AsyncStorage.setItem(QUIZ_END_COUNT,count);
  });
}

export function getDeck(id) {

  return AsyncStorage.getItem(KEY).then((res) => {
    console.log("ID is ", id);
    console.log("Res is ", res);
    obj = JSON.parse(res);
    deck = obj[id];
    console.log("Deck:", deck);
    return deck;
  });
}

function parse(res) {

  return JSON.parse(res);
}

function parseResult(results) {
  if (results === null) {
    AsyncStorage.setItem(KEY, JSON.stringify(decks));
    
    return decks;
    
  } else {
    return JSON.parse(results);
  }
}



