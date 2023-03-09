import React from 'react'
/* import MikhakMedium from '../assets/fonts/Mikhak-Medium.ttf';
import EstedadMedium from '../assets/fonts/Estedad-Medium.ttf';
import * as Font from "expo-font";

export default loadFonts = async(afterLoadFunc) => {
    try {
        await Font.loadAsync({
            MikhakMedium: {
                uri: MikhakMedium,
            },
            EstedadMedium: {
                uri: EstedadMedium,
            },
        }).then((result) => {
            //console.log("Fonts Loaded");
            afterLoadFunc("true")
        })
  
    } catch (error) {
        //alert(error);
        afterLoadFunc(error)
    }
} */

export default class LoadFonts extends React.Component {
    render() {
        return (<></>)
    }
}