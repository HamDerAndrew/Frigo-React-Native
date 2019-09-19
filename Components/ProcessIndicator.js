import React, { Component } from 'react';
import { View, Text, Button, Modal, Animated, StyleSheet } from 'react-native';

class ProcessIndicator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: new Animated.Value(0),
        };
        
        this.spinProcess();
    }

    spinProcess = () => {
        Animated.timing(this.state.animation, {
            toValue: 1800,
            duration: 3500
        }).start();
    }

    closeModal = () => {
        return false;
    }

    render() {
        
        const rotateInterpolate = this.state.animation.interpolate({
            inputRange: [0, 360],
            outputRange: ['0deg', '360deg'],
        })
    
        const animationStyle = {
            transform: [
                {
                    rotate: rotateInterpolate
                }
            ]
        }

        return(
            <Modal animationType="fade">
                <View style={modalStyle.modalWrapper}>
                    <Animated.Image source={ require('../assets/icons/process1.png') } style={[modalStyle.animatedImg, animationStyle]} resizeMode={'contain'} />
                    <View style={modalStyle.processContainer}>
                        <Text  style={modalStyle.processTxt}>Processing...</Text>
                        {/* <Button color="red" title="Luk modal" onPress={this.props.closeModal} /> */}
                    </View>
                </View>
            </Modal>
        );
    }
}

const modalStyle = StyleSheet.create({
    modalWrapper: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#1B3ACA'
    },
    animatedImg: {
        width: '100%', 
        height: '10%'
    },
    processContainer: {
        flex: .3,
        paddingTop: 30
    },
    processTxt: {
        fontSize: 30,
        color: 'white'
    }
});

export default ProcessIndicator;