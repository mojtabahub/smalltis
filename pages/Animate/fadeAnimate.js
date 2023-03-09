import React from 'react'
import { Animated } from 'react-native'

export function startFade() {
  slideLeftClassThis.setState({displayFade: "flex"});
  
  return Animated.timing(slideLeftClassThis.state.fadeValue, {
    toValue: 1,
    duration: 800,
    useNativeDriver: true
  }).start();
};

export function stopFade() {
  return Animated.timing(slideLeftClassThis.state.fadeValue, {
    toValue: 0,
    duration: 800,
    useNativeDriver: true
  }).start(function() { 
    slideLeftClassThis.setState({displayFade: "none"});
  });
};

var slideLeftClassThis = null;
export default class FadeAnim extends React.Component {
  constructor(props) {
    super(props);
    this.state =  { 
                    fadeValue: new Animated.Value(0),
                    fadeValueFade: new Animated.Value(0),
                    displayFade : "none",
                  }
    slideLeftClassThis = this;
  }

  componentDidMount() {
    
  }

  render() {
    let { fadeValue, fadeValueFade, displayFade } = this.state;
    return (
      
      <>
        <Animated.View
            style={{
              opacity: fadeValue,
              display: displayFade,
            }}
        >
            {this.props.children}
        </Animated.View>
      </>
    )
  }
}