import React, { Component } from 'react'
import { Text, View, Animated } from 'react-native'

import Combinatrix from '../Combinatrix'

import { ARABIC_LETTERS, TASHKEEL_LETTERS, letterFromLetter, isTashkeel } from '../utils'

import styles from './style.css'


const CELLS_PER_ROW = 6;
const ZOOM_DURATION = 300; // ms

const TASHKEEL_LETTERS_LETTERS = TASHKEEL_LETTERS.map(letter => letterFromLetter(letter)).reverse();
const ARABIC_LETTERS_LETTERS = ARABIC_LETTERS.map(letter => letterFromLetter(letter)).reverse();

class GridCell extends Component {
    state = {
        zoomed: false,
        isZooming: false,
        anim: new Animated.Value(0),
        content: this.props.content
    }

    handlePress = () => {
        this.setState(stateOld => ({ zoomed:!stateOld.zoomed, isZooming:true }));
    }

    addContent = content => {
        this.setState( stateOld => ({ content: stateOld.content + content }) );
    }

    backspaceContent = () => {
        this.setState( stateOld => {
            const contentPartsNew = stateOld.content.split(',');

            if (contentPartsNew.length === 1) return;

            if (isTashkeel(contentPartsNew[contentPartsNew.length - 1])) {
                contentPartsNew.pop();
                contentPartsNew.pop();
            } else {
                contentPartsNew.pop();
            }

            const contentNew = contentPartsNew.join(',');

            return { content:contentNew };
         } );
    }

    resetContent = () => {
        this.setState( stateOld => {
            const contentParts = stateOld.content.split(',');

            if (contentParts.length === 1) return;

            const contentNew = contentParts[0];

            return { content:contentNew };
         } );
    }

    componentDidUpdate(propsOld, stateOld) {
        const { zoomed } = this.state;
        const { zoomed:zoomedOld } = stateOld;

        if (zoomed !== zoomedOld) {
            const { anim } = this.state;
            const toValue = zoomed ? 1 : 0;
            Animated.timing(anim, { toValue, duration:ZOOM_DURATION }).start(e => {
                // console.log('anim finished:', e.finished);
                if (e.finished) {
                    this.setState(() => ({isZooming:false}))
                }
            });
        }
    }

    render() {

        const { i, screenWidth, screenHeight, marginTop = 0} = this.props
        const { content, isZooming, zoomed, anim } = this.state;

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
            // paddingBottom: anim.interpolate({
            //     inputRange: [0, 1],
            //     outputRange: [0, 200]
            // }),
            zIndex: isZooming || zoomed ? 1 : 0
        };

        const textStyle = {
            fontSize: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [textSizeNorm, textSizeZoomed]
            })
        }


        const contentParts = content.split(',');
        const contentStr = contentParts.map( letter => letterFromLetter(letter) ).join('');

        const shouldShowTashkeels = zoomed && !isTashkeel(contentParts[contentParts.length - 1]);

        return (
            <Animated.View style={[styles.gridCell, cellStyle]}>
                <Animated.Text style={[styles.text, textStyle]} onPress={this.handlePress}>
                    { contentStr }
                </Animated.Text>
                { zoomed && <Combinatrix tashkeels={TASHKEEL_LETTERS_LETTERS} letters={ARABIC_LETTERS_LETTERS} delayShow={ZOOM_DURATION} shouldShowTashkeels /> }
            </Animated.View>
        )
    }
}

export default GridCell

