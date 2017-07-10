import React, { Component } from 'react';
import { TouchableHighlight, Text, View, Animated } from 'react-native';
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
        const cellXNorm = Math.round(col * cellWidthNorm);

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
                    {content}
                </Animated.Text>
            </Animated.View>
        )
    }
}

export default GridCell

