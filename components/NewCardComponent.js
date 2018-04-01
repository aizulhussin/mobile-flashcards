import React from 'react';
import { StyleSheet, Text, View, ListView, TouchableOpacity, Button, TextInput,KeyboardAvoidingView } from 'react-native';
import {addCardToDeck} from '../utils/api';

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
        marginBottom: 10
    },

    buttonContainer: {
        marginTop: 20,
        padding: 20
    }

});

export default class NewCardComponent extends React.Component {

    static navigationOptions = {
        headerTitle: "Add Card",

    };

    constructor(props) {
        super(props);

        this.state = {

            question:"",
            answer:"",
            deckTitle: "",
        }
    }

    componentDidMount() {

        const { params } = this.props.navigation.state;
        const title = params ? params.title : null;

        this.setState({ deckTitle: title });
    }

    addCard(){
        card = {question:this.state.question,answer:this.state.answer};
        console.log("Saved Card ",this.state.question);
        addCardToDeck(this.state.deckTitle,card).then(()=>{
            console.log("Saved Card ",this.state.question);
            this.props.navigation.navigate('DeckComponent',{id:this.state.deckTitle});
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <KeyboardAvoidingView behavior='position' style={{ flex: 1 }}>
                <View style={styles.card}>
                    <View>
                    <View>
                        <Text>Question:</Text>    
                        <TextInput
                            style={{ height: 40, borderColor: 'black', borderWidth: 1,marginBottom:10 }}
                            onChangeText={(q) => this.setState({ question:q })}
                            value={this.state.question}
                        />
                    </View>

                    <View>
                        <Text>Answer:</Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'black', borderWidth: 1 }}
                            onChangeText={(text) => this.setState({ answer:text })}
                            value={this.state.answer}
                        />
                    </View>

                   </View> 

                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={() => this.addCard()}
                            title="Submit"
                            color="blue"
                            accessibilityLabel="Submit"
                        />

                    </View>
                </View>
                </KeyboardAvoidingView>

            </View>
        );
    }
}