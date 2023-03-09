import React from "react";
import { View, Text, Platform } from "react-native";
import BaseTemplate from "../../templates/baseTemplate";
import { useRouter } from "next/router";
import { Link, useRouting } from "expo-next-react-navigation";

var profileThis;
export default class Products extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      routeName: null,
    };
    profileThis = this;
  }

  componentDidMount() {
    this.setState(
      {
        routeName:
          Platform.OS == "web"
            ? routeName
            : this.props.navigation.state.routeName,
      },
      () => {
        // console.log(homeClassThis.state.routeName)
      }
    );
  }

  render() {
    return (
      <>
        <GetRouterName />
        <BaseTemplate routeName={this.state.routeName}>
          <View>
            <Text>محصولات</Text>
            <Text>محصولات</Text>
            <Text>محصولات</Text>
            <Text>محصولات</Text>
            <Text>محصولات</Text>
            <Text>محصولات</Text>
            <Text>محصولات</Text>
            <Text>محصولات</Text>
            <Text>محصولات</Text>
          </View>
        </BaseTemplate>
      </>
    );
  }
}

var routeName = "";
function GetRouterName() {
  const router = useRouter();
  const { getParam } = useRouting()

  if (Platform.OS == "web") {
    routeName = router.pathname;
    //console.log("GetRouterName -> router", router);
    routeName = routeName.split("/")[1];

    routeName == "" ? (routeName = "home") : routeName;
  } else {
    //console.log(getParam("product"), getParam("name"), getParam("state"), getParam("city"), getParam("filter"))
  }

  return <></>;
}
