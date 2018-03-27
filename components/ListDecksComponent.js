import React from 'react';
import { StyleSheet, Text, View, ListView,TouchableOpacity,Button} from 'react-native';
import { getDecks } from '../utils/api';
import StatusBarComponent from '../components/StatusBarComponent';




const styles = StyleSheet.create({
    
    card:{
        flex:1,
        flexDirection:'column',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#000000',
        backgroundColor:'#FFFFFF',
        padding:40,
        width:350,
        height:200,
        marginTop:10,
        marginLeft:5,
        marginRight:5,
        alignItems:'center',
        justifyContent:'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      }
  });


function DeckItem({id,deck,navigation,...props}) {


    var cards = deck.questions;

    console.log("Props:",props);
    
    return (
        <TouchableOpacity onPress={()=>{
            //navigation.setParams({otherParam: deck});
            navigation.navigate('DeckComponent',{id:id});
            }}>
        <View id={id} style={styles.card}>
            <Text>{deck.title}</Text>
            <Text>{cards.length} cards</Text>
        </View>
        </TouchableOpacity>
    );
}


export default class ListDecksComponent extends React.Component {

    static navigationOptions = ({ navigation }) => {
        
        //const params = navigation.state.params || {};
    
        return {
          title: "Decks",
          headerRight: (
            <Button 
            onPress={()=>navigation.navigate("NewDeckComponent")} 
            title="ADD" 
            color="blue" />
          ),
        };
      };

   
      constructor(props) {
        super(props);
        this.state = {
            decks: {},
            dataSource: [],
            loading: true
        }
    }

    addDeck(){
        console.log("Add Deck");
        this.props.navigation.navigate("NewDeckComponent")
    }



    listDecks(){

        getDecks().then((res) => {
            var keys = Object.keys(JSON.parse(res));
            const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
            this.setState({ decks: JSON.parse(res), dataSource: ds.cloneWithRows(keys),loading:false });

            
        });

    }

    render() {

        this.listDecks();

        if(this.state.loading){
            return <View><Text>loading...</Text></View>
        }

        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData) => <DeckItem id={rowData} navigation = {this.props.navigation} deck={this.state.decks[rowData]}/>}
                />
            </View>);

        }

}

