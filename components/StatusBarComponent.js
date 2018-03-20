import React from 'react';
import { StyleSheet, Text, View, StatusBar,Dimensions } from 'react-native';
import { Constants } from 'expo';
import { purple, white } from '../utils/colors'



export default class StatusBarComponent extends React.Component {



    render() {

        var backgroundColor = purple;
        var {height, width} = Dimensions.get('window');

        return (

            <View style={{ backgroundColor, height: Constants.statusBarHeight,width:width}}>
                <StatusBar translucent backgroundColor={backgroundColor} {...this.props} />
            </View>

        );
    }
}