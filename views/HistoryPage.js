import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';

class HistoryPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            shopStory: [],
            loading: true
        };
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
            this.setState({shopStory: reversePeriods, loading: false})
        })
        .catch(error => {
            this.setState({loading: false})
            console.log(error);
        });
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
            <View style={historyStyle.receiptBodyOuter} key={index}>
                <View style={historyStyle.receiptLeftContainer}>
                    <View style={historyStyle.receiptBodyInner}>
                        {Object.values(item).map((amount, index) => {
                            return (
                            <Text style={historyStyle.regularText} key={index}>{amount}x </Text>
                            )    
                        })}
                    </View>
                    <View style={historyStyle.receiptBodyInner}>
                        {Object.getOwnPropertyNames(item).map( (title, index) =>
                            (<Text style={historyStyle.regularText} key={index}>{title}</Text>)
                        )}
                    </View>
                </View>
                <View style={historyStyle.receiptBodyInner}>
                    {Object.entries(item).map(([key, value], index) => {
                            let productPrice = 0;
                            products.map((product) => {
                                if(product.title === key) {
                                    productPrice = product.price * value;
                                }
                            });
                            return (<Text style={[historyStyle.regularText, {textAlign: 'right'}]} key={index}>{(parseFloat(productPrice).toFixed(2) / 100)} kr.</Text>)
                        })}
                </View>
            </View> 
        );

        return (
            <View style={historyStyle.periodContainer}>
                <View style={{margin: 10}}>
                    {data.item.period.current ? <Text style={historyStyle.boldText}>Nuværende</Text> : null}
                    <Text style={historyStyle.receiptHeader}>Periode: {this.reverseDate(data.item.period.from)}  -  {this.reverseDate(data.item.period.to)}</Text>
                    {mapListJs}
                </View>
                <View style={historyStyle.receiptFooter}>
                    <Text style={historyStyle.boldText}>TOTAL</Text>
                    <Text style={historyStyle.boldText}>{(parseFloat(data.item.sum).toFixed(2) / 100)}kr.</Text>
                </View>
            </View>
        );
    }

    
    render() {
        if(this.state.loading === true) {
            return (
                <View style={historyStyle.noDataPage}>
                    <ActivityIndicator size="large" />
                </View>
            )
        }
        if(this.state.shopStory.length <= 0) {
            return(
                <View style={history.noDataPage}>
                    <Text style={historyStyle.regularText}>Ingen køb foretaget.</Text>
                </View>
            );
        } else {
            return (
                <View style={historyStyle.container}>
                    <FlatList style={historyStyle.historyList}
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
    container: {
        flex: 1, 
        backgroundColor: '#EFF2F5'
    },
    noDataPage: {
        flex: 1, 
        backgroundColor: '#EFF2F5', 
        alignContent: 'center', 
        justifyContent: 'center'
    },
    historyList: {
        flex: 1
    },
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
    },
    receiptHeader: {
        fontSize: 18, 
        color: '#101B6F', 
        fontFamily: 'nunitobold', 
        paddingTop: 15, 
        paddingBottom: 5
    },
    receiptBodyOuter: {
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    receiptLeftContainer: {
        flexDirection: 'row', 
    },
    receiptBodyInner: {
        flexDirection: 'column', 
        marginTop: 5, 
        marginBottom: 5
    },
    receiptFooter: {
        backgroundColor: '#FAFBFB', 
        flexDirection:'row', 
        justifyContent:'space-between', 
        paddingLeft: 10, 
        paddingRight: 10, 
        paddingBottom: 15, 
        paddingTop: 15, 
        borderBottomLeftRadius: 10, 
        borderBottomRightRadius: 10
    },
    boldText: {
        fontSize: 18, 
        color: '#101B6F', 
        fontFamily: 'nunitobold'
    },
    regularText: {
        fontSize: 16, 
        color: '#031BD1', 
        fontFamily: 'nunitoregular', 
        marginTop: 5, 
        marginBottom: 5
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
