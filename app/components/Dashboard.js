import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    ListView,
    View,
    Text
} from 'react-native';
import ListItem from './ListItem.js';
import store from 'react-native-simple-store';

class Dashboard extends Component {
    static propTypes = {
        title: PropTypes.string,
        navigator: PropTypes.object.isRequired,
    }

    constructor(props, context) {
        super(props, context);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            compositions: ds.cloneWithRows([])
        };
        this._loadList = this._loadList.bind(this);
    }

    _loadList() {
        store.keys().then(keys => {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                compositions: ds.cloneWithRows(keys),
            });
        });
    }

    componentDidMount() {
        this._loadList();
    }

    render() {
        //@TODO - find a neat solution to trigger update on deletion or new composition creation
        this._loadList();
        return (
            <View style={styles.container}>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.compositions}
                    renderRow={(rowData) => <ListItem {...this.props} item={rowData}></ListItem>}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default Dashboard;

