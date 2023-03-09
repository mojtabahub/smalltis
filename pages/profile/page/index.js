import React from 'react'
import { View, Text, Platform } from 'react-native'
import BaseTemplate from '../../templates/baseTemplate'
import { useRouter } from 'next/router'
import { Link, useRouting } from "expo-next-react-navigation";

var profileThis;
export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { 
                        routeName: null,
                     };
                     profileThis = this
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
                        <Text>پروفای1ل</Text>
                        <Text>پروفایل</Text>
                        <Text>پروفایل</Text>
                        <Text>پروفایل</Text>
                        <Text>پروفایل</Text>
                        <Text>پروفایل</Text>
                        <Text>پروفایل</Text>
                        <Text>پروفایل</Text>
                        <Text>پروفایل</Text>
                    </View>
                </BaseTemplate>
            </>
        )
    }
}

var routeName = ""
function GetRouterName() {
    const router = useRouter()
    const { getParam } = useRouting()
    
    if (Platform.OS == 'web') {
        routeName = router.pathname
        routeName = routeName.split("/")[1]
    
        routeName == "" ? routeName = "home" : routeName
    } else {
        alert(getParam("state"))
    }

    return (<></>);
}