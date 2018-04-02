import React from 'react';
import { StyleSheet, Text, View, Button, Animated,Alert } from 'react-native';
import { getDeck } from '../utils/api';
import { Ionicons } from '@expo/vector-icons'


const styles = StyleSheet.create({

    card: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        width: 300,
        height: 100,
        marginTop: 10,
        justifyContent: 'center',
        backgroundColor: '#ebebeb',
        marginTop: 100,
        marginBottom: 100,
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#ebebeb',
    },
    container: {
        flex: 1,
        padding: 5,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    header: {
        fontSize: 20,
        color: '#000000',
        fontWeight: 'bold'
    },

    titleContainer: {
        marginLeft: 50,
    },

    buttonContainer: {
        marginTop: 20,
        padding: 20
    },

    button:{
        marginBottom:20
    }

});

class FadeInView extends React.Component {
    state = {
      fadeAnim: new Animated.Value(0),
    }
  
    componentDidMount() {
      Animated.timing(
        this.state.fadeAnim,
        {
          toValue: 1,
          duration: 5000,
        }
      ).start();
    }
  
    render() {
      let { fadeAnim } = this.state;
  
      return (
        <Animated.View
          style={{
            ...this.props.style,
            opacity: fadeAnim,
          }}
        >
          {this.props.children}
        </Animated.View>
      );
    }
  }


export default class DeckComponent extends React.Component {

    static navigationOptions = ({ navigation }) => {

        return {
            title: "Deck",

            headerLeft:

            <Ionicons name="md-home" style={{ marginLeft: 5 }} size={24} onPress={() => navigation.navigate("ListDecksComponent")} color="blue" />
            ,


        };
    };

    constructor(props) {
        super(props);
        this.state = { deck: null, loading: true, fadeAnim: new Animated.Value(0) };
    }


    componentDidMount() {
        
        this.retrieveDeck()
    }

    retrieveDeck() {

        const { params } = this.props.navigation.state;
        const id = params ? params.id : null;

        getDeck(id).then((res) => {



            console.log("the deck:", res);
            this.setState({ deck: res, loading: false, id: id });
        })
    }


    addCard(id) {

        console.log("addCard");
        this.props.navigation.navigate("NewCardComponent", { title: id, retrieveDeck: this.retrieveDeck });

    }

    startQuiz() {
        console.log("Start Quiz");
        if(this.state.deck.questions.length > 0){
            this.props.navigation.navigate('QuizComponent', { questions: this.state.deck.questions, deckId: this.state.id });
        }else{
            Alert.alert(
                'No Quiz',
                'No quiz available. Please add a card',
                [
                  {text: 'Cancel', onPress: () => console.log('Cancel'), style: 'cancel'},
                  {text: 'OK', onPress: () => console.log('OK')},
                ],
                { cancelable: false }
              )
        }
    }



    render() {

        

        if (this.state.loading) {
            return <View><Text>Loading...</Text></View>
        }

        var deck = this.state.deck;


        return (
            
                <View style={styles.container}>

                    <FadeInView>
                    <View style={styles.card}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.header}>{deck.title}</Text>
                            <Text>{deck.questions.length} cards</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <View style={styles.button}>
                            <Button
                                onPress={() => this.addCard(deck.title)}
                                title="Add Card"
                                color="blue"
                                accessibilityLabel="Add Card"
                            />
                            </View>
                            <View>
                            <Button
                                onPress={() => this.startQuiz()}
                                title="Start Quiz"
                                color="blue"
                                accessibilityLabel="Start Quiz"
                                
                            />
                            </View>
                        </View>
                    </View>
                    </FadeInView>

                </View>
            
        )
    }

}