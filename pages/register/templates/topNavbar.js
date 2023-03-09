import React from "react";
import {
  View,
  Text,
  Dimensions,
  Platform,
  Image,
  Button,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Keyboard,
} from "react-native";
import { sm, md, lg, xl, xxl } from "../../connection/screen_size";
import { pm1, pm2, pm3, pm4, pm5 } from "../../connection/gutter";
import { smalltisUrl } from "../../connection/base";
import {
  colorGray,
  colorPrimary,
  colorSecondary,
  colorWhite,
} from "../../connection/color";
import MyStyleFunc, { styles, styleRow } from "../../css/base_styles";
import { Link, useRouting } from "expo-next-react-navigation";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconMI from "react-native-vector-icons/MaterialIcons";
import { StatusBarHeight } from "../../calc/statusBarHeight";
import {
  getTableAllData,
  getTablesColumnName,
  addTableAllDataToEval,
} from "../../scripts/share";

var isNavOptionOpened = false;
var TopNavbarClassThis;
var thispis;
export default class TopNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      outContainer: 0,
      Container: 0,
      rightNav: 0,
      middleNav: 0,
      leftNav: 0,
      searchBarPos: "relative",
      searchbarHeigh: 42,
      searchBarShadow: false,
      searchBarBorderColor: "rgb(200, 200, 200)",
      searchBarBorderStyle: "solid",
      searchAreaDisplay: false,
      backdropSearchBarDisplay: false,
      showListMahsol: false,
      middleOfNavDisplay: true,
      barIconDisplay: false,
      smalltisNavLogoDiplay: true,
      navItemsDispaly: true,
      navOptionsDisplay: "none",
      navOptionsDropDisplay: false,
      isSideNaveShow: false,
    };

    TopNavbarClassThis = this;
  }

  componentDidMount() {
    //console.log(this.props.route.name)

    if (Platform.OS == "web") window.addEventListener("resize", handleResize);
    bootstrapNavbar();
  }

  hideBackdrop = () => {
    this.setState(
      {
        searchbarHeigh: 42,
        searchBarPos: "relative",
        searchBarShadow: false,
        searchAreaDisplay: false,
        backdropSearchBarDisplay: false,
        navOptionsDropDisplay: false,
      },
      () => {
        isNavOptionOpened = false;
      }
    );
    this.refs["email_input"].blur();
  };

  render() {
    return (
      <>
        {this.props.fontLoaded ? (
          <>
            <View
              style={{
                height: StatusBarHeight,
                backgroundColor: "rgba(50, 50, 50, 0.2)",
              }}
            ></View>
            {this.state.backdropSearchBarDisplay ? (
              <TouchableOpacity
                style={[
                  {
                    alignSelf: "center",
                    flex: 9,
                    left: 0,
                    top: 0,
                    zIndex: 1,
                    height: Dimensions.get("window").height,
                    width: Dimensions.get("window").width,
                    backgroundColor: "rgba(52, 52, 52, 0.8)",
                  },
                  styles.postionFixed,
                ]}
                onPress={() => this.hideBackdrop()}
              />
            ) : (
              <></>
            )}

            <View
              style={[
                {
                  zIndex: 1000,
                  position: "relative",
                  /* backgroundColor: "white", */
                },
                styles.headerWebStyle,
              ]}
              onStartShouldSetResponder={() =>
                this.setState({
                  showListMahsol: false,
                })
              }
            >
              <View
                style={[{ flexDirection: "row" }, styles.headerShadowRegister]}
              >
                <View style={{ flex: this.state.outContainer }} />
                <View style={{ width: this.state.Container }}>
                  <View style={{ flexDirection: "row-reverse" }}>
                    <View
                      style={{
                        flex: this.state.rightNav,
                        height: 74,
                        alignItems: "flex-end",
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row-reverse",
                          width: "100%",
                          /* backgroundColor: "white", */
                        }}
                      >
                        {this.state.smalltisNavLogoDiplay ? (
                          <Link web={{ as: "/", path: "/" }} routeName="home">
                            <View
                              style={{
                                flexDirection: "row-reverse",
                                paddingTop: pm3,
                                paddingRight: pm2,
                              }}
                            >
                              <Image
                                resizeMode="contain"
                                source={{
                                  uri:
                                    smalltisUrl +
                                    "/image/logo/logo-st.png",
                                }}
                                style={{
                                  width: 53,
                                  height: 53,
                                  marginTop: -pm2,
                                }}
                              />
                              <Text
                                style={[
                                  {
                                    height: 50,
                                    padding: pm2,
                                    paddingTop: pm1,
                                    fontSize: 15,
                                    color: colorPrimary,
                                  },
                                  styles.fontFa,
                                ]}
                              >
                                اسمالتیس
                              </Text>
                            </View>
                          </Link>
                        ) : (
                          <></>
                        )}
                      </View>
                    </View>
                    <View
                      style={{
                        flex: this.state.leftNav,
                        /* backgroundColor: 'steelblue' */
                      }}
                    >
                      <View
                        style={[
                          {
                            marginTop: pm3,
                            paddingRight: pm1,
                            borderColor: this.state.searchBarBorderColor,
                            borderWidth: 1,
                            position: this.state.searchBarPos,
                            paddingHorizontal: pm4,
                            borderRadius: 25,
                            backgroundColor: "rgba(0, 0, 0, 0.4)",
                            marginHorizontal: pm4,
                            height: this.state.searchbarHeigh,
                            width: "90%",
                            borderStyle: this.state.searchBarBorderStyle,
                            zIndex: 20,
                          },
                          this.state.searchBarShadow
                            ? styles.zDepth1
                            : styles.zDepth0,
                        ]}
                        onMouseEnter={() => {
                          this.setState({
                            searchBarBorderColor: colorPrimary,
                            searchBarBorderStyle: "dashed",
                          });
                        }}
                        onMouseLeave={() => {
                          this.setState({
                            searchBarBorderColor: "rgb(200, 200, 200)",
                            searchBarBorderStyle: "solid",
                          });
                        }}
                      >
                        <View style={{ flexDirection: "row-reverse" }}>
                          <TextInput
                            style={[
                              {
                                flex: 15,
                                height: 42,
                                paddingRight: pm3,
                                textAlign: "right",
                                borderWidth: 0,
                                color: colorWhite,
                              },
                              styles.fontFa,
                              Platform.OS == "web" ? styles.removeOutline : 0,
                            ]}
                            placeholder="...جستجو کن"
                            ref="email_input"
                            onSubmitEditing={() =>
                              this.refs["email_input"].blur()
                            }
                            onFocus={() => {
                              this.setState({
                                searchbarHeigh: 300,
                                searchBarPos: "absolute",
                                searchBarShadow: true,
                                searchAreaDisplay: true,
                                backdropSearchBarDisplay: true,
                              });
                            }}
                          />
                          <Icon
                            style={{
                              flex: 1,
                              paddingRight: pm2,
                              paddingTop: 13,
                              color: colorSecondary,
                            }}
                            name="search"
                            size={15}
                          />
                        </View>
                        {this.state.searchAreaDisplay ? (
                          <View>
                            <View
                              style={{
                                borderBottomWidth: 1,
                                borderStyle: "dashed",
                                borderBottomWidth: 1,
                                height: 2,
                                width: "98%",
                                marginBottom: pm2,
                                borderColor: colorPrimary,
                              }}
                            />
                            <View>
                              <Text
                                style={[
                                  {
                                    padding: pm2,
                                    paddingVertical: pm1,
                                    textAlign: "right",
                                    fontSize: 14,
                                    color: colorWhite,
                                  },
                                  styles.fontFa,
                                ]}
                              >
                                سلام این پیام تستی منه
                              </Text>
                              <Text
                                style={[
                                  {
                                    padding: pm2,
                                    paddingVertical: pm1,
                                    textAlign: "right",
                                    fontSize: 14,
                                    color: colorWhite,
                                  },
                                  styles.fontFa,
                                ]}
                              >
                                سلام این پیام تستی منه
                              </Text>
                              <Text
                                style={[
                                  {
                                    padding: pm2,
                                    paddingVertical: pm1,
                                    textAlign: "right",
                                    fontSize: 14,
                                    color: colorWhite,
                                  },
                                  styles.fontFa,
                                ]}
                              >
                                سلام این پیام تستی منه
                              </Text>
                              <Text
                                style={[
                                  {
                                    padding: pm2,
                                    paddingVertical: pm1,
                                    textAlign: "right",
                                    fontSize: 14,
                                    color: colorWhite,
                                  },
                                  styles.fontFa,
                                ]}
                              >
                                سلام این پیام تستی منه
                              </Text>
                            </View>
                          </View>
                        ) : (
                          <></>
                        )}
                      </View>
                    </View>
                  </View>
                </View>
                <View style={{ flex: this.state.outContainer }} />
              </View>
            </View>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}

function handleResize() {
  bootstrapNavbar();
}

function bootstrapNavbar() {
  let screenWidth = Dimensions.get("window").width;
  if (screenWidth >= xxl) {
    //console.log("xxl")
    TopNavbarClassThis.setState({
      outContainer: 1,
      Container: 1320,
      rightNav: 4,
      middleNav: 3,
      leftNav: 5,
      showListMahsol: false,
      middleOfNavDisplay: true,
      barIconDisplay: false,
      smalltisNavLogoDiplay: true,
      navItemsDispaly: true,
      navOptionsDisplay: false,
    });
  }

  if (screenWidth >= xl && screenWidth < xxl) {
    //console.log("xl")
    TopNavbarClassThis.setState({
      outContainer: 1,
      Container: 1140,
      rightNav: 4,
      middleNav: 3,
      leftNav: 5,
      showListMahsol: false,
      middleOfNavDisplay: true,
      barIconDisplay: false,
      smalltisNavLogoDiplay: true,
      navItemsDispaly: false,
    });
  }

  if (screenWidth >= lg && screenWidth < xl) {
    //console.log("lg")
    TopNavbarClassThis.setState({
      outContainer: 1,
      Container: 960,
      rightNav: 4,
      middleNav: 3,
      leftNav: 5,
      showListMahsol: false,
      middleOfNavDisplay: true,
      barIconDisplay: false,
      smalltisNavLogoDiplay: true,
      navItemsDispaly: false,
      navOptionsDisplay: true,
    });
  }

  if (screenWidth >= md && screenWidth < lg) {
    //console.log("md")
    TopNavbarClassThis.setState({
      outContainer: 1,
      Container: "97%",
      rightNav: 2,
      middleNav: 4,
      leftNav: 10,
      showListMahsol: false,
      middleOfNavDisplay: false,
      barIconDisplay: true,
      smalltisNavLogoDiplay: true,
      navItemsDispaly: false,
      navOptionsDisplay: false,
    });
  }

  if (screenWidth >= sm && screenWidth < md) {
    //console.log("sm")
    TopNavbarClassThis.setState({
      outContainer: 1,
      Container: "97%",
      rightNav: 3,
      middleNav: 0,
      leftNav: 9,
      showListMahsol: false,
      middleOfNavDisplay: false,
      barIconDisplay: false,
      smalltisNavLogoDiplay: true,
      navItemsDispaly: false,
      navOptionsDisplay: false,
    });
  }

  if (screenWidth < sm) {
    //console.log("xsm")
    TopNavbarClassThis.setState({
      outContainer: 0,
      Container: "100%",
      rightNav: 5,
      middleNav: 0,
      leftNav: 7,
      showListMahsol: false,
      middleOfNavDisplay: false,
      barIconDisplay: false,
      smalltisNavLogoDiplay: true,
      navItemsDispaly: false,
      navOptionsDisplay: false,
    });
  }
}
