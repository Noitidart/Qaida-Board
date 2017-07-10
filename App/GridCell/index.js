import React, { Component } from 'react'
import { TouchableHighlight, Text, View, Animated } from 'react-native'

import styles from './style.css'

const CELLS_PER_ROW = 6;

class GridCell extends Component {
    state = {
        zoomed: false,
        isZooming: false,
        anim: new Animated.Value(0)
    }

    handlePress = () => {
        this.setState(stateOld => ({ zoomed:!stateOld.zoomed, isZooming:true }));
    }

    componentDidUpdate(propsOld, stateOld) {
        const { zoomed } = this.state;
        const { zoomed:zoomedOld } = stateOld;

        if (zoomed !== zoomedOld) {
            const { anim } = this.state;
            const toValue = zoomed ? 1 : 0;
            Animated.timing(anim, { toValue, duration:1000 }).start(e => {
                // console.log('anim finished:', e.finished);
                if (e.finished) {
                    this.setState(() => ({isZooming:false}))
                }
            });
        }
    }

    render() {

        const {content, i, screenWidth, screenHeight, marginTop = 0} = this.props
        const { isZooming, zoomed, anim } = this.state;

        const row = Math.floor(i / CELLS_PER_ROW);
        const col = Math.floor(i % CELLS_PER_ROW);

        const cellWidthZoomed = screenWidth;
        const cellWidthNorm = Math.round(screenWidth / CELLS_PER_ROW);

        const cellHeightZoomed = screenHeight;
        const cellHeightNorm = Math.round(screenHeight / CELLS_PER_ROW);

        const textSizeZoomed = Math.floor(0.5 * cellHeightZoomed);
        const textSizeNorm = Math.floor(0.5 * cellHeightNorm);

        const cellXZoomed = 0;
        const cellXNorm = Math.round(screenWidth - ((col + 1) * cellWidthNorm));

        const cellYZoomed = 0;
        const cellYNorm = Math.round(row * cellHeightNorm) + marginTop;

        // console.log(content, row, col, cellXNorm, cellYNorm, cellWidthNorm);

        const cellStyle = {
            transform: [
                {
                    translateX: anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [cellXNorm, cellXZoomed]
                    })
                },
                {
                    translateY: anim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [cellYNorm, cellYZoomed]
                    })
                }
            ],
            width: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [cellWidthNorm, cellWidthZoomed]
            }),
            height: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [cellHeightNorm, cellHeightZoomed]
            }),
            zIndex: isZooming || zoomed ? 1 : 0
        };

        const textStyle = {
            fontSize: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [textSizeNorm, textSizeZoomed]
            })
        }


        return (
            <Animated.View style={[styles.gridCell, cellStyle]}>
                <Animated.Text style={[styles.text, textStyle]} onPress={this.handlePress}>
                    { content.split(',').map( letter => letterFromLetter(letter) ).join('') }
                </Animated.Text>
            </Animated.View>
        )
    }
}

function letterFromLetter(letter) {
    switch (letter) {
        case 'alif': return '\u0627';
        case 'ba': return '\u0628';
        case 'ta': return '\u062A';
        case 'taa': return '\u062B';
        case 'geem': return '\u062C';
        case 'hha': return '\u062D';
        case 'kha': return '\u062E';
        case 'dal': return '\u062F';
        case 'dhal': return '\u0630';
        case 'ra': return '\u0631';
        case 'za': return '\u0632';
        case 'seen': return '\u0633';
        case 'sheen': return '\u0634';
        case 'saud': return '\u0635';
        case 'daud': return '\u0636';
        case 'tau': return '\u0637';
        case 'dau': return '\u0638';
        case 'ayn': return '\u0639';
        case 'ghayn': return '\u063A';
        case 'fa': return '\u0641';
        case 'qaf': return '\u0642';
        case 'kaf': return '\u0643';
        case 'lam': return '\u0644';
        case 'meem': return '\u0645';
        case 'noon': return '\u0646';
        case 'ha': return '\u0647';
        case 'wow': return '\u0648';
        case 'ya': return '\u064A';
        //
        case 'fata': return '\u064E';
        case 'kasra': return '\u0650';
        case 'dumma': return '\u064F';
        case 'fatatan': return '\u064B';
        case 'kasratan': return '\u064D';
        case 'dummatan': return '\u064C';
        //
        default: return letter;
    }
}

export default GridCell

