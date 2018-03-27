import React from 'react';
import { StyleSheet, Text, View, ListView, TouchableOpacity, Button, TextInput } from 'react-native';
import {saveDeckTitle} from '../utils/api';

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
        marginBottom:10
    },

    buttonContainer: {
        marginTop: 20,
        padding: 20
    }

});


export default class NewDeckComponent extends React.Component {

    static navigationOptions = {
        headerTitle: "Add Deck",
        
      };

    constructor(props){
        super(props);

        this.state = {
            deckTitle:""
        }
    }


    saveDeck() {
        console.log("Save Deck. Title:",this.state.deckTitle);
        if(saveDeckTitle(this.state.deckTitle)){
            console.log("Saved");
            this.props.navigation.goBack();

        }
        
        //
    }


    render() {
        return (

            <View style={styles.container}>

                <View style={styles.card}>
                    <View style={styles.titleContainer}>
                        <Text>What is the title of your Deck?</Text>
                    </View>

                    <View>

                        <TextInput
                            style={{ height: 40, borderColor: 'black', borderWidth: 1 }}
                            onChangeText={(text) => this.setState({ deckTitle:text })}
                            value={this.state.deckTitle}
                        />
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            onPress={() => this.saveDeck()}
                            title="Submit"
                            color="#841584"
                            accessibilityLabel="Learn more about this purple button"
                        />

                    </View>
                </View>

            </View>

        );
    }
}