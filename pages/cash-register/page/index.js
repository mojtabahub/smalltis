import React from 'react'
import { View, Text, Platform } from 'react-native'
import BaseTemplate from '../../templates/baseTemplate'
import { useRouter } from 'next/router'

var cashRegisterThis;
export default class CashRegister extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { 
                        routeName: null,
                     };
                     cashRegisterThis = this
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
                        <Text>صند1وق</Text>
                        <Text>صندوق</Text>
                        <Text>صندوق</Text>
                        <Text>صندوق</Text>
                        <Text>صندوق</Text>
                        <Text>صندوق</Text>
                        <Text>صندوق</Text>
                        <Text>صندوق</Text>
                        <Text>صندوق</Text>
                    </View>
                </BaseTemplate>
            </>
        )
    }
}

var routeName = ""
function GetRouterName() {
    const router = useRouter()
    
    if (Platform.OS == 'web') {
        routeName = router.pathname
        routeName = routeName.split("/")[1]
    
        routeName == "" ? routeName = "home" : routeName
    }

    return (<></>);
}