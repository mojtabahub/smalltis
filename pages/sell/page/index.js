import React from 'react'
import { View, Text, Platform } from 'react-native'
import BaseTemplate from '../../templates/baseTemplate'
import { useRouter } from 'next/router'

var sellClassThis;
export default class Sell extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { 
                        routeName: null,
                     };
                     sellClassThis = this
    }

    componentDidMount() { 
        this.setState({
            routeName: Platform.OS == 'web' ? routeName : this.props.navigation.state.routeName
        }, ()=> {
            // console.log(homeClassThis.state.routeName)
        })
    }

    render() {
        return (
            <>
                <GetRouterName />
                <BaseTemplate routeName={this.state.routeName}>
                    <View>
                        <Text>سبد خری1د</Text>
                        <Text>سبدخرید</Text>
                        <Text>سبدخرید</Text>
                        <Text>سبدخرید</Text>
                        <Text>سبدخرید</Text>
                        <Text>سبدخرید</Text>
                        <Text>سبدخرید</Text>
                        <Text>سبدخرید</Text>
                        <Text>سبدخرید</Text>
                    </View>
                </BaseTemplate>
            </>
        )
    }
}

var routeName = ""
function GetRouterName() {
    const router = useRouter()
    
    //console.log(router)
    //router.pathname = "/sell"
    console.log(router)
    if (Platform.OS == 'web') {
        routeName = router.pathname
        routeName = routeName.split("/")[1]
    
        routeName == "" ? routeName = "home" : routeName
    }

    return (<></>);
}