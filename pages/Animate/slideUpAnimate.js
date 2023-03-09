import React from 'react'
import { Animated } from 'react-native'

export function startSlideUp() {
    slideLeftClassThis.setState({displaySlideUp: "flex"});

    return Animated.parallel([
      Animated.timing(slideLeftClassThis.state.slideUpValue, {
        toValue: 1,
        duration: slideLeftClassThis.props.animDuration,
        useNativeDriver: true
      }),
      Animated.timing(slideLeftClassThis.state.fadeValueSlideUp, {
        toValue: 1,
        duration: slideLeftClassThis.props.animDuration,
        useNativeDriver: true
      }),
    ]).start();
  };

export function stopSlideUp() {

    return Animated.parallel([
      Animated.timing(slideLeftClassThis.state.slideUpValue, {
        toValue: 0,
        duration: slideLeftClassThis.props.animDuration,
        useNativeDriver: true
      }),
      Animated.timing(slideLeftClassThis.state.fadeValueSlideUp, {
        toValue: 0,
        duration: slideLeftClassThis.props.animDuration,
        useNativeDriver: true
      }),
    ]).start(function() {
        
        slideLeftClassThis.setState({displaySlideUp: "none"});
    });
  };

var slideLeftClassThis = null;
export default class SlideUpAnim extends React.Component {
  constructor(props) {
    super(props);
    this.state =  { 
                    slideUpValue: new Animated.Value(0),
                    fadeValueSlideUp: new Animated.Value(0),
                    displaySlideUp : "none",
                  }
    slideLeftClassThis = this;
  }

  componentDidMount() {
    
  }

  render() {
    let { slideUpValue, fadeValueSlideUp, displaySlideUp } = this.state;
    return (
      
      <>
        <Animated.View
            style={{
              transform: [
                {
                  translateY: slideUpValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [600, 0]
                  })
                }
              ],
              opacity: fadeValueSlideUp,
              display: displaySlideUp,
            }}
        >
            {this.props.children}
        </Animated.View>
      </>
    )
  }
}