import React, { Component } from 'react';
import { TouchableHighlight, Text, View } from 'react-native';
import styles from './style.css'

const CELLS_PER_ROW = 5;

class GridCell extends Component {
    state = {
        active: false
    }

    handlePress = () => {
        setTimeout(() => this.setState(({active}) => ({ active:!active })), 1000);
    }
    componentDidMount() {
        setTimeout(() => this.setState(({active}) => ({ active:!active })), 1000);
        setTimeout(() => this.setState(({active}) => ({ active:!active })), 2000);
    }

    render() {

        const {content, i, screenWidth, screenHeight, marginTop = 0} = this.props
        const { active } = this.state;

        const row = Math.floor(i / CELLS_PER_ROW);
        const col = Math.floor(i % CELLS_PER_ROW);

        const cellWidth = screenWidth / 5;
        const cellHeight = screenHeight / 5;
        const cellStyle = {
            left: Math.floor(col * cellWidth),
            top: Math.floor(row * cellHeight),
            backgroundColor: 'gray' ,
            alignItems: 'center' ,
            justifyContent: 'center' ,
            position: 'absolute' ,
            transform: [
                { translateX: active ? 0 : Math.floor(col * cellWidth) },
                { translateY: active ? 0 : Math.floor(row * cellHeight) },
                { scale: active ? 1 : 1 / 5 }
            ],
            width: screenWidth,
            height: screenHeight,
            zIndex: active ? 1 : 0
        }


        return (
            <TouchableHighlight style={[styles.gridCell, cellStyle]} onPress={this.handlePress}>
                <View>
                    <Text style={styles.text}>
                        {content}{i} x:{cellStyle.left} y:{cellStyle.top}
                    </Text>
                </View>
            </TouchableHighlight>
        )
    }
}

export default GridCell

