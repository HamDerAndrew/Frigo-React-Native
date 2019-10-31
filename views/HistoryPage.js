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
        //console.log(this.props.contentItems);
    }

    componentDidMount() {
        this.getShopHistory();
    }

    getShopHistory = () => {
        const url = 'https://staging.appcms.dk/api/cX8hvUC6GEKGgUuvzsBCNA/zenegy/purchases';
        const cmsHeader = { 
            'Content-Type': 'application/json', 
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

            if(theItems.hasOwnProperty(itemName)) {
                theItems[itemName] += 1;
            } else {
                theItems[itemName] = 1;
            }
        });
        itemObjectList.push(theItems);

        const mapListJs = itemObjectList.map((item, index) =>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}} key={index}>

                <View style={{flexDirection: 'row'}}>
                    <View style={{flexDirection: 'column', marginTop: 5, marginBottom: 5}}>
                        {Object.values(item).map((amount, index) => {
                            return (
                            <Text style={{fontSize: 16, color: '#031BD1', fontFamily: 'nunitoregular', marginTop: 5, marginBottom: 5}} key={index}>{amount}x </Text>
                            )    
                        })}
                    </View>
                    <View style={{flexDirection: 'column', marginTop: 5, marginBottom: 5}}>
                        {Object.getOwnPropertyNames(item).map( (title, index) =>
                            (<Text style={{fontSize: 16, color: '#031BD1', fontFamily: 'nunitoregular', marginTop: 5, marginBottom: 5}} key={index}>{title}</Text>)
                        )}
                    </View>
                </View>

                <View style={{flexDirection: 'column', marginTop: 5, marginBottom: 5}}>
                    {Object.entries(item).map(([key, value], index) => {
                            //console.log(key, value);
                            let productPrice = 0;
                            products.map((product) => {
                                if(product.title === key) {
                                    productPrice = product.price * value;
                                    //console.log(Possible);
                                }
                            });
                            return (<Text style={{fontSize: 16, color: '#031BD1', textAlign: 'right', fontFamily: 'nunitoregular', marginTop: 5, marginBottom: 5}} key={index}>{(parseFloat(productPrice).toFixed(2) / 100)} kr.</Text>)
                        })}
                    {/* Object.getOwnPropertyNames(item).map( (title, index) => {
                        //console.log( Object.entries(item))
                        let productPrice = 0;
                        let totalSum = 0;
                        products.map( (product) => {
                            if(product.title === title) {
                                productPrice = product.price;
                            }
                        })
                        Object.values(item).map(totalAmount => {
                            //console.log("totalAmount:", totalAmount)
                            return totalSum += totalAmount;
                        })
                        return (<Text style={{fontSize: 16, color: '#031BD1', textAlign: 'right', fontFamily: 'nunitoregular', marginTop: 5, marginBottom: 5}} key={index}>{(parseFloat().toFixed(2) / 100)} kr.</Text>)
                    }) */}
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
                <View style={{backgroundColor: '#FAFBFB', flexDirection:'row', justifyContent:'space-around', paddingLeft: 10, paddingRight: 10, paddingBottom: 5, borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                    <Text style={{fontSize: 18, color: '#101B6F', fontFamily: 'nunitobold'}}>TOTAL</Text>
                    <Text style={{fontSize: 18, color: '#101B6F', fontFamily: 'nunitobold'}}>{(parseFloat(data.item.sum).toFixed(2) / 100)}kr.</Text>
                </View>
            </View>
        );
    }

    render() {
        if(this.state.shopStory.length <= 0) {
            return(
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{fontFamily: 'nunitoregular'}}>Ingen køb foretaget.</Text>
                </View>
            );
        } else {
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
