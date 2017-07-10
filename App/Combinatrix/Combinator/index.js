import React, { Component } from 'react'
import { TouchableHighlight, Text, View } from 'react-native'

import styles from './style.css'

const FADE_DURATION = 200;

class Combinator extends Component {
    /* props
        children - string
    */
    render() {

        const { children } = this.props;

        return (
            <View style={styles.cell}>
                <Text style={styles.text}>{children}</Text>
            </View>
        )
    }
}

export default Combinator