import React from "react";
import { View, Text, Platform, TextInput, Button, TouchableOpacity } from "react-native";
import BaseTemplate from "../../templates/baseTemplate";
import { useRouter } from "next/router";
import MyStyleFunc, { styles, styleRow } from "../../../css/base_styles";
import { colorWhite, colorPrimary, colorSecondary } from "../../../connection/color";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconFA from "react-native-vector-icons/FontAwesome";
import { Link, useRouting } from "expo-next-react-navigation";

var profileThis;
export default class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      routeName: null,
      ifsn: "page",
    };
    profileThis = this;
  }

  componentDidMount() {
    let fileSave = "";
    if (Platform.OS == "web") {
      if (window.location.href.indexOf("mahanalborz.com") >= 0 || window.location.href.indexOf("smalltis.com") >= 0 || window.location.href.indexOf("smalltis.ir") >= 0) {
        fileSave = "";
      } else {
        fileSave = "page";
      }
    }
    this.setState({ ifsn: fileSave });

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
          <View
            style={[
              { flex: 1, height: "100vh" },
              styles.justifyContentCenter,
              styles.alignItemsCenter,
            ]}
          >
            <RegistarBase ifsn={this.state.ifsn} />
          </View>
        </BaseTemplate>
      </>
    );
  }
}

var routeName = "";
function GetRouterName() {
  const router = useRouter();

  if (Platform.OS == "web") {
    routeName = router.pathname;
    routeName = routeName.split("/")[1];

    routeName == "" ? (routeName = "home") : routeName;
  }

  return <></>;
}

class RegistarBase extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <View>
          <View
            onMouseEnter={() => this.forceUpdate()}
            style={[
              {
                position: "relative",
                flexDirection: "row-reverse",
                marginTop: 20,
                zIndex: 100,
              },
            ]}
          >
            <View style={[styleRow.outContainer]} />
            <View style={[styleRow.containerRegTab, styles.mdTabs]}>
              <View
                style={[
                  { flex: 1, flexDirection: "row-reverse" },
                  styles.justifyContentCenter,
                  styles.mv4,
                ]}
              >
                <Icon
                  style={[{ color: colorWhite }, styles.pl3]}
                  name="user-alt"
                  size={30}
                />

                <Text
                  style={[
                    styles.textCenter,
                    { color: colorWhite },
                    styles.fontFa,
                    styles.font20,
                  ]}
                >
                  بازیابی رمزعبور
                </Text>
              </View>
            </View>
            <View style={[styleRow.outContainer]} />
          </View>

          <View
            onMouseEnter={() => this.forceUpdate()}
            style={[
              {
                position: "relative",
                flexDirection: "row-reverse",
                zIndex: 0,
              },
              styles.pv4,
            ]}
          >
            <View style={[styleRow.outContainer]} />
            <View style={[styleRow.containerReg]}>
              <View
                style={[styles.cardReg, styles.pv4, { flexDirection: "column" }]}
              >
                <View style={[styles.mv5]}>
                  <View style={{flexDirection: "row-reverse"}}>
                    <View style={[{width: '97%', marginHorizontal: 20}]}>
                      <Text style={[
                          {color: colorWhite}, 
                          styles.font11, 
                          styles.fontFa
                        ]}
                      >ایمیل جهت بازیابی رمزعبور</Text>
                      <TextInput
                        style={[
                          { height: 40, borderColor: 'gray',  borderBottomWidth:1, borderColor: colorWhite,  },
                          styles.fontFa,
                          styles.textWhite,
                          styles.ml4,
                          styles.textRight,
                          styles.removeOutline,
                        ]}
                      />
                    </View>
                  </View>
                </View>
                <TouchableOpacity
                  style={[styles.pv3, styles.mh4, styles.roundedPill, {backgroundColor: colorPrimary}]}
                >
                  <Text style={[styles.fontFa, styles.textCenter,{color: colorWhite}]}>ارسال ایمیل</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={[styleRow.outContainer]} />
          </View>
        </View>

      </>
    );
  }
}
