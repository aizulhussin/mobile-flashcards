import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { getDeck } from '../utils/api';


export default class DeckComponent extends React.Component {



    render() {
        console.log("DeckComponent");
        const { params } = navigation.state;
        const id = params ? params.id : null;
        
        deck = getDeck(id);


        return (
            <View>
                <View>
                    <Text>{deck.title}</Text>
                </View>
                <View>
                    <Text>{deck.questions.length} cards</Text>
                </View>
                
                <View>
                   <TouchableOpacity>
                       <View><Text>Add Card</Text></View>
                   </TouchableOpacity>
                </View>

                <View>
                   <TouchableOpacity>
                       <View><Text>Start Quiz</Text></View>
                   </TouchableOpacity>
                </View>

            </View>
        )
    }

}