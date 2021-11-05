import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export default class PortraitDisplay extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.display}>{this.props.display}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {},
    display: {
        color: 'white',
        fontSize: 60,
        fontWeight: 'bold',
        padding: 5,
        textAlign: 'right',
    },
})