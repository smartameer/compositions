import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    PixelRatio,
    View,
    TextInput,
    Text
} from 'react-native';
import store from 'react-native-simple-store';

class Composition extends Component {
    static propTypes = {
        title: PropTypes.string,
        navigator: PropTypes.object.isRequired,
    }

    constructor(props, context) {
        super(props, context);
        this.progress = null;
        this.storecreated = false;
        let item = !this.props.item ? '' + new Date().getTime() : this.props.item;
        this.initKey = Object.assign({}, {key: item});
        this.state = {
            item: item,
            wordcount: 0,
            textareaHeight: 0,
            text: '',
        };
        this._contentSizeChanged = this._contentSizeChanged.bind(this);
        this._changeText = this._changeText.bind(this);
        this._changeTitle = this._changeTitle.bind(this);
        this._updateStore = this._updateStore.bind(this);
        this._updateStoreKey = this._updateStoreKey.bind(this);
    }

    componentDidMount() {
        store.get(this.state.item).then(content => {
            if (content) {
                const {text} = content;
                if (text) {
                    this.setState({text});
                    this._countWords();
                    this.storecreated = true;
                }
            }
        });
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
        this._updateStore();
    }

    _changeTitle(item) {
        this.setState({item});
    }

    _updateStoreKey() {
        store.get(this.initKey.key).then(content => {
            if (content && this.initKey.key != '') {
                store.delete(this.initKey.key);
            }
            if (this.state.item !== '') {
                store.save(this.state.item, {
                    text: this.state.text
                });
                this.initKey = Object.assign({}, {key: this.state.item});
            }
        });
    }

    _updateStore() {
        if (this.progress) {
            clearTimeout(this.progress);
            this.progress = null;
        }
        if (this.progress === null) {
            this.progress = setTimeout(() => {
                if (!this.storecreated) {
                    store.save(this.state.item, {
                        text: this.state.text
                    }).then(data => {
                        this.storecreated = true;
                    });
                } else {
                    store.update(this.state.item, {
                        text: this.state.text
                    });
                }
                this.progress = null;
            }, 300);
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <TextInput
                        editable={true}
                        multiline={false}
                        autoCorrect={false}
                        placeholder="Document Title ..."
                        placeholderTextColor="#CDCDCD"
                        autoCapitalize="sentences"
                        onChangeText={this._changeTitle}
                        onBlur={this._updateStoreKey}
                        maxLength={100}
                        style={styles.titletext}
                        value={this.state.item}
                        />
                </View>
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
    header: {
        marginTop: 80,
        padding: 10,
        borderBottomColor: '#DDD',
        borderBottomWidth: 1 / PixelRatio.get(),
    },
    titletext: {
        padding: 5,
        fontSize: 20,
        color: '#333333',
        fontWeight: '400',
        fontFamily: 'Palatino',
        textAlign: 'center',
        textAlignVertical: 'center'
    },
    textarea: {
        flex: 1,
        color: '#333333',
        fontWeight: '400',
        fontFamily: 'Palatino',
        height: 100,
        marginTop: 5,
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
        fontFamily: 'Palatino',
        paddingLeft: 10,
    }
});

export default Composition;

