import React from 'react'
import { Animated } from 'react-native'


export function startSlideLeft() {
    slideLeftClassThis.setState({displaySlideLeft: "flex"});

    return Animated.parallel([
      Animated.timing(slideLeftClassThis.state.slideLeftValue, {
        toValue: 1,
        duration: slideLeftClassThis.props.animDuration,
        useNativeDriver: true
      }),
      Animated.timing(slideLeftClassThis.state.fadeValueSlideLeft, {
        toValue: 1,
        duration: slideLeftClassThis.props.animDuration,
        useNativeDriver: true
      }),
    ]).start();
  };

export function stopSlideLeft() {

    return Animated.parallel([
      Animated.timing(slideLeftClassThis.state.slideLeftValue, {
        toValue: 0,
        duration: slideLeftClassThis.props.animDuration,
        useNativeDriver: true
      }),
      Animated.timing(slideLeftClassThis.state.fadeValueSlideLeft, {
        toValue: 0,
        duration: slideLeftClassThis.props.animDuration,
        useNativeDriver: true
      }),
    ]).start(function() {
        
        slideLeftClassThis.setState({displaySlideLeft: "none"});
    });
  };

var slideLeftClassThis = null;
export default class SlideLeftAnim extends React.Component {
  constructor(props) {
    super(props);
    this.state =  { 
                    slideLeftValue: new Animated.Value(0),
                    fadeValueSlideLeft: new Animated.Value(0),
                    displaySlideLeft : "none",
                  }
    slideLeftClassThis = this;
  }



  

  componentDidMount() {
    
  }

  render() {
    let { slideLeftValue, fadeValueSlideLeft, displaySlideLeft } = this.state;
    return (
      
      <>
        <Animated.View
            style={{
              transform: [
                {
                  translateX: slideLeftValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-600, 0]
                  })
                }
              ],
              opacity: fadeValueSlideLeft,
              display: displaySlideLeft,
            }}
        >
            {this.props.children}
        </Animated.View>
      </>
    )
  }
}