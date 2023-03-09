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
import { indexFileName } from "../../connection/filesPath";
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

var footerBarThis;
export default class FooterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFooter: styles.dNone,
      widnowS: "",
    };
    footerBarThis = this;
  }

  componentDidMount() {
    //this.setState({})
    if (Platform.OS == "web") window.addEventListener("resize", handleResize);
    showFooterSetup();
    //console.log("page=" + this.props.page)
  }

  render() {
    return (
      <>
        {this.props.fontLoaded ? (
          <>
            {this.props.page != undefined &&
            this.props.page ==
              "advertisement" /* || (window.location != undefined && window.location.pathname.split("/")[1] == 'cash-register') */ ? (
              <></>
            ) : (
              <>
                <View
                  style={[
                    {
                      width: 53,
                      height: 53,
                      backgroundColor: colorSecondary,
                      borderRadius: 40,
                      bottom: 70,
                      right: 7,
                      justifyContent: "center",
                      alignItems: "center",
                    },
                    styles.postionFixed,
                    styles.zDepth1,
                    this.state.showFooter,
                  ]}
                >
                  <Link
                    web={{
                      as: "/advertisement/" + this.props.ifsn,
                      path: "/advertisement/" + this.props.ifsn,
                    }}
                    routeName="advertisement"
                  >
                    <Icon style={{ color: colorWhite }} name="plus" size={29} />
                  </Link>
                </View>
                <View
                  style={[
                    styles.footerBaseStyle,
                    styles.footerWebStyle,
                    styles.footerShadow,
                    this.state.showFooter,
                  ]}
                >
                  <View style={styles.footerFlexView}>
                    <Link
                      web={{
                        as: "/profile/" + this.props.ifsn,
                        path: "/profile/" + this.props.ifsn,
                      }}
                      routeName="profile"
                      style={{ padding: 20 }}
                    >
                      {this.props.page != undefined &&
                      this.props.page == "profile" ? (
                        <Icon
                          style={{
                            paddingTop: pm2,
                            paddingRight: pm2,
                            color: colorPrimary,
                          }}
                          name="user-circle"
                          size={20}
                        />
                      ) : (
                        <Icon
                          style={{
                            paddingTop: pm2,
                            paddingRight: pm2,
                            color: colorGray,
                          }}
                          name="user-circle"
                          size={20}
                        />
                      )}
                    </Link>
                  </View>

                  <View style={styles.footerFlexView}>
                    <Link
                      web={{
                        as: "/sell/" + this.props.ifsn,
                        path: "/sell/" + this.props.ifsn,
                      }}
                      routeName="sell"
                      style={{ padding: 20 }}
                    >
                      {this.props.page != undefined &&
                      this.props.page == "sell" ? (
                        <Icon
                          style={{
                            paddingTop: pm2,
                            paddingRight: pm2,
                            color: colorPrimary,
                          }}
                          name="shopping-cart"
                          size={20}
                        />
                      ) : (
                        <Icon
                          style={{
                            paddingTop: pm2,
                            paddingRight: pm2,
                            color: colorGray,
                          }}
                          name="shopping-cart"
                          size={20}
                        />
                      )}
                    </Link>
                  </View>
                  <View style={styles.footerFlexView}>
                    <Link
                      web={{
                        as: "/cash-register/" + this.props.ifsn,
                        path: "/cash-register/" + this.props.ifsn,
                      }}
                      routeName="cash-register"
                      style={{ padding: 20 }}
                    >
                      {this.props.page != undefined &&
                      this.props.page == "cash-register" ? (
                        <Icon
                          style={{
                            paddingTop: pm2,
                            paddingRight: pm2,
                            color: colorPrimary,
                          }}
                          name="cash-register"
                          size={20}
                        />
                      ) : (
                        <Icon
                          style={{
                            paddingTop: pm2,
                            paddingRight: pm2,
                            color: colorGray,
                          }}
                          name="cash-register"
                          size={20}
                        />
                      )}
                    </Link>
                  </View>
                  <View style={styles.footerFlexView}>
                    <Link
                      web={{
                        as: "/list/" + this.props.ifsn,
                        path: "/list/" + this.props.ifsn,
                      }}
                      routeName="list"
                      style={{ padding: 20 }}
                    >
                      {this.props.page != undefined &&
                      this.props.page == "list" ? (
                        <Icon
                          style={{
                            paddingTop: pm2,
                            paddingRight: pm2,
                            color: colorPrimary,
                          }}
                          name="border-all"
                          size={20}
                        />
                      ) : (
                        <Icon
                          style={{
                            paddingTop: pm2,
                            paddingRight: pm2,
                            color: colorGray,
                          }}
                          name="border-all"
                          size={20}
                        />
                      )}
                    </Link>
                  </View>
                  <View style={styles.footerFlexView}>
                    <Link
                      web={{ as: "/", path: "/" }}
                      routeName="home"
                      style={{ padding: 20 }}
                    >
                      {this.props.page == undefined ? (
                        <Icon
                          style={{
                            paddingTop: pm2,
                            paddingRight: pm2,
                            color: colorPrimary,
                          }}
                          name="box"
                          size={20}
                        />
                      ) : this.props.page != undefined &&
                        this.props.page == "home" ? (
                        <Icon
                          style={{
                            paddingTop: pm2,
                            paddingRight: pm2,
                            color: colorPrimary,
                          }}
                          name="box"
                          size={20}
                        />
                      ) : (
                        <Icon
                          style={{
                            paddingTop: pm2,
                            paddingRight: pm2,
                            color: colorGray,
                          }}
                          name="box"
                          size={20}
                        />
                      )}
                    </Link>
                  </View>
                </View>
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}

function handleResize() {
  showFooterSetup();
}

function showFooterSetup() {
  if (!(Dimensions.get("window").width < sm)) {
    footerBarThis.setState({
      showFooter: styles.dNone,
    });
  } else {
    footerBarThis.setState({
      showFooter: styles.dBlock,
    });
  }
}
