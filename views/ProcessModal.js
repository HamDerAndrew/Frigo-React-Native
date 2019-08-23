import React, { Component } from 'react';
import { View, Text, Modal, Button, Animated } from 'react-native';

class ProcessModal extends Component {
    state = {
        animation: new Animated.Value(0),
    };

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
            <Modal animationType="slide"
            /* onRequestClose={ () => this.setProcessVisible(false) } */
            visible={this.props.modalVisible}
            onShow={this.spinProcess}>
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#1B3ACA'}}>
                <Animated.Image source={ require('../assets/icons/process1.png') } style={[{width: '100%', height: '10%'}, animationStyle]} resizeMode={'contain'} />
                <View style={{flex: .3, paddingTop: 30}}>
                    <Text  style={{fontSize: 30, color: 'white'}}>Processing...</Text>
                    <Button color="red" title="Luk modal" onPress={this.props.closeModal} />
                </View>
            </View>
        </Modal>
        );
    }
}

export default ProcessModal;