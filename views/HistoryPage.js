import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import HistoryComponent from '../Components/HistoryComponent';

class HistoryPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shopStory: [],
            shopStoryItems: []
        };
        this.getShopHistory();
    }

    getShopHistory = () => {
        const url = 'https://staging.appcms.dk/api/cX8hvUC6GEKGgUuvzsBCNA/zenegy/purchases';
        const cmsHeader = { 
            'Content-Type': 'application/json', 
            //'Authorization': `Bearer ${this.props.userToken}` 
          };
        //Using axios default headers because the header object will not be sent otherwise(bug?).
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.props.userToken}`
        axios.get(url, cmsHeader)
        .then((res) => {
            const periods = res.data.periods;
            this.setState({shopStory: periods})
        })
        .catch(error => console.log(error))
    }

    reverseDate = (dateInput) => {
        if(dateInput.length >= 11) {
            const cutDate = dateInput.substr(0,10);
            const splitDate = cutDate.split('-');
            const reverseDate = splitDate.reverse();
            const rejoinDate = reverseDate.join('-')
            return rejoinDate;
        }
        const splitDate = dateInput.split('-');
        const reverseIt = splitDate.reverse();
        const joinDate = reverseIt.join('-');
        return joinDate;
    }

    renderHistoryList = data => {
        return (
            <View style={{backgroundColor: 'white', borderRadius: 10, width:'90%', alignSelf: 'center', marginTop: 10, marginBottom: 10, padding: 10}}>
                <Text style={{fontSize: 18, color: '#0F1C6F'}}>PERIODE: {this.reverseDate(data.item.period.from)}  -  {this.reverseDate(data.item.period.to)}</Text>
                {/* data.item.period.current ? <Text>nuværende</Text> : null */}
                <Text style={{fontSize: 18, color: '#7C7C7C'}}>Total: {(parseFloat(data.item.sum).toFixed(2) / 100)}kr.</Text>
                <FlatList style={{flex: 1}} 
                data={data.item.items} 
                keyExtractor={ (item) => item.id.toString()}
                extraData={data.item.items}
                initialNumToRender={8}
                renderItem={({item}) => 
                <View style={{backgroundColor: 'white', flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text>Købt d.{this.reverseDate(item.created_at)}</Text>
                    <Text>Beløb: {item.price} </Text>
                </View>
                } />
            </View>
        );
    }



    render() {
        //console.log("CURRENT SHOPSTORYITEMS STATE: ", this.state.shopStory[0])
        return (
            <View style={{ flex: 1, backgroundColor: '#EFF2F5' }}>
            <FlatList style={{flex: 1}}
            data={this.state.shopStory}
            extraData={this.state.shopStory}
            keyExtractor={(shopStory) => shopStory.period.from}
            renderItem={item => this.renderHistoryList(item)}
            />
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      loggedIn: state.loggedIn,
      userToken: state.userToken
    }
  };

export default connect(mapStateToProps)(HistoryPage);
