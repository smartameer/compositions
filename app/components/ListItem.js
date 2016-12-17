import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    PixelRatio,
    TouchableHighlight,
    Text,
    View
} from 'react-native';
import Composition from './Composition.js';

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
    }

    _onForward() {
        this.props.navigator.push({
            title: this.state.item,
            component: Composition
        });
    }

    render() {
        return (
            <View style={styles.listitem}>
                <TouchableHighlight onPress={this._onForward}>
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
});

export default ListItem;

