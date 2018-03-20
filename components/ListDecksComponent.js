import React from 'react';
import { StyleSheet, Text, View, ListView } from 'react-native';
import { getDecks } from '../utils/api';
import StatusBarComponent from '../components/StatusBarComponent';




const styles = StyleSheet.create({
    bigblue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
    },
    red: {
      color: 'red',
    },
    card:{
        flex:1,
        flexDirection:'column',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#000000',
        padding:40,
        width:400,
        height:200,
        marginTop:10,
        justifyContent:'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }
  });


function DeckItem({id,deck,...props}) {

    console.log("ID:",id);
    var cards = deck.questions;
    
    return (
        <View id={id} style={styles.card}>
            <Text>{deck.title}</Text>
            <Text>{cards.length} cards</Text>
        </View>
    );
}


export default class ListDecksComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            decks: {},
            dataSource: [],
            loading: true
        }
    }


    componentDidMount() {

        getDecks().then((res) => {
            var keys = Object.keys(JSON.parse(res));
            const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
            this.setState({ decks: JSON.parse(res), dataSource: ds.cloneWithRows(keys),loading:false });
        });

    }

    renderItem(row){

        return (

            <DeckItem id={row} deck={this.state.decks[row]}/>
        );

    }

    render() {

        if(this.state.loading){
            return <View><Text>loading...</Text></View>
        }

        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <DeckItem id={rowData} deck={this.state.decks[rowData]}/>}
                />
            </View>);

        }

}

