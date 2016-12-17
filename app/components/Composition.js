import React, { Component } from 'react';
import {
    StyleSheet,
    PixelRatio,
    View,
    TextInput,
    Text
} from 'react-native';

class Composition extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            wordcount: 0,
            textareaHeight: 0,
            text: '',
        };
        this._contentSizeChanged = this._contentSizeChanged.bind(this);
        this._changeText = this._changeText.bind(this);
    }

    _countWords() {
        if (this.state.text && this.statetext != '') {
            let content = this.state.text;
            content = content.replace(/(^\s*)|(\s*$)/gi,"");//exclude  start and end white-space
            content = content.replace(/[ ]{2,}/gi," ");//2 or more space to 1
            content = content.replace(/\n /,"\n"); // exclude newline with a start spacing
            this.state.wordcount = content.split(/\s+/).length;
        } else {
            this.state.wordcount = 0;
        }
    }

    _contentSizeChanged(event) {
        const {contentSize} = event.nativeEvent;
        this.setState({
            textareaHeight: contentSize.height
        });
    }

    _changeText(text) {
        this.setState({text});
        this._countWords();
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    editable={true}
                    multiline={true}
                    autoFocus={true}
                    autoCorrect={false}
                    placeholder="Compose ..."
                    placeholderTextColor="#CDCDCD"
                    dataDetectorTypes="all"
                    onContentSizeChange={this._contentSizeChanged}
                    onChangeText={this._changeText}
                    style={[styles.textarea, {height: Math.max(35, this.state.textareaHeight)}]}
                    value={this.state.text}
                    />
                <View style={styles.footer}>
                    <Text style={styles.wordcount}>Word Count: {this.state.wordcount}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    textarea: {
        flex: 1,
        color: '#333333',
        fontSize: 17,
        fontWeight: '400',
        fontFamily: 'Palatino',
        height: 100,
        marginTop: 70,
        marginBottom: 35,
        marginLeft: 10,
        marginRight: 10,
    },
    footer: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 30,
        borderTopColor: '#CDCDCD',
        borderTopWidth: 1 / PixelRatio.get(),
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    wordcount: {
        fontSize: 12,
        fontWeight: '300',
        paddingLeft: 10,
    }
});

export default Composition;

