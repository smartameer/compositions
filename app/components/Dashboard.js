import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    ListView,
    View
} from 'react-native';
import ListItem from './ListItem.js';

class Dashboard extends Component {
    static propTypes = {
        title: PropTypes.string,
        navigator: PropTypes.object.isRequired,
    }

    constructor(props, context) {
        super(props, context);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            compositions: ds.cloneWithRows([
                'Notes 1',
                'Notes 2',
                'Notes 3',
                'Notes 4',
                'Notes 5 is always About my love of life who left me at road',
                'Notes 2',
                'Notes 3',
                'Notes 5 is always About my love of life who left me at road',
            ])
        };
    }
    render() {
        return (
            <View style={styles.container}>
                <ListView
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

