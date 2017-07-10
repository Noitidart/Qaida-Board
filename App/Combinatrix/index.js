import React, { Component } from 'react'
import { TouchableHighlight, Text, View, ScrollView, Animated } from 'react-native'

import Combinator from './Combinator'

import styles from './style.css'

const FADE_DURATION = 500;

class Combinatrix extends Component {
    /* props
        delayShow - ms
        tashkeels - array of strings
        letters - array of strings
        shouldShowTashkeels
    */
    state = {
        faded: false,
        isFading: false,
        anim: new Animated.Value(0)
    }

    componentDidMount() {
        const { delayShow=0 } = this.props;
        const { anim } = this.state;

        setTimeout(() => {
            Animated.timing(anim, { toValue:1, duration:FADE_DURATION }).start( () => {
                this.setState( () => ({ isFading:false }) )
            } );
            this.setState( () => ({ faded:true, isFading:true }) )
        }, delayShow);
    }

    render() {

        const { letters, tashkeels } = this.props;
        const { anim, faded, isFading } = this.state;

        const wrapStyle = {
            opacity: anim,
            display: !faded ? 'none' : undefined
        }

        return (
            <Animated.View style={[styles.wrap, wrapStyle]}>
                <View style={styles.row}>
                    { tashkeels.map(tashkeel => <Combinator key={tashkeel}>{tashkeel}</Combinator>) }
                </View>
                <ScrollView contentContainerStyle={styles.row} horizontal>
                    { letters.map(letter => <Combinator key={letter}>{letter}</Combinator>) }
                </ScrollView>
            </Animated.View>
        )
    }
}

export default Combinatrix

