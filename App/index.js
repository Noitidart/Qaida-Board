import React, { Component } from 'react';
import { AppRegistry, Text, View, Dimensions } from 'react-native';
import styles from './style.css'
import GridCell from './GridCell'

class App extends Component {

    state = {
        'screenWidth': Dimensions.get('window').width,
        'screenHeight': Dimensions.get('window').height,
    }

    render() {
        const{screenHeight, screenWidth} = this.state;

        const letters = ['alif', 'ba', 'ta', 'taa', 'geem', 'hha', 'kha', 'dal', 'dhal', 'ra', 'za', 'seen', 'sheen', 'saud', 'daud', 'tau', 'dau', 'ayn', 'ghayn', 'fa', 'qaf', 'kaf', 'lam', 'meem', 'noon', 'ha', 'wow', 'ya'];
        const gridCells = [];

        for(let i = 0; i < letters.length; i++){
            gridCells.push(
                <GridCell
                    content={letters[i]}
                    i={i}
                    key={'cell' + i}
                    screenWidth={screenWidth}
                    screenHeight={screenHeight}
                    marginTop={70}
                />
            );
        }

        return (
            <View style={styles.container} onLayout={this.handleLayout}>

                <Text style={styles.welcome}>
                    Qaida Board
                </Text>

                {gridCells}

            </View>
        );
    }

    handleLayout = (e) => {
        // const {nativeEvent:{layout:{ width, height }}}=e;
        const screenWidth = e.nativeEvent.layout.width;
        const screenHeight = e.nativeEvent.layout.height;
        const updateThese = {
            'screenHeight': screenHeight,
            'screenWidth': screenWidth
        }
        this.setState(updateThese);
    }
}

AppRegistry.registerComponent('qaidaboard', () => App);
