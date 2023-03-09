import React from 'react'
import { View, Text, Platform } from 'react-native'
import BaseTemplate from '../../templates/baseTemplate'
import { useRouter } from 'next/router'

var advertisementThis;
export default class Advertisement extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = { 
                        routeName: null,
                     };
                     advertisementThis = this
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
                        <Text>ثبت آگ1هی</Text>
                        <Text>ثبت آگهی</Text>
                        <Text>ثبت آگهی</Text>
                        <Text>ثبت آگهی</Text>
                        <Text>ثبت آگهی</Text>
                        <Text>ثبت آگهی</Text>
                        <Text>ثبت آگهی</Text>
                        <Text>ثبت آگهی</Text>
                        <Text>ثبت آگهی</Text>
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