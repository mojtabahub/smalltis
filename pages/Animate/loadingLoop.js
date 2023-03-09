

import React from 'react'
import { View, Text, ScrollView, Platform, Dimensions, StyleSheet, Animated, TouchableOpacity } from 'react-native'
import { colorPrimary, colorGray } from '../connection/color'

export default class LoadingLoop extends React.Component {
    state = {
      rotateValue: new Animated.Value(0)
    };
  
    componentDidMount() {
      this._start();
    }
    _start = () => {
      Animated.loop(
        Animated.timing(this.state.rotateValue, {
          toValue: 1,
          duration: 400,
          Infinite: true,
          useNativeDriver: true,
        })
      ).start();
    };
  
    render() {
      return (
        <View style={stylesLoopAnim.container}>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: this.state.rotateValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "380deg"]
                  })
                }
              ],
              height: 150,
              width: 150,
              margin: 5,
              borderWidth: 3,
              borderColor: 'rgba(1, 1, 1, 0.1)',
              borderBottomColor: colorPrimary,
              borderRadius: 150,
              justifyContent: "center"
            }}
          />
  
          <Text style={[stylesLoopAnim.text, {paddingTop: 10}]}></Text>
          <Animated.View />
        </View>
      );
    }
}
  
const stylesLoopAnim = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center"
},
text: {
    fontSize: 20,
    color: colorPrimary,
    fontWeight: "bold",
    textAlign: "center"
},

});