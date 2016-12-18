import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    PixelRatio,
    TouchableHighlight,
    AlertIOS,
    Text,
    View
} from 'react-native';
import Composition from './Composition.js';
import store from 'react-native-simple-store';

class ListItem extends Component {
    static propTypes = {
        title: PropTypes.string,
        navigator: PropTypes.object.isRequired,
    }

    constructor(props, context) {
        super(props, context);
        this.state = {
            item: props.item || 'Untitled'
        };
        this._onForward = this._onForward.bind(this);
        this._deleteComposition = this._deleteComposition.bind(this);
    }

    _onForward() {
        this.props.navigator.push({
            title: this.state.item,
            component: Composition,
            rightButtonSystemIcon: 'trash',
            onRightButtonPress: this._deleteComposition,
            passProps: {
                item: this.state.item
            }
        });
    }

    _deleteComposition() {
        AlertIOS.alert(
            'Delete this composition?',
            null,
            [
                {text: 'Cancel', onPress: () => console.log('Deleting Cancelled')},
                {
                    text: 'Yes',
                    onPress: () => {
                        store.delete(this.state.item).then(data => {
                            this.props.navigator.pop();
                        });
                    },
                    style: 'destructive'
                }
            ]
        );
    }

    render() {
        return (
            <View style={styles.listitem}>
                <TouchableHighlight underlayColor="#CDCDCD" onPress={this._onForward}>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.itemname}>{this.state.item}</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    listitem: {
        flex: 1,
        borderBottomColor: '#CDCDCD',
        borderBottomWidth:  1 / PixelRatio.get(),
    },
    itemname: {
        color: '#333333',
        padding: 15,
    },
    yes: {
        color: 'red',
    }
});

export default ListItem;

