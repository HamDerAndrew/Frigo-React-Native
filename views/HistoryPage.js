import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

class HistoryPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shopStory: []
        };
        this.getShopHistory();
        console.log(this.props.contentItems);
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
            const reversePeriods = periods.reverse();
            this.setState({shopStory: reversePeriods})
        })
        .catch(error => console.log(error))
    }

    reverseDate = (dateInput) => {
        if(dateInput.length >= 11) {
            const cutDate = dateInput.substr(0,10);
            const splitDate = cutDate.split('-');
            const reverseDate = splitDate.reverse();
            const rejoinDate = reverseDate.join('-');
            return rejoinDate;
        }
        const splitDate = dateInput.split('-');
        const reverseIt = splitDate.reverse();
        const joinDate = reverseIt.join('-');
        return joinDate;
    }

    getTitle = (content_item_id) => {
        //get products from global Redux Store
        const content = this.props.contentItems;
        /*
        find the id of the product in Redux Store.
        return the title of the product if it matches the id(content_item_id) in the purchase history(shopStory) 
        */

        const item = content.find( (element) => {
            if(content_item_id === element.id.toString()) {
                return true;
            }
        });

        return !!item ? item.title : "N/A"
    }

    renderHistoryList = data => {
        const itemObjectList = [];
        const products = this.props.contentItems;
        const theItems = {};
        data.item.items.forEach(element => {
            const itemId = element.content_item_id;
            const itemName = this.getTitle(itemId.toString());
            const itemPrice = element.price;
            //console.log(itemName);
            if(theItems.hasOwnProperty(itemName)) {
                theItems[itemName] += 1;
            } else {
                theItems[itemName] = 1;
            }
        });
        itemObjectList.push(theItems);
        //console.log(itemObjectList);
        const mapListJs = itemObjectList.map(item =>
            <View style={{flexDirection: 'row'}}>
                <View style={{flexDirection: 'column'}}>
                    {Object.values(item).map(val =>
                        <Text style={{fontSize: 16, color: '#031BD1', fontFamily: 'nunitoregular'}}>{val}x </Text>    
                    )}
                </View>
                <View style={{flexDirection: 'column'}}>
                    {Object.getOwnPropertyNames(item).map( title =>
                        (<Text style={{fontSize: 16, color: '#031BD1', fontFamily: 'nunitoregular'}}>{title}</Text>)
                    )}
                    </View>
            </View> 
        );
        return (
            <View style={historyStyle.periodContainer}>
                <View style={{margin: 10}}>
                    {data.item.period.current ? <Text style={{color: '#101B6F', fontSize: 18}}>Nuværende</Text> : null}
                    <Text style={{fontSize: 18, color: '#101B6F', fontFamily: 'nunitobold'}}>Periode: {this.reverseDate(data.item.period.from)}  -  {this.reverseDate(data.item.period.to)}</Text>
                    {mapListJs}
                </View>
                <View style={{backgroundColor: '#FAFBFB', paddingLeft: 10, paddingRight: 10, paddingBottom: 5, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                    <Text style={{fontSize: 18, color: '#101B6F', fontFamily: 'nunitobold'}}>Total: {(parseFloat(data.item.sum).toFixed(2) / 100)}kr.</Text>
                </View>
            </View>
        );
    }

    render() {
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

const historyStyle = StyleSheet.create({
    periodContainer: {
        backgroundColor: 'white', 
        borderRadius: 10,
        width:'90%', 
        alignSelf: 'center', 
        marginTop: 10, 
        marginBottom: 10, 
        shadowColor: 'black',
        shadowOffset: {width:1, height: 2},
        shadowOpacity: .3,
        shadowRadius: 5,
        elevation: 5,
    }
})

const mapStateToProps = (state) => {
    return {
      loggedIn: state.loggedIn,
      userToken: state.userToken,
      contentItems: state.contentItems
    }
  };

export default connect(mapStateToProps)(HistoryPage);
