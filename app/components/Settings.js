import React, { Component } from 'react';
import {
    StyleSheet,
    PixelRatio,
    View,
    TextInput,
    Text
} from 'react-native';

class Settings extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.wordcount}>Settings Page Goes Here</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    wordcount: {
        fontSize: 17,
        fontWeight: '300',
    }
});

export default Settings;

