import React, { Component } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

class HistoryList extends Component {
    render() {
        return(
            <View style={this.props.historyContainer}>
                <Text>{this.props.HistoryText}</Text>
            </View>
        );
    }
}

export default HistoryList;