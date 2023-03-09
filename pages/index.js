import React, { useState } from "react";
import { View, Text, ScrollView, TouchableWithoutFeedback, Image, TouchableOpacity, Platform, StyleSheet, Dimensions } from "react-native";
import BaseTemplate from "./templates/baseTemplate";
import MyStyleFunc, { styles, styleRow, rowStyleSetup} from "./css/base_styles";
import InvertibleScrollView from "react-native-invertible-scroll-view";
import { Link, useRouting } from "expo-next-react-navigation";
import { colorPrimary, colorWhite, colorBlack, colorSecondary } from "./connection/color";
import { smalltisUrl } from "./connection/base";
import IconMI from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "next/router";
import Icon from "react-native-vector-icons/FontAwesome5";
import IconMCI from "react-native-vector-icons/MaterialCommunityIcons";
import { getDBPartOfTable, numberWithCommas, convertEnToFaNumber,} from "./scripts/share";
import CustomMultiPicker from './scripts/picker';

var homeClassThis;
export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      routeName: null,
      ifsn: "page",
      setKeyCount: 1,
      isClassMount: false,
      stateItemSelected: [],
      stateItemArray: {"all": "همه استان ها"},
      cityItemSelected: ["all"],
      cityItemArray: { "all" : "همه شهرها"},
      orderItemSelected: [],
      orderItemArray: {
        "ارزان ترین" : "ارزان ترین" ,
        "گران ترین" : "گران ترین" ,
        "جدیدترین" : "جدیدترین" ,
        "پرستاره ترین" : "پرستاره ترین" ,
      },
      isStateOptionsShow: false,
      isCityOptionsShow: false,
      isOrderOptionsShow: false,
    };
    homeClassThis = this;
  }

  componentDidMount() {
    let fileSave = "";
    if (Platform.OS == "web") {
      if (
        window.location.href.indexOf("mahanalborz.com") >= 0 ||
        window.location.href.indexOf("smalltis.com") >= 0 ||
        window.location.href.indexOf("smalltis.ir") >= 0
      ) {
        fileSave = "";
      } else {
        fileSave = "page";
      }
    }
    this.setState({ ifsn: fileSave });

    this.setState({
      routeName: Platform.OS == "web" ? routeName : this.props.navigation.state.routeName,
      isClassMount: true,
    }); 
  }

  changeStatePicker(res) {
    console.log(res)
  }

  hideStateBackdrop() {
    homeClassThis.setState({
      isStateOptionsShow: false,
    }) 
  }

  hideCityBackdrop() {
    homeClassThis.setState({
      isCityOptionsShow: false,
    }) 
  }

  hideOrderBackdrop() {
    homeClassThis.setState({
      isOrderOptionsShow: false,
    })
  }

  render() {
    return (
      
      <>
        { this.state.isClassMount ? (
          <>
            <GetRouterName />

              {this.state.isStateOptionsShow ? (
                <>
                  { picker(this.state.stateItemArray, this.changeStatePicker, this.hideStateBackdrop, false, true, this.state.stateItemSelected) }
                </>
              ) : (
                <></>
              )}

              {this.state.isCityOptionsShow ? (
                <>
                  { picker(this.state.cityItemArray, this.changeStatePicker, this.hideCityBackdrop, false, true, this.state.cityItemSelected) }
                </>
              ) : (
                <></>
              )}

              {this.state.isOrderOptionsShow ? (
                <>
                  { picker(this.state.orderItemArray, this.changeStatePicker, this.hideOrderBackdrop, false, false, this.state.orderItemSelected) }
                </>
              ) : (
                <></>
              )}
            

            <BaseTemplate  routeName={this.state.routeName}>
              <UserSellers />
              <ProductListInHomeWithRoute key={this.state.setKeyCount} ifsn={this.state.ifsn} />
            </BaseTemplate>
          </>
        ) : (
          <></>
        )}
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

var userSellersThis;
class UserSellers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isClassMount: false,
      isUserSellerOver: [],
      scrollUserSellerWidth: 0,
      isEndOfUserSellersScroll: false,
      scrolled: 0,
      displayUserScrollLeft: "none",
      displayUserScrollRight: "none",
      isPlatformWeb: null,
      userSellerItemsWidth: 0,
      userSellerContentWidth: 0,
      sellerName: null,
    };
    this.scrollSize = 500;
    userSellersThis = this;
  }

  componentDidMount() {
    Platform.OS == "web"
      ? this.setState({ isPlatformWeb: true })
      : this.setState({ isPlatformWeb: false });

    if (querySeller == undefined) querySeller = null;

    this.setState(
      {
        isClassMount: true,
        sellerName: querySeller,
      },
      () => {
        this.setState(
          {
            sellerName: Platform.OS == "web" ? sellerName : querySeller,
          },
          () => {}
        );
      }
    );
  }

  componentDidUpdate() {
    let seller = "";
    if (Platform.OS == "web") {
      seller = sellerName;
    } else {
      seller = querySeller;
    }

    if (seller != this.state.sellerName) {
      if (querySeller == undefined) querySeller = null;

      this.setState(
        {
          isClassMount: true,
          sellerName: querySeller,
        },
        () => {
          this.setState(
            {
              sellerName: Platform.OS == "web" ? sellerName : querySeller,
            },
            () => {}
          );
        }
      );
    }

    //rowStyleSetup()
  }

  isScrollCLoseToLeft = ({ layoutMeasurement, contentOffset, contentSize }) => {
    this.setState({
      scrollUserSellerWidth: contentSize.width - layoutMeasurement.width,
    });

    return (
      layoutMeasurement.width + contentOffset.x >=
      contentSize.width - this.scrollSize
    );
  };

  render() {
    return (
      <>
        <GetSellerQuery />
        {this.state.isClassMount ? (
          <View
            onMouseEnter={() => this.forceUpdate()}
            style={[{ flexDirection: "row-reverse", height: 125 }, styles.pt3]}
          >
            <GetSellerParams />
            <View style={[styleRow.outContainer, { height: "100%" }]} />
            <View style={[styleRow.container, { height: "100%" }]}>
              <View
                style={[
                  styles.card,
                  {
                    flexDirection: "row-reverse",
                    height: "100%",
                    overflow: "hidden",
                  },
                ]}
              >
                <InvertibleScrollView
                  inverted
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    height: "100%",
                  }}
                  horizontal={true}
                  scrollEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  ref={(node) => (this.scroll = node)}
                  onScroll={({ nativeEvent }) => {
                    if (this.isScrollCLoseToLeft(nativeEvent)) {
                      this.setState({
                        isEndOfUserSellersScroll: true,
                      });
                    } else {
                      this.setState({
                        isEndOfUserSellersScroll: false,
                      });
                    }
                  }}
                  onLayout={(evt) => {
                    const { width } = evt.nativeEvent.layout;
                    this.setState(
                      {
                        userSellerContentWidth: width,
                      },
                      () => {}
                    );
                  }}
                  scrollEventThrottle={400}
                >
                  <View
                    onLayout={(evt) => {
                      const { width } = evt.nativeEvent.layout;
                      this.setState(
                        {
                          userSellerItemsWidth: width,
                        },
                        () => {
                          if (
                            this.state.userSellerContentWidth >=
                            this.state.userSellerItemsWidth
                          ) {
                            this.setState({
                              displayUserScrollLeft: "none",
                            });
                          } else {
                            this.setState({
                              displayUserScrollLeft: "flex",
                            });
                          }
                        }
                      );
                    }}
                    style={{ flexDirection: "row-reverse" }}
                  >
                    {showUserSellersItems()}
                  </View>
                </InvertibleScrollView>

                {this.state.isPlatformWeb == true ? (
                  <>
                    <TouchableOpacity
                      style={[
                        {
                          position: "absolute",
                          top: "25%",
                          left: 10,
                          height: 40,
                          width: 40,
                          backgroundColor: colorWhite,
                        },
                        styles.justifyContentCenter,
                        styles.alignItemsCenter,
                        styles.roundedCircle,
                        styles.zDepth1,
                        { display: this.state.displayUserScrollLeft },
                      ]}
                      onPress={() => {
                        if (!this.state.isEndOfUserSellersScroll) {
                          this.setState(
                            {
                              scrolled: this.state.scrolled + this.scrollSize,
                            },
                            () => {
                              this.scroll.scrollTo({ x: this.state.scrolled });

                              this.setState({
                                displayUserScrollLeft: "flex",
                                displayUserScrollRight: "flex",
                              });
                            }
                          );
                        } else {
                          this.setState(
                            {
                              scrolled: this.state.scrollUserSellerWidth,
                            },
                            () => {
                              this.scroll.scrollTo({ x: this.state.scrolled });

                              this.setState({
                                displayUserScrollLeft: "none",
                                displayUserScrollRight: "flex",
                              });
                            }
                          );
                        }
                      }}
                    >
                      <IconMI
                        style={[{ color: colorBlack }]}
                        name="keyboard-arrow-left"
                        size={30}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        {
                          position: "absolute",
                          top: "25%",
                          right: 10,
                          height: 40,
                          width: 40,
                          backgroundColor: colorWhite,
                        },
                        styles.justifyContentCenter,
                        styles.alignItemsCenter,
                        styles.roundedCircle,
                        styles.zDepth1,
                        { display: this.state.displayUserScrollRight },
                      ]}
                      onPress={() => {
                        if (this.state.scrolled > this.scrollSize) {
                          this.setState(
                            {
                              scrolled: this.state.scrolled - this.scrollSize,
                            },
                            () => {
                              this.scroll.scrollTo({ x: this.state.scrolled });
                              this.setState({
                                displayUserScrollLeft: "flex",
                                displayUserScrollRight: "flex",
                              });
                            }
                          );
                        } else {
                          this.setState(
                            {
                              scrolled: 0,
                            },
                            () => {
                              this.scroll.scrollTo({ x: this.state.scrolled });
                              this.setState({
                                displayUserScrollLeft: "flex",
                                displayUserScrollRight: "none",
                              });
                            }
                          );
                        }
                      }}
                    >
                      <IconMI
                        style={[{ color: colorBlack }]}
                        name="keyboard-arrow-right"
                        size={30}
                      />
                    </TouchableOpacity>
                  </>
                ) : (
                  <></>
                )}
              </View>
            </View>
            <View style={[styleRow.outContainer, { height: "100%" }]} />
          </View>
        ) : (
          <></>
        )}
      </>
    );
  }
}

function showUserSellersItems() {
  let userSellersArray = [
    "ازت",
    "بستر",
    "بی باک",
    "اتوخرید",
    "دیجی فوند",
    "نامبروان",
    "نیاوران",
    "استیل",
    "ماینینگ1",
    "ماینینگ2",
    "ماینینگ3",
    "ماینینگ4",
    "ماینینگ5",
    "ماینینگ6",
    "ماینینگ7",
    "ماینینگ8",
    "ماینینگ9",
    "ماینینگ10",
    "ماینینگ11",
    "ماینینگ12",
    "ماینینگ13",
    "ماینینگ14",
    "ماینینگ15",
    "ماینینگ16",
    "ماینینگ17",
    "ماینینگ18",
  ];

  let pushJSX = [];
  pushJSX.push(
    <View key={"userSellerBase_All"}>
      {userSellersThis.state.sellerName == null ? (
        <View
          key={"userSellerView_All"}
          style={[
            { flexDirection: "column" },
            styles.justifyContentBetween,
            styles.alignItemsCenter,
            styles.p2,
          ]}
        >
          <View
            key={"userSellerImageView_All"}
            style={[
              {
                borderColor: colorPrimary,
                borderWidth: 1,
                borderStyle: "dashed",
                width: 68,
                height: 68,
              },
              styles.rounded3,
              styles.p1,
              styles.zDepth1,
            ]}
          >
            <Image
              key={"userSellerImage_All"}
              resizeMode="contain"
              source={{
                uri:
                  smalltisUrl + "/image/logo/logo-st-md-white-bg2.jpg",
              }}
              style={[styles.rounded3, { width: "100%", height: "100%" }]}
            />
          </View>
          <Text style={[styles.pt1, styles.fontFa, styles.font12]}>همه</Text>
        </View>
      ) : (
        <>
          {
            <Link
              key={"userSellerBase_All"}
              params={{ seller: null }}
              web={{ as: "/", path: "/" }}
              routeName="home"
            >
              <View
                key={"userSellerView_All"}
                style={[
                  { flexDirection: "column" },
                  styles.justifyContentBetween,
                  styles.alignItemsCenter,
                  styles.p2,
                ]}
              >
                <View
                  key={"userSellerImageView_All"}
                  style={[
                    {
                      borderColor: colorPrimary,
                      borderWidth: 1,
                      borderStyle: "dashed",
                      width: 68,
                      height: 68,
                    },
                    styles.roundedCircle,
                    styles.p1,
                    styles.zDepth0,
                  ]}
                >
                  <Image
                    key={"userSellerImage_All"}
                    resizeMode="contain"
                    source={{
                      uri:
                        smalltisUrl +
                        "/image/logo/logo-st-md-white-bg2.jpg",
                    }}
                    style={[
                      styles.roundedCircle,
                      { width: "100%", height: "100%" },
                    ]}
                  />
                </View>
                <Text
                  key={"userSellerText_All"}
                  style={[styles.pt1, styles.fontFa, styles.font12]}
                >
                  همه
                </Text>
              </View>
            </Link>
          }
        </>
      )}
    </View>
  );

  for (let i = 0; i < userSellersArray.length; i++) {
    pushJSX.push(
      <View key={"userSellerBase_" + i}>
        {userSellersThis.state.sellerName != null &&
        userSellersThis.state.sellerName == userSellersArray[i] ? (
          <View
            key={"userSellerView_" + i}
            style={[
              styles.p2,
              { flexDirection: "column" },
              styles.justifyContentBetween,
              styles.alignItemsCenter,
            ]}
            onMouseEnter={() => {
              let newArray = [];
              for (let d = 0; d < userSellersArray.length; d++) {
                newArray.push(false);
              }
              newArray[i] = true;

              userSellersThis.setState(
                { isUserSellerOver: newArray },
                () => {}
              );
            }}
            onMouseLeave={() => {
              let newArray = [];
              for (let d = 0; d < userSellersArray.length; d++) {
                newArray.push(false);
              }
              userSellersThis.setState({ isUserSellerOver: newArray });
            }}
          >
            <View
              style={[
                {
                  borderColor: colorPrimary,
                  borderWidth: 1,
                  borderStyle: "dashed",
                  width: 68,
                  height: 68,
                },
                styles.rounded3,
                styles.p1,
                styles.zDepth1,
              ]}
            >
              <Image
                resizeMode="contain"
                source={{
                  uri:
                    smalltisUrl + "/image/template/Profile-User-2.jpg",
                }}
                style={[styles.rounded3, { width: "100%", height: "100%" }]}
              />
            </View>
            <Text style={[styles.pt1, styles.fontFa, styles.font12]}>
              {userSellersArray[i]}
            </Text>
          </View>
        ) : (
          <Link
            key={"userSellerLink_" + i}
            style={[styles.p2]}
            params={{ seller: userSellersArray[i] }}
            web={{
              as: "/?seller=" + userSellersArray[i].split(" ").join("-"),
              path: "/",
            }}
            routeName="home"
          >
            <View
              style={[
                { flexDirection: "column" },
                styles.justifyContentBetween,
                styles.alignItemsCenter,
              ]}
              onMouseEnter={() => {
                let newArray = [];
                for (let d = 0; d < userSellersArray.length; d++) {
                  newArray.push(false);
                }
                newArray[i] = true;

                userSellersThis.setState(
                  { isUserSellerOver: newArray },
                  () => {}
                );
              }}
              onMouseLeave={() => {
                let newArray = [];
                for (let d = 0; d < userSellersArray.length; d++) {
                  newArray.push(false);
                }
                userSellersThis.setState({ isUserSellerOver: newArray });
              }}
            >
              <View
                style={[
                  {
                    borderColor: colorPrimary,
                    borderWidth: 1,
                    borderStyle: "dashed",
                    width: 68,
                    height: 68,
                  },
                  styles.roundedCircle,
                  styles.p1,
                  userSellersThis.state.isUserSellerOver[i]
                    ? styles.zDepth1
                    : styles.zDepth0,
                ]}
              >
                <Image
                  resizeMode="contain"
                  source={{
                    uri:
                      smalltisUrl + "/image/template/Profile-User-2.jpg",
                  }}
                  style={[
                    styles.roundedCircle,
                    { width: "100%", height: "100%" },
                  ]}
                />
              </View>
              <Text style={[styles.pt1, styles.fontFa, styles.font12]}>
                {userSellersArray[i]}
              </Text>
            </View>
          </Link>
        )}
      </View>
    );
  }

  return pushJSX;
}

var querySeller = null;
function GetSellerParams() {
  const router = useRouter();
  const { getParam } = useRouting();

  Platform.OS == "web"
    ? (querySeller = router.query.seller)
    : (querySeller = getParam("seller"));

  if (querySeller != undefined) querySeller = querySeller.split("-").join(" ");

  return <></>;
}

var sellerName = "";
function GetSellerQuery() {
  let seller;
  const router = useRouter();

  Platform.OS == "web" ? (sellerName = router.query.seller) : null;
  sellerName == undefined ? (sellerName = null) : null;

  return <></>;
}

const ProductListInHomeWithRoute = (props) => {
  const router = useRouter();
  const { getParam, navigate, push } = useRouting();

  return (
    <ProductListInHome {...props} router={router} mobileParam={getParam} navigate={navigate} push={push}/>
  );
};

var productListInHomeThis;
var productListRoute;
class ProductListInHome extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isClassMount: false,
      isChanged: "",
      productArray: [],
      productImgArray: [],
      isProductCardMEnter: [],
      language: "Java",
      selected: "",
    };
    productListInHomeThis = this;
  }

  componentDidMount() {
    //productListInHomeThis.props.mobileParam("state")
     productListRoute = productListInHomeThis.props.router;
    let stateQuery = "";
    if ((Platform.OS == "web" && productListRoute.query.state != undefined) || productListInHomeThis.props.mobileParam("state") != undefined) {
      Platform.OS == "web" ? (stateQuery = productListRoute.query.state.split("-").join(" ")) : (stateQuery = productListInHomeThis.props.mobileParam("state").split("-").join(" "));
    }

    getAllState(stateQuery, afterGetStateFunc);
    function afterGetStateFunc(statesForPicker) {

      homeClassThis.setState({ stateItemArray: statesForPicker, stateItemSelected: [stateQuery] }, () => {  });
    }

    if ((Platform.OS == "web" && productListRoute.query.state != undefined) || productListInHomeThis.props.mobileParam("state") != undefined) {
      let stateSend;
      Platform.OS == "web" ? (stateSend = productListRoute.query.state.split("-").join(" ")) : (stateSend = productListInHomeThis.props.mobileParam("state").split("-").join(" "));
      let cityQuery = "";
      if ((Platform.OS == "web" && productListRoute.query.city != undefined) || productListInHomeThis.props.mobileParam("city") != undefined) {
        Platform.OS == "web" ? (cityQuery = productListRoute.query.city.split("-").join(" ")) : productListInHomeThis.props.mobileParam("city").split("-").join(" ");
      }

      getAllCitiesOfState(stateSend, afterGetCityFunc);
      function afterGetCityFunc(citiesForPicker) {
        homeClassThis.setState({ cityItemArray: citiesForPicker });

        homeClassThis.setState({ cityItemSelected: [cityQuery] });
      }
    }

    if ((Platform.OS == "web" && productListRoute.query.filter != undefined) || productListInHomeThis.props.mobileParam("filter") != undefined) {
      //alert(1)
      homeClassThis.setState({
        orderItemSelected: Platform.OS == "web" ? [productListRoute.query.filter.split("-").join(" ")] : [productListInHomeThis.props.mobileParam("filter").split("-").join(" ")],
      }); 
    } else {
      //alert(2)
      homeClassThis.setState({ orderItemSelected: ["ارزان ترین"] });
    }

    this.setState({
      isClassMount: true,
    });

    productListInHomeThis.getProdcutFromDBtoHome(); 
  }

  getProdcutFromDBtoHome = () => {
    let SendQuery;
    if (Platform.OS == "web") {
      SendQuery = productListRoute.query;
    } else {
      SendQuery = {
        state: productListInHomeThis.props.mobileParam("state"),
        city: productListInHomeThis.props.mobileParam("city"),
        filter: productListInHomeThis.props.mobileParam("filter"),
      };
    }

    getProductsWithFilter(SendQuery, afterGetProductsFunc);
    function afterGetProductsFunc(getArray) {
      productListInHomeThis.setState(
        {
          productArray: getUniqueProductForHome(getArray),
          //productArray: getArray
        },
        () => {
          let data = { productArray: productListInHomeThis.state.productArray };
          
          getDBPartOfTable("/Home/getProductImageForHome", data, "files_uploaded", afterGetPartTableFunc);
          function afterGetPartTableFunc(tableImageArray) {
            productListInHomeThis.setState({
              productImgArray: tableImageArray,
            });
          }
        }
      );
    }
  };

  onStateItemChangeFunc(item) {
    if (Platform.OS == "web") {
      delete productListRoute.query.city;
    }

    let itemVal;
    let filterQ = "";
    if ((Platform.OS == "web" && productListRoute.query.filter != undefined) || productListInHomeThis.props.mobileParam("filter") != undefined) {
      Platform.OS == "web" ? (filterQ = "&filter=" + productListRoute.query.filter.split(" ").join("-")) : (filterQ = "&filter=" + productListInHomeThis.props.mobileParam("filter").split(" ").join("-"));
    } else {
      if (Platform.OS == "web") {
        delete productListRoute.query.filter;
      }
    }

    if (item.value == "all") {
      itemVal = "";
      if (Platform.OS == "web") {
        delete productListRoute.query.state;
      }
    } else {
      itemVal = "?state=" + item.value.split(" ").join("-") + filterQ;
      if (Platform.OS == "web") {
        productListRoute.query.state = item.value.split(" ").join("-");
      }
    }
    if (Platform.OS == "web") {
      productListRoute.push("/" + itemVal);
      productListInHomeThis.getProdcutFromDBtoHome(); 
    } else {
      
      let filterP = undefined;
      if (productListInHomeThis.props.mobileParam("filter") != undefined) {
        filterP = productListInHomeThis.props.mobileParam("filter").split(" ").join("-")
      } 

      productListInHomeThis.props.navigate({
        routeName: 'home',
        params: { state: item.value.split(" ").join("-"), filter: filterP },
      })

      homeClassThis.setState({
        setKeyCount: homeClassThis.state.setKeyCount + 1
      })
    }

    if ((Platform.OS == "web" && productListRoute.query.state != undefined) || productListInHomeThis.props.mobileParam("state") != undefined) {
      let sendState;
      Platform.OS == "web" ? (sendState = productListRoute.query.state.split("-").join(" ")) : productListInHomeThis.props.mobileParam("state").split("-").join(" ");
      getAllCitiesOfState(sendState, afterGetCityFunc);
      function afterGetCityFunc(citiesForPicker) {
        homeClassThis.setState(
          { cityItemArray: citiesForPicker },
          () => {
            homeClassThis.setState({ cityItemSelected: ["all"] });
          }
        );
      }
    } else {
      homeClassThis.setState(
        { cityItemArray: { "all": "همه شهرها"}},
        () => {
          homeClassThis.setState({ cityItemSelected: ["all"] });
        }
      );
    }

  }

  onCityItemChangeFunc(item) {
    let itemVal = "";
    if ((Platform.OS == "web" && productListRoute.query.state != undefined) || productListInHomeThis.props.mobileParam("state") != undefined) {
      let filterQ;
      if ((Platform.OS == "web" && productListRoute.query.filter != undefined) || productListInHomeThis.props.mobileParam("filter") != undefined) {
        Platform.OS == "web" ? (filterQ = "&filter=" + productListRoute.query.filter.split(" ").join("-")) : (filterQ = "&filter=" + productListInHomeThis.props.mobileParam("filter").split(" ").join("-"));
      } else {
        filterQ = "";
      }

      if (item.value == "all") {
        let sendState;
        Platform.OS == "web" ? (sendState = productListRoute.query.state.split(" ").join("-")) : (sendState = productListInHomeThis.props.mobileParam("state").split(" ").join("-"));

        itemVal = "?state=" + sendState + filterQ;

        if (Platform.OS == "web") delete productListRoute.query.city;
      } else {
        let sendState;
        Platform.OS == "web" ? (sendState = productListRoute.query.state.split(" ").join("-")) : (sendState = productListInHomeThis.props.mobileParam("state").split(" ").join("-"));
        itemVal = "?state=" + sendState + "&city=" + item.value.split(" ").join("-") + filterQ;

        if (Platform.OS == "web")
          productListRoute.query.city = item.value.split(" ").join("-");
      }
    }
    if (Platform.OS == "web") {
      productListRoute.push("/" + itemVal);
      productListInHomeThis.getProdcutFromDBtoHome(); 
    } else {
      
      let filterP = undefined;
      if (productListInHomeThis.props.mobileParam("filter") != undefined) {
        filterP = productListInHomeThis.props.mobileParam("filter").split(" ").join("-")
      } 
      let cityP = undefined;
      if (item.value != "all") {
        filterP = item.value.split(" ").join("-")
      } 

      productListInHomeThis.props.navigate({
        routeName: 'home',
        params: { state: productListInHomeThis.props.mobileParam("state").split(" ").join("-"), city: cityP, filter: filterP }, 
      })

      homeClassThis.setState({
        setKeyCount: homeClassThis.state.setKeyCount + 1
      })
    }

  }

  onOrderItemChangeFunc(item) {
    let itemVal = "";
    let stateP = undefined;
    let cityP = undefined;
    if (((Platform.OS == "web" && productListRoute.query.state != undefined) && (Platform.OS == "web" && productListRoute.query.city == undefined)) || (productListInHomeThis.props.mobileParam("state") != undefined && productListInHomeThis.props.mobileParam("city") == undefined)) {
      let sendState;
      Platform.OS == "web" ? (sendState = productListRoute.query.state) : (sendState = productListInHomeThis.props.mobileParam("state"));
      itemVal = "?state=" + sendState + "&filter=" + item.value.split(" ").join("-");

      if (Platform.OS != "web") stateP = productListInHomeThis.props.mobileParam("state")
    } else if (((Platform.OS == "web" && productListRoute.query.state == undefined) && (Platform.OS == "web" && productListRoute.query.city == undefined)) || (productListInHomeThis.props.mobileParam("state") == undefined && productListInHomeThis.props.mobileParam("city") == undefined)) {
      itemVal = "?filter=" + item.value.split(" ").join("-");
    } else if (((Platform.OS == "web" && productListRoute.query.state != undefined) && (Platform.OS == "web" && productListRoute.query.city != undefined)) ||(productListInHomeThis.props.mobileParam("state") != undefined && productListInHomeThis.props.mobileParam("city") != undefined)) {
      let sendState;
      Platform.OS == "web" ? (sendState = productListRoute.query.state) : (sendState = productListInHomeThis.props.mobileParam("state"));

      let sendCity;
      Platform.OS == "web" ? (sendCity = productListRoute.query.city) : (sendCity = productListInHomeThis.props.mobileParam("city"));

      itemVal = "?state=" + sendState + "&city=" + sendCity + "&filter=" + item.value.split(" ").join("-");

      if (Platform.OS != "web") stateP = productListInHomeThis.props.mobileParam("state")
      if (Platform.OS != "web") cityP = productListInHomeThis.props.mobileParam("city")
    }

    if (Platform.OS == "web") {
      productListRoute.query.filter = item.value.split(" ").join("-");
      productListRoute.push("/" + itemVal);
      productListInHomeThis.getProdcutFromDBtoHome();
    } else {

      productListInHomeThis.props.navigate({
        routeName: 'home',
        params: { state: stateP, city: cityP, filter: item.value.split(" ").join("-") }, 
      })

      homeClassThis.setState({
        setKeyCount: homeClassThis.state.setKeyCount + 1
      })
    }

  }

  onStateClick() {
    homeClassThis.setState({
      isStateOptionsShow: true,
    })
  }

  onCityClick() {
    homeClassThis.setState({
      isCityOptionsShow: true,
    })
  }

  onOrderClick() {
    homeClassThis.setState({
      isOrderOptionsShow: true,
    })
  }

  render() {
    return (
      <>
        {this.state.isClassMount ? (
          <>
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
              <View style={[styleRow.containerTab, styles.mdTabs]}>
                <View style={[styleRow.row]}>
                  <View style={[styleRow.col12, styleRow.colMD4]}>

                    <PickerBox placeholder={"استان"} boxColor={colorWhite} onClick={this.onStateClick} />
                    
                  </View>
                  <View style={[styleRow.col12, styleRow.colMD4]}>

                    <PickerBox placeholder={"شهر"}  boxColor={colorWhite} onClick={this.onCityClick} />

                  </View>
                  <View style={[styleRow.col12, styleRow.colMD4]}>

                    <PickerBox placeholder={"ارزان ترین"}  boxColor={colorWhite} onClick={this.onOrderClick} />

                  </View>
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
              <View style={[styleRow.container]}>
                <View
                  style={[styles.card, styles.pv4, { flexDirection: "column" }]}
                >
                  {appendProducts(
                    productListInHomeThis.state.productArray,
                    productListInHomeThis.state.productImgArray,
                    this.props.ifsn
                  )}
                  {/* <AppendProducts productArray={productListInHomeThis.state.productArray}/> */}
                </View>
              </View>
              <View style={[styleRow.outContainer]} />
            </View>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}

function appendProducts(productArray, productImageArray, isfn) {
  let JSXArray = [];
  let num = 0;
  for (let i = 1; i <= productArray.length; i += 2) {
    let imagePath1;
    if (productImageArray[i - 1] != undefined) {
      imagePath1 = {
        uri: productImageArray[i - 1]["folder_path"].replace("../../", smalltisUrl + "/") + productImageArray[i - 1]["ufile_name"],
      };
    } else {
      imagePath1 = { uri: smalltisUrl + "/image/template/logo.jpg" };
    }
    let imagePath2;
    if (productImageArray[i] != undefined) {
      imagePath2 = {
        uri: productImageArray[i]["folder_path"].replace("../../", smalltisUrl + "/") + productImageArray[i]["ufile_name"],
      };
    } else {
      imagePath2 = { uri: smalltisUrl + "/image/template/logo.jpg" };
    }

    let starJSX1 = [];
    if (productArray[i - 1] != undefined) {
      let number = parseInt(productArray[i - 1]["star"]);
      for (var g = 1; g <= 5; g++) {
        if (number == g - 1) {
          starJSX1.push(
            <IconMCI
              key={"star_" + i + "_" + g}
              style={[styles.textGaryLight]}
              name={"star-outline"}
              size={20}
            />
          );
        } else if (number == g - 0.5) {
          starJSX1.push(
            <IconMCI
              key={"star_" + i + "_" + g}
              style={[styles.textSecondary]}
              name={"star-half-full"}
              size={20}
            />
          );
        } else {
          if (number >= g) {
            starJSX1.push(
              <IconMCI
                key={"star_" + i + "_" + g}
                style={[styles.textSecondary]}
                name={"star"}
                size={20}
              />
            );
          } else {
            starJSX1.push(
              <IconMCI
                key={"star_" + i + "_" + g}
                style={[styles.textGaryLight]}
                name={"star-outline"}
                size={20}
              />
            );
          }
        }
      }
    }

    let starJSX2 = [];
    if (productArray[i] != undefined) {
      let number = parseInt(productArray[i]["star"]);
      for (var g = 1; g <= 5; g++) {
        if (number == g - 1) {
          starJSX2.push(
            <IconMCI
              key={"star_" + i + "_" + g}
              style={[styles.textGaryLight]}
              name={"star-outline"}
              size={20}
            />
          );
        } else if (number == g - 0.5) {
          starJSX2.push(
            <IconMCI
              key={"star_" + i + "_" + g}
              style={[styles.textSecondary]}
              name={"star-half-full"}
              size={20}
            />
          );
        } else {
          if (number >= g) {
            starJSX2.push(
              <IconMCI
                key={"star_" + i + "_" + g}
                style={[styles.textSecondary]}
                name={"star"}
                size={20}
              />
            );
          } else {
            starJSX2.push(
              <IconMCI
                key={"star_" + i + "_" + g}
                style={[styles.textGaryLight]}
                name={"star-outline"}
                size={20}
              />
            );
          }
        }
      }
    }

    let params1 = {};
    let asStr1 = "/products/" + isfn;
    if (productArray[i - 1] != undefined) {
      let namStr = productArray[i - 1]["new_kala_name"].split(" ").join("-");
      if ((Platform.OS == "web" && productListRoute.query.state == undefined && productListRoute.query.filter == undefined) || (productListInHomeThis.props.mobileParam("state") == undefined && productListInHomeThis.props.mobileParam("filter") == undefined)) {
        params1 = { 
          product: productArray[i - 1]["kala_code"],
          name: namStr 
        };
        if (isfn != "page") asStr1 = "/products/" + productArray[i - 1]["kala_code"] + "/" + namStr;
      } else if ((Platform.OS == "web" && productListRoute.query.state == undefined && productListRoute.query.filter != undefined) || (productListInHomeThis.props.mobileParam("state") == undefined && productListInHomeThis.props.mobileParam("filter") != undefined)) {
        let filterP;
        Platform.OS == "web" ? filterP = productListRoute.query.filter : filterP = productListInHomeThis.props.mobileParam("filter");
        params1 = {
          product: productArray[i - 1]["kala_code"],
          name: namStr,
          filter: filterP,
        };
        if (isfn != "page") asStr1 = "/products/" + productArray[i - 1]["kala_code"] + "/" + namStr + "/فیلتر-" + filterP; 
      } else if ((Platform.OS == "web" && productListRoute.query.state != undefined && productListRoute.query.city == undefined && productListRoute.query.filter != undefined) || (productListInHomeThis.props.mobileParam("state") != undefined && productListInHomeThis.props.mobileParam("city") == undefined && productListInHomeThis.props.mobileParam("filter") != undefined)) {
        let stateP;
        Platform.OS == "web" ? stateP = productListRoute.query.state : stateP = productListInHomeThis.props.mobileParam("state");
        let filterP;
        Platform.OS == "web" ? filterP = productListRoute.query.filter : filterP = productListInHomeThis.props.mobileParam("filter");

        params1 = {
          product: productArray[i - 1]["kala_code"],
          name: namStr,
          state: stateP,
          filter: filterP,
        };
        if (isfn != "page") asStr1 = "/products/" + productArray[i - 1]["kala_code"] +
            "/" + namStr + "/فیلتر-" + filterP + "/" + stateP;
      } else if ((Platform.OS == "web" && productListRoute.query.state != undefined && productListRoute.query.city == undefined && productListRoute.query.filter == undefined) || (productListInHomeThis.props.mobileParam("state") != undefined && productListInHomeThis.props.mobileParam("city") == undefined && productListInHomeThis.props.mobileParam("filter") == undefined)) {
        let stateP;
        Platform.OS == "web" ? stateP = productListRoute.query.state : stateP = productListInHomeThis.props.mobileParam("state");

        params1 = {
          product: productArray[i - 1]["kala_code"],
          name: namStr,
          state: stateP,
        };
        if (isfn != "page") asStr1 = "/products/" + productArray[i - 1]["kala_code"] + "/" + namStr + "/استان-" + stateP; 
      } else if ((Platform.OS == "web" && productListRoute.query.state != undefined && productListRoute.query.city != undefined && productListRoute.query.filter != undefined) || (productListInHomeThis.props.mobileParam("state") != undefined && productListInHomeThis.props.mobileParam("city") != undefined && productListInHomeThis.props.mobileParam("filter") != undefined)) {
        let stateP;
        Platform.OS == "web" ? stateP = productListRoute.query.state : stateP = productListInHomeThis.props.mobileParam("state");
        let cityP;
        Platform.OS == "web" ? cityP = productListRoute.query.city : cityP = productListInHomeThis.props.mobileParam("city");
        let filterP;
        Platform.OS == "web" ? filterP = productListRoute.query.filter : filterP = productListInHomeThis.props.mobileParam("filter");
        params1 = {
          product: productArray[i - 1]["kala_code"],
          name: namStr,
          state: stateP,
          city: cityP,
          filter: filterP,
        };
        if (isfn != "page") asStr1 = "/products/" + productArray[i - 1]["kala_code"] + "/" + namStr + "/" + filterP + "/" + cityP + "/استان-" + stateP; 
      } else if ((Platform.OS == "web" && productListRoute.query.state != undefined && productListRoute.query.city != undefined && productListRoute.query.filter == undefined) || (productListInHomeThis.props.mobileParam("state") != undefined && productListInHomeThis.props.mobileParam("city") != undefined && productListInHomeThis.props.mobileParam("filter") == undefined)) {
        let stateP;
        Platform.OS == "web" ? stateP = productListRoute.query.state : stateP = productListInHomeThis.props.mobileParam("state");
        let cityP;
        Platform.OS == "web" ? cityP = productListRoute.query.city : cityP = productListInHomeThis.props.mobileParam("city");
        params1 = {
          product: productArray[i - 1]["kala_code"],
          name: namStr,
          state: stateP,
          city: cityP,
        };
        if (isfn != "page") asStr1 = "/products/" + productArray[i - 1]["kala_code"] + "/" + namStr + "/" + cityP + "/استان-" + stateP;
      }
    } 

    let params2 = {};
    let asStr2 = "/products/" + isfn;
    if (productArray[i] != undefined) {
      let namStr = productArray[i]["new_kala_name"].split(" ").join("-");
      if ((Platform.OS == "web" && productListRoute.query.state == undefined && productListRoute.query.filter == undefined) || (productListInHomeThis.props.mobileParam("state") == undefined && productListInHomeThis.props.mobileParam("filter") == undefined)) {
        params2 = { product: productArray[i]["kala_code"], name: namStr };
        if (isfn != "page") asStr2 = "/products/" + productArray[i]["kala_code"] + "/" + namStr;
      } else if ((Platform.OS == "web" && productListRoute.query.state == undefined && productListRoute.query.filter != undefined) || (productListInHomeThis.props.mobileParam("state") == undefined && productListInHomeThis.props.mobileParam("filter") != undefined)) {
        let filterP;
        Platform.OS == "web" ? filterP = productListRoute.query.filter : filterP = productListInHomeThis.props.mobileParam("filter");
        params2 = {
          product: productArray[i]["kala_code"],
          name: namStr,
          filter: filterP,
        };
        if (isfn != "page") asStr2 = "/products/" + productArray[i]["kala_code"] + "/" + namStr + "/فیلتر-" + filterP;
      } else if ((Platform.OS == "web" && productListRoute.query.state != undefined && productListRoute.query.city == undefined && productListRoute.query.filter != undefined) || (productListInHomeThis.props.mobileParam("state") != undefined && productListInHomeThis.props.mobileParam("city") == undefined && productListInHomeThis.props.mobileParam("filter") != undefined)) {
        let stateP;
        Platform.OS == "web" ? stateP = productListRoute.query.state : stateP = productListInHomeThis.props.mobileParam("state");
        let filterP;
        Platform.OS == "web" ? filterP = productListRoute.query.filter : filterP = productListInHomeThis.props.mobileParam("filter");

        params2 = {
          product: productArray[i]["kala_code"],
          name: namStr,
          state: stateP,
          filter: filterP,
        };
        if (isfn != "page") asStr2 = "/products/" + productArray[i]["kala_code"] + "/" + namStr + "/فیلتر-" + filterP + "/" + stateP;
      } else if ((Platform.OS == "web" && productListRoute.query.state != undefined && productListRoute.query.city == undefined && productListRoute.query.filter == undefined) || (productListInHomeThis.props.mobileParam("state") != undefined && productListInHomeThis.props.mobileParam("city") == undefined && productListInHomeThis.props.mobileParam("filter") == undefined)) {
        let stateP;
        Platform.OS == "web" ? stateP = productListRoute.query.state : stateP = productListInHomeThis.props.mobileParam("state");

        params2 = {
          product: productArray[i]["kala_code"],
          name: namStr,
          state: stateP,
        };
        if (isfn != "page") asStr2 = "/products/" + productArray[i]["kala_code"] + "/" + namStr + "/استان-" + stateP;
      } else if ((Platform.OS == "web" && productListRoute.query.state != undefined && productListRoute.query.city != undefined && productListRoute.query.filter != undefined) || (productListInHomeThis.props.mobileParam("state") != undefined && productListInHomeThis.props.mobileParam("city") != undefined && productListInHomeThis.props.mobileParam("filter") != undefined)) {
        let stateP;
        Platform.OS == "web" ? stateP = productListRoute.query.state : stateP = productListInHomeThis.props.mobileParam("state");
        let cityP;
        Platform.OS == "web" ? cityP = productListRoute.query.city : cityP = productListInHomeThis.props.mobileParam("city");
        let filterP;
        Platform.OS == "web" ? filterP = productListRoute.query.filter : filterP = productListInHomeThis.props.mobileParam("filter");

        params2 = {
          product: productArray[i]["kala_code"],
          name: namStr,
          state: stateP,
          city: cityP,
          filter: filterP,
        };
        if (isfn != "page") asStr2 = "/products/" + productArray[i]["kala_code"] +"/" + namStr + "/" + filterP + "/" + cityP + "/استان-" + stateP;
      } else if ((Platform.OS == "web" && productListRoute.query.state != undefined && productListRoute.query.city != undefined && productListRoute.query.filter == undefined) || (productListInHomeThis.props.mobileParam("state") != undefined && productListInHomeThis.props.mobileParam("city") != undefined && productListInHomeThis.props.mobileParam("filter") == undefined)) {
        let stateP;
        Platform.OS == "web" ? stateP = productListRoute.query.state : stateP = productListInHomeThis.props.mobileParam("state");
        let cityP;
        Platform.OS == "web" ? cityP = productListRoute.query.city : cityP = productListInHomeThis.props.mobileParam("city");

        params2 = {
          product: productArray[i]["kala_code"],
          name: namStr,
          state: stateP,
          city: cityP,
        };
        if (isfn != "page") asStr2 = "/products/" + productArray[i]["kala_code"] + "/" + namStr + "/" + cityP + "/استان-" + stateP;
      }
    }

    num++;
    JSXArray.push(
      <View key={"kalaRow_" + num} style={[styleRow.row]}>
        <View style={[styleRow.col12, styleRow.colMD6]}>
          {productArray[i - 1] != undefined ? (
            <TouchableOpacity
              style={[
                styles.card,
                styles.mr2,
                styles.ml2,
                styles.mt2,
                { position: "relative", /* backgroundColor: 'skyblue', */ },
                productListInHomeThis.state.isProductCardMEnter[i - 1]
                  ? styles.homeProductMEnter
                  : styles.homeProductMLeave,
              ]}
              onMouseEnter={() => {
                let newArray = [];
                for (let y = 0; y < productArray.length; y++) {
                  if (y == i - 1) {
                    newArray[y] = true;
                  } else {
                    newArray[y] = false;
                  }
                }

                productListInHomeThis.setState({
                  isProductCardMEnter: newArray,
                });
              }}
              onMouseLeave={() => {
                let newArray = [];
                for (let y = 0; y < productArray.length; y++) {
                  newArray[y] = false;
                }

                productListInHomeThis.setState({
                  isProductCardMEnter: newArray,
                });
              }}
            >
              <Link
                web={{ as: asStr1, path: "/products/" + isfn }}
                params={params1}
                routeName="products"
                isText={false}
              > 
                <View style={[{ flex: 0, flexWrap: "wrap", flexDirection: "row-reverse" }, { width: "100%" }]}>
                  <View
                     style={[styleRow.col5, styleRow.colMD6, styleRow.colLG4]} 
                  >
                     <View >
                      <Image
                        resizeMode="cover"
                        source={imagePath1}
                        style={{ width: "100%", height: 220 }}
                      />
                    </View> 
                  </View>
                  <View
                    style={[styleRow.col7, styleRow.colMD6, styleRow.colLG8]} 
                  >
                    <View style={[styles.ph3, { flexDirection: "column" }]}>
                      <Text
                        style={[
                          styles.textGary,
                          styles.mt4,
                          styles.mb2,
                          styles.fontFa,
                        ]}
                      >
                        {productArray[i - 1]["new_kala_name"]}
                      </Text>
                      <View style={[{ alignSelf: "flex-end" }]}>
                        <Text
                          style={[
                            styles.textWhite,
                            styles.fontFa,
                            styles.ph1,
                            styles.rounded1,
                            styles.zDepth1,
                            styles.font11,
                            {
                              backgroundColor: "red",
                              flexDirection: "row-reverse",
                            },
                          ]}
                        >
                          {productArray[i - 1]["badge"] == ""
                            ? "بهترین"
                            : productArray[i - 1]["badge"]}
                        </Text>
                      </View>
                      <View
                        style={[
                          { alignSelf: "flex-end", flexDirection: "row" },
                          styles.mv3,
                        ]}
                      >
                        {starJSX1}
                      </View>
                      <View>
                        <View
                          style={[
                            { alignSelf: "center" },
                            styles.hr,
                            styles.mv2,
                          ]}
                        />
                      </View>
                      <View
                        style={[
                          styles.mt2,
                          styles.mb3,
                          { flexDirection: "row-reverse" },
                        ]}
                      >
                        <Icon
                          style={[styles.textGary, styles.ml2]}
                          name={"shopping-cart"}
                          size={17}
                        />
                        <Text style={[styles.fontFa]}>
                          {convertEnToFaNumber(
                            numberWithCommas(productArray[i - 1]["new_price"])
                          )}
                        </Text>
                        <Text style={[styles.fontFa]}> تومان</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Link> 
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        <View style={[styleRow.col12, styleRow.colMD6]}>
          {productArray[i] != undefined ? (
            <TouchableOpacity
              style={[
                styles.card,
                styles.ml2,
                styles.mr2,
                styles.mt2 /* {backgroundColor: 'skyblue',} */,
                productListInHomeThis.state.isProductCardMEnter[i]
                  ? styles.homeProductMEnter
                  : styles.homeProductMLeave,
              ]}
              onMouseEnter={() => {
                let newArray = [];
                for (let y = 0; y < productArray.length; y++) {
                  if (y == i) {
                    newArray[y] = true;
                  } else {
                    newArray[y] = false;
                  }
                }

                productListInHomeThis.setState({
                  isProductCardMEnter: newArray,
                });
              }}
              onMouseLeave={() => {
                let newArray = [];
                for (let y = 0; y < productArray.length; y++) {
                  newArray[y] = false;
                }

                productListInHomeThis.setState({
                  isProductCardMEnter: newArray,
                });
              }}
            >
              <Link
                web={{ as: asStr2, path: "/products/" + isfn }}
                params={params2}
                routeName="products"
                isText={false}
              >
                <View style={[{ flex: 0,  flexWrap: "wrap", flexDirection: "row-reverse"}, { width: "100%" }]}>
                  <View
                    style={[styleRow.col5, styleRow.colMD6, styleRow.colLG4]}
                  >
                    <View >
                      <Image
                        resizeMode="cover"
                        source={imagePath2}
                        style={{ width: "100%", height: 220 }}
                      />
                    </View>
                  </View>
                  <View
                    style={[styleRow.col7, styleRow.colMD6, styleRow.colLG8]}
                  >
                    <View style={[styles.ph3, { flexDirection: "column" }]}>
                      <Text
                        style={[
                          styles.textGary,
                          styles.mt4,
                          styles.mb2,
                          styles.fontFa,
                        ]}
                      >
                        {productArray[i]["new_kala_name"]}
                      </Text>
                      <View style={[{ alignSelf: "flex-end" }]}>
                        <Text
                          style={[
                            styles.textWhite,
                            styles.fontFa,
                            styles.ph1,
                            styles.rounded1,
                            styles.zDepth1,
                            styles.font11,
                            {
                              backgroundColor: "red",
                              flexDirection: "row-reverse",
                            },
                          ]}
                        >
                          بهترین
                        </Text>
                      </View>
                      <View
                        style={[
                          { alignSelf: "flex-end", flexDirection: "row" },
                          styles.mv3,
                        ]}
                      >
                        {starJSX2}
                      </View>
                      <View>
                        <View
                          style={[
                            { alignSelf: "center" },
                            styles.hr,
                            styles.mv2,
                          ]}
                        />
                      </View>
                      <View
                        style={[
                          styles.mt2,
                          styles.mb3,
                          { flexDirection: "row-reverse" },
                        ]}
                      >
                        <Icon
                          style={[styles.textGary, styles.ml2]}
                          name={"shopping-cart"}
                          size={17}
                        />
                        <Text style={[styles.fontFa]}>۳,۵۰۰,۰۰۰</Text>
                        <Text style={[styles.fontFa]}> تومان</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </Link>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </View>
    );
  }

  return JSXArray;
}

function getAllState(stateSelected, afterGetStateFunc) {
  let data = {};
  getDBPartOfTable(
    "/share/selectAllStates",
    data,
    "states_city_name",
    afterGetPartTableFunc
  );
  function afterGetPartTableFunc(tableArray) {
    let stateArray = {};
    
    stateArray["all"] = "همه استان ها";
    for (let i = 0; i < tableArray.length; i++) {
      let state = tableArray[i]["state_fa"];
      if (stateSelected != undefined && stateSelected == tableArray[i]["state_fa"]) {
        stateArray[state] = state;
      } else {
        stateArray[state] = state;
      }
    }

    afterGetStateFunc(stateArray);
  }
}

function getAllCitiesOfState(state_fa, afterGetCityFunc) {
  let cityData = {
    state_fa: state_fa,
  };

  getDBPartOfTable("/share/selectAllCitiesOfState", cityData, "states_city_name", afterGetPartTableFunc);

  function afterGetPartTableFunc(tableArray) {
    let CityArray = [];
    CityArray.push({ label: "همه شهرها", value: "all" });
    for (let i = 0; i < tableArray.length; i++) {
      CityArray.push({
        label: tableArray[i]["city_fa"],
        value: tableArray[i]["city_fa"],
      });
    }

    afterGetCityFunc(CityArray);
  }
}

function getProductsWithFilter(query, afterGetProductsFunc) {
  let data = {
    state: query.state,
    city: query.city,
    filter: query.filter,
  };
  
  query.state == undefined ? delete data.state : null;
  query.city == undefined ? delete data.city : null;
  query.filter == undefined ? delete data.filter : null;

  getDBPartOfTable(
    "/Home/getProductsForHome",
    data,
    "user_kala",
    afterGetPartTableFunc
  );
  function afterGetPartTableFunc(tableArray) {
    afterGetProductsFunc(tableArray);
  }
}

function getUniqueProductForHome(getArray) {
  let kalaCode = "";
  let productArray = [];
  for (let i = 0; i < getArray.length; i++) {
    if (getArray[i]["is_accepted"] == "yes") {
      if (kalaCode.indexOf(getArray[i]["kala_code"]) < 0) {
        kalaCode += getArray[i]["kala_code"] + ",";
        productArray.push(getArray[i]);
      }
    }
  }
  return productArray;
}

function picker(optionsArray, onChangeFunc, hidesBackdrop, isMulti = false, isSearchable = true, defaultVal = [""]) {
  console.log(defaultVal)
  let jsxVar;
  jsxVar =  (
    <CustomMultiPicker
      backDrop={hidesBackdrop}
      labelStyle={[styles.fontFa]}
      /* scrollViewStyle={{backgroundColor: "pink"}}
      itemStyle={{backgroundColor: "blue"}}
      selectedIconStyle={{backgroundColor: "red"}}
      unselectedIconStyle={{backgroundColor: "green"}}   */
      modalViewStyle={[
        {
          backgroundColor: "white",
          width: 300,
          top: ((Dimensions.get('window').height / 2) - 108), 
          left: ((Dimensions.get('window').width / 2) - 150)
        }, 
        styles.rounded2, 
        styles.zDepth1
      ]}

      searchViewStyle={[
        styles.removeOutline, 
        styles.textRight, 
        styles.mr3, 
        styles.fontFa, 
        {
          borderWidth: 0,
          borderBottomWidth: 1, 
          borderRadius: 0, 
          borderColor: '#b7b6b6'
        }
      ]}

      options={optionsArray}

      search={isSearchable} 
      multiple={isMulti} 

      placeholder={"... جستجو"}
      placeholderTextColor={'#757575'}

      returnValue={"label"}
      callback={(res)=>{ onChangeFunc(res) }} 

      rowBackgroundColor={"#eee"}
      rowHeight={40}
      rowRadius={3}

      searchIconName="search"
      searchIconColor={colorSecondary}
      searchIconSize={18}
      
      iconColor={colorSecondary}
      iconSize={30}
      selectedIconName={"ios-checkmark-circle-outline"}
      unselectedIconName={"ios-radio-button-off-outline"}

      scrollViewHeight={215}
      selected={defaultVal}
    />
  )

  return jsxVar;
}

class PickerBox extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <TouchableOpacity 
        style={[styles.mv3, styles.mh2, styles.ph2, styles.pb1, styles.justifyContentBetween, { flex: 1, flexDirection: "row-reverse", borderBottomWidth: 1, borderBottomColor: this.props.boxColor, borderRadius: 5,}]}
        onPress={ () => this.props.onClick() }
      >
        <Text style={[styles.fontFa, {color: this.props.boxColor}]}>
          {this.props.placeholder}
        </Text>
        <Text style={[styles.fontFa, { color: this.props.boxColor}]}>▼</Text>
      </TouchableOpacity>
    )
  }
}

/*
let pickerThis;
class Picker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      optionsArray: {"aaalll": "aaalll"},
      key: 0,
    }
    pickerThis = this
  }

  componentDidMount() {
    console.log(this.props.optionsArray)
    this.setState({
      optionsArray: this.props.optionsArray
    })
  }

  render() {
    return (
      <CustomMultiPicker
        key={this.state.key}
        labelStyle={[styles.fontFa]}
        /* scrollViewStyle={{backgroundColor: "pink"}}
        itemStyle={{backgroundColor: "blue"}}
        selectedIconStyle={{backgroundColor: "red"}}
        unselectedIconStyle={{backgroundColor: "green"}}   
        modalViewStyle={[
          {
            backgroundColor: "white",
            width: 300,
            top: ((Dimensions.get('window').height / 2) - 108), 
            left: ((Dimensions.get('window').width / 2) - 150)
          }, 
          styles.rounded2, 
          styles.zDepth1
        ]}

        searchViewStyle={[
          styles.removeOutline, 
          styles.textRight, 
          styles.mr3, 
          styles.fontFa, 
          {
            borderWidth: 0,
            borderBottomWidth: 1, 
            borderRadius: 0, 
            borderColor: '#b7b6b6'
          }
        ]}

        options={this.state.optionsArray}

        search={this.props.isSearchable} 
        multiple={this.props.isMulti} 

        placeholder={"... جستجو"}
        placeholderTextColor={'#757575'}

        returnValue={"label"}
        callback={(res)=>{ this.props.onChangeFunc(res) }} 

        rowBackgroundColor={"#eee"}
        rowHeight={40}
        rowRadius={3}

        searchIconName="search"
        searchIconColor={colorSecondary}
        searchIconSize={18}
        
        iconColor={colorSecondary}
        iconSize={30}
        selectedIconName={"ios-checkmark-circle-outline"}
        unselectedIconName={"ios-radio-button-off-outline"}

        scrollViewHeight={215}
        selected={this.props.defaultVal}
      />
    )
  }
} */