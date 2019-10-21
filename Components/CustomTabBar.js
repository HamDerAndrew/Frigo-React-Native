import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform } from "react-native";
import posed from "react-native-pose";
import Svg, { G, Path } from 'react-native-svg';

const windowWidth = Dimensions.get("window").width;
const tabWidth = windowWidth / 2;
const SpotLight = posed.View({
  route0: { x: 0 },
  route1: { x: tabWidth },
  route2: { x: tabWidth * 2 },
  route3: { x: tabWidth * 3 },
});

const S = StyleSheet.create({
  container: { 
    flexDirection: "row", 
    height: 70, 
  },
  tabButton: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  activeC: {
    color: 'white',
    fontSize: 18
  },
  inactiveC: {
    color: 'black',
    fontSize: 18
  }
});

const TabBar = props => {
    const {
        getLabelText,
        activeTintColor,
        inactiveTintColor,
        onTabPress,
        onTabLongPress,
        getAccessibilityLabel,
        navigation
      } = props;

      const { routes, index: activeRouteIndex } = navigation.state;

  return (
    <View style={S.container}>
        <View style={StyleSheet.absoluteFillObject}>
          <SpotLight pose={`route${activeRouteIndex}`}>
            { activeRouteIndex === 0  ?
              <Svg width={tabWidth} height="85" viewBox="0 0 201 85" >
            <G id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <G id="Products" transform="translate(0.000000, -727.000000)" fill="#031BD1">
                  <G id="Group-6" transform="translate(0.000000, 727.000000)">
                      <Path d="M38.4640827,144 C76.0756554,144 127.042188,145.291787 153.331156,123.239388 C168.480314,110.531574 170,82.9125278 170,61.2075211 C170,1.83691053 97.7495263,-71 38.4640827,-71 C-20.8213609,-71 -20.8213609,144 38.4640827,144 Z" id="Oval-Copy" transform="translate(82.000000, 36.507103) scale(-1, 1) rotate(-60.000000) translate(-82.000000, -36.507103) "></Path>
                  </G>
              </G>
            </G>
          </Svg>
          :
          <Svg width={tabWidth} height="85" viewBox="0 0 194 85" >
            <G id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <G id="History-1" transform="translate(-181.000000, -727.000000)" fill="#031BD1">
                  <G id="Group-6" transform="translate(0.000000, 727.000000)">
                      <Path d="M256.464083,144 C294.075655,144 345.042188,145.291787 371.331156,123.239388 C386.480314,110.531574 388,82.9125278 388,61.2075211 C388,1.83691053 315.749526,-71 256.464083,-71 C197.178639,-71 197.178639,144 256.464083,144 Z" id="Oval-Copy" transform="translate(300.000000, 36.507103) rotate(-60.000000) translate(-300.000000, -36.507103) "></Path>
                  </G>
              </G>
            </G>
          </Svg>
            }
          </SpotLight>
        </View>
    {routes.map((route, routeIndex) => {
      const isRouteActive = routeIndex === activeRouteIndex;

      return (
        <TouchableOpacity
          key={routeIndex}
          style={S.tabButton}
          onPress={() => {
            onTabPress({ route });
          }}
          onLongPress={() => {
            onTabLongPress({ route });
          }}
          accessibilityLabel={getAccessibilityLabel({ route })}
        >
          <Text style={[routeIndex === activeRouteIndex ? S.activeC : S.inactiveC]}>{getLabelText( {route} )}</Text>
        </TouchableOpacity>
      );
    })}
  </View>
  );
};

export default TabBar;