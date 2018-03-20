import { AsyncStorage } from 'react-native';

const KEY = "MFC";
const decks = 
{
    React: {
      title: 'React',
      questions: [
        {
          question: 'Is React a programming language?',
          answer: 'No',
          description:'React is a UI framework'
        },
        {
          question: 'Is componentDidMount part of Component lifecycle event?',
          answer: 'Yes',
          description:'Its one of the lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }




export function getDecks(){
    return AsyncStorage.getItem(KEY)
    .then(parseResult);
}

function parseResult(results){
    console.log('parse result:',results);
    if(results===null){
        console.log("No result. Let's setup");
        //console.log('setup Data:',decks);
        AsyncStorage.setItem(KEY,JSON.stringify(decks));
        return decks;
    }else{
        console.log("KKKK");
        return results;
    }
}


