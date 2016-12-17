import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    NavigatorIOS,
    View
} from 'react-native';
import Dashboard from './components/Dashboard.js';
import Composition from './components/Composition.js';
import Settings from './components/Settings.js';

class Compositions extends Component {
    static propTypes = {
        title: PropTypes.string,
        navigator: PropTypes.object.isRequired,
    }

    constructor(props, context) {
        super(props, context);
        this._newComposition = this._newComposition.bind(this);
        this._settingsPage = this._settingsPage.bind(this);
    }

    _newComposition() {
        this.refs.nav.push({
            title: 'Untitled',
            component: Composition
        });
    }

    _settingsPage() {
        this.refs.nav.push({
            title: 'Settings',
            component: Settings
        });
    }

    render() {
        return (
            <NavigatorIOS
                ref="nav"
                initialRoute={{
                    component: Dashboard,
                    title: 'Compositions',
                    leftButtonTitle: 'New',
                    onLeftButtonPress: this._newComposition,
                    rightButtonTitle: 'Settings',
                    onRightButtonPress: this._settingsPage
                }}
                style={styles.container}
                />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default Compositions;

