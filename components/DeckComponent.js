import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { getDeck } from '../utils/api';


const styles = StyleSheet.create({

    card: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        width: 300,
        height: 100,
        marginTop: 10,
        justifyContent: 'center',
        backgroundColor:'#ebebeb',
        marginTop:100,
        marginBottom:100,
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

    titleContainer:{
        marginLeft:50,
    },

    buttonContainer: {
        marginTop: 20,
        padding: 20
    }

});


export default class DeckComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { deck: null, loading: true };
    }


    componentDidMount() {

        console.log("DeckComponent");
        const { params } = this.props.navigation.state;
        const id = params ? params.id : null;

        getDeck(id).then((res) => {
            console.log("the deck:", res);
            this.setState({ deck: res, loading: false,id:id });
        })
    }


    addCard() {

    }

    startQuiz() {
        console.log("Start Quiz");
        this.props.navigation.navigate('QuizComponent',{questions:this.state.deck.questions,deckId:this.state.id});
    }



    render() {


        if (this.state.loading) {
            return <View><Text>Loading...</Text></View>
        }

        var deck = this.state.deck;


        return (
            <View style={styles.container}>

                <View style={styles.card}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.header}>{deck.title}</Text>
                        <Text>{deck.questions.length} cards</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={() => this.addCard()}
                            title="Add Card"
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button"
                        />
                        <Button
                            onPress={() => this.startQuiz()}
                            title="Start Quiz"
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button"
                        />
                    </View>
                </View>

            </View>
        )
    }

}