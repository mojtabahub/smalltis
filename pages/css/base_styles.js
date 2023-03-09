//export { Home as default } from '../App'
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions, Platform } from "react-native";
import { pm1, pm2, pm3, pm4, pm5 } from "../connection/gutter";
import { sm, md, lg, xl, xxl } from "../connection/screen_size";
import {
  colorGray,
  colorPrimary,
  colorSecondary,
  colorWhite,
} from "../connection/color";

var MyStyleFuncThis;
export default class MyStyleFunc extends React.Component {
  constructor(props) {
    super(props);
    MyStyleFuncThis = this;
  }

  componentDidMount() {
    if (Platform.OS == "web") window.addEventListener("resize", handleResize);
  }

  render() {
    return <></>;
  }
}

export const styles = StyleSheet.create({
  zDepth0: {
    shadowOpacity: 0.0,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 0,
  },
  zDepth1: {
    shadowOpacity: 0.35,
    shadowRadius: 7,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    elevation: 20,
  },
  zDepth2: {
    shadowOpacity: 0.55,
    shadowRadius: 11,
    shadowOffset: {
      height: 6,
      width: 6,
    },
    elevation: 20,
  },
  zDepth3: {
    shadowOpacity: 0.35,
    shadowRadius: 7,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    elevation: 20,
  },
  headerShadow: {
    backgroundColor: "white",
    shadowOpacity: 0.35,
    shadowRadius: 7,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    elevation: 10,
  },
  headerShadowRegister: {
    backgroundColor: "rgba(10, 10, 10, 0.1)",
    shadowOpacity: 0.35,
    shadowRadius: 7,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    elevation: 10,
  },
  footerShadow: {
    backgroundColor: "white",
    shadowOpacity: 0.5,
    shadowRadius: 20,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    elevation: 30,
  },
  removeOutline: outLineSet(),
  buttonCircle: {
    flexDirection: "row-reverse",
    paddingTop: pm3,
    paddingRight: pm1,
    borderRadius: 25,
    marginTop: pm2,
    backgroundColor: colorPrimary,
    width: 40,
    height: 40,
    marginHorizontal: pm2,
  },
  fontFa: {
    fontFamily: "EstedadMedium",
  },
  textLeft: {
    textAlign: "left",
  },
  textCenter: {
    textAlign: "center",
  },
  textRight: {
    textAlign: "right",
  },

  mt1: {
    marginTop: pm1,
  },
  mt2: {
    marginTop: pm2,
  },
  mt3: {
    marginTop: pm3,
  },
  mt4: {
    marginTop: pm4,
  },
  mt5: {
    marginTop: pm5,
  },

  mb1: {
    marginBottom: pm1,
  },
  mb2: {
    marginBottom: pm2,
  },
  mb3: {
    marginBottom: pm3,
  },
  mb4: {
    marginBottom: pm4,
  },
  mb5: {
    marginBottom: pm5,
  },

  mr1: {
    marginRight: pm1,
  },
  mr2: {
    marginRight: pm2,
  },
  mr3: {
    marginRight: pm3,
  },
  mr4: {
    marginRight: pm4,
  },
  mr5: {
    marginRight: pm5,
  },

  ml1: {
    marginLeft: pm1,
  },
  ml2: {
    marginLeft: pm2,
  },
  ml3: {
    marginLeft: pm3,
  },
  ml4: {
    marginLeft: pm4,
  },
  ml5: {
    marginLeft: pm5,
  },

  m1: {
    margin: pm1,
  },
  m2: {
    margin: pm2,
  },
  m3: {
    margin: pm3,
  },
  m4: {
    margin: pm4,
  },
  m5: {
    margin: pm5,
  },

  mv1: {
    marginVertical: pm1,
  },
  mv2: {
    marginVertical: pm2,
  },
  mv3: {
    marginVertical: pm3,
  },
  mv4: {
    marginVertical: pm4,
  },
  mv5: {
    marginVertical: pm5,
  },

  mh1: {
    marginHorizontal: pm1,
  },
  mh2: {
    marginHorizontal: pm2,
  },
  mh3: {
    marginHorizontal: pm3,
  },
  mh4: {
    marginHorizontal: pm4,
  },
  mh5: {
    marginHorizontal: pm5,
  },

  pt1: {
    paddingTop: pm1,
  },
  pt2: {
    paddingTop: pm2,
  },
  pt3: {
    paddingTop: pm3,
  },
  pt4: {
    paddingTop: pm4,
  },
  pt5: {
    paddingTop: pm5,
  },

  pb1: {
    paddingBottom: pm1,
  },
  pb2: {
    paddingBottom: pm2,
  },
  pb3: {
    paddingBottom: pm3,
  },
  pb4: {
    paddingBottom: pm4,
  },
  pb5: {
    paddingBottom: pm5,
  },

  pr1: {
    paddingRight: pm1,
  },
  pr2: {
    paddingRight: pm2,
  },
  pr3: {
    paddingRight: pm3,
  },
  pr4: {
    paddingRight: pm4,
  },
  pr5: {
    paddingRight: pm5,
  },

  pl1: {
    paddingLeft: pm1,
  },
  pl2: {
    paddingLeft: pm2,
  },
  pl3: {
    paddingLeft: pm3,
  },
  pl4: {
    paddingLeft: pm4,
  },
  pl5: {
    paddingLeft: pm5,
  },

  pv1: {
    paddingVertical: pm1,
  },
  pv2: {
    paddingVertical: pm2,
  },
  pv3: {
    paddingVertical: pm3,
  },
  pv4: {
    paddingVertical: pm4,
  },
  pv5: {
    paddingVertical: pm5,
  },

  ph1: {
    paddingHorizontal: pm1,
  },
  ph2: {
    paddingHorizontal: pm2,
  },
  ph3: {
    paddingHorizontal: pm3,
  },
  ph4: {
    paddingHorizontal: pm4,
  },
  ph5: {
    paddingHorizontal: pm5,
  },

  p1: {
    padding: pm1,
  },
  p2: {
    padding: pm2,
  },
  p3: {
    padding: pm3,
  },
  p4: {
    padding: pm4,
  },
  p5: {
    padding: pm5,
  },

  justifyContentCenter: {
    justifyContent: "center",
  },
  justifyContentStart: {
    justifyContent: "flex-start",
  },
  justifyContentEnd: {
    justifyContent: "flex-end",
  },
  justifyContentAround: {
    justifyContent: "space-around",
  },
  justifyContentBetween: {
    justifyContent: "space-between",
  },

  alignItemsCenter: {
    alignItems: "center",
  },
  alignItemsStart: {
    alignItems: "flex-start",
  },
  alignItemsEnd: {
    alignItems: "flex-end",
  },
  alignItemsStretch: {
    alignItems: "stretch",
  },

  textWhite: {
    color: "white",
  },
  textBlack: {
    color: "black",
  },
  textPrimary: {
    color: "rgb(12, 142, 230)",
  },
  textSecondary: {
    color: "rgb(239, 197, 0)",
  },
  textGary: {
    color: "#4f4f4f",
  },
  textGaryLight: {
    color: "rgb(202, 202, 202)",
  },
  font8: {
    fontSize: 8,
  },
  font10: {
    fontSize: 10,
  },
  font11: {
    fontSize: 11,
  },
  font12: {
    fontSize: 12,
  },
  font13: {
    fontSize: 13,
  },
  font14: {
    fontSize: 14,
  },
  font15: {
    fontSize: 15,
  },
  font16: {
    fontSize: 16,
  },
  font18: {
    fontSize: 18,
  },
  font20: {
    fontSize: 20,
  },
  font22: {
    fontSize: 22,
  },
  btnPrimary: {
    backgroundColor: colorPrimary,
    borderRadius: 3,
    paddingHorizontal: 30,
    paddingVertical: 12,

    shadowOpacity: 0.35,
    shadowRadius: 7,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    elevation: 20,
  },
  hr: {
    height: 0,
    width: "97%",
    borderBottomColor: "rgb(233, 236, 239)",
    borderBottomWidth: 1,
    marginVertical: 6,
  },
  hr2: {
    height: 0,
    width: "92%",
    borderBottomColor: "rgb(173, 173, 173)",
    borderBottomWidth: 1,
    marginVertical: 6,
  },
  hr3: {
    height: 0,
    borderBottomColor: colorSecondary,
    borderBottomWidth: 1,
    marginVertical: 6,
  },
  dNone: {
    display: "none",
  },
  dBlock: {
    display: "flex",
  },
  footerWebStyle: footerWebStyle(),
  headerWebStyle: headerWebStyle(),
  positionAbs: {
    position: "absolute",
  },
  postionFixed: postionFixed(),
  scrollPaddingWeb: {
    paddingVertical: 80,
    paddingHorizontal: pm2,
  },
  scrollPaddingAndroid: {
    padding: pm2,
  },
  footerFlexView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  footerBaseStyle: {
    backgroundColor: "white",
    height: 60,
    zIndex: 1050,
    flexDirection: "row",
  },
  rounded1: {
    borderRadius: 3,
  },
  rounded2: {
    borderRadius: 4,
  },
  rounded3: {
    borderRadius: 5,
  },
  roundedTop: {
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
  },
  roundedBottom: {
    borderBottomRightRadius: 4,
    borderBottomLeftRadius: 4,
  },
  roundedRight: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  roundedLeft: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  roundedCircle: {
    borderRadius: 50000,
  },
  roundedPill: {
    borderRadius: 800,
  },
  card: {
    borderRadius: 4,
    backgroundColor: "white",
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    elevation: 10,
  },
  cardReg: {
    borderRadius: 4,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    elevation: 10,
  },
  mdTabs: {
    backgroundColor: colorPrimary,
    marginBottom: -40,
    zIndex: 1,
    borderRadius: 4,
    shadowOpacity: 0.35,
    shadowRadius: 7,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    elevation: 20,
  },
  middleElement: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  homeProductMEnter: {
    borderColor: colorPrimary,
    borderWidth: 3,
  },
  homeProductMLeave: {
    borderColor: "rgba(0, 0, 0, 0)",
    borderWidth: 3,
  },
});

function handleResize() {
  //displayStyleSetup()
  rowStyleSetup();
  MyStyleFuncThis.props.class.forceUpdate();
  /* containerRegTabSetup();
  containerRegSetup(); */

  //console.log("Resizing")
}

export var styleRow;
rowStyleSetup();

export function rowStyleSetup() {
  //console.log("here")

  styleRow = StyleSheet.create({
    row: rowBaseSetup(),
    colOfRow: { width: "100%" },
    col: colSetup(0, 100),
    col1: colSetup(1, 100),
    col2: colSetup(2, 100),
    col3: colSetup(3, 100),
    col4: colSetup(4, 100),
    col5: colSetup(5, 100),
    col6: colSetup(6, 100),
    col7: colSetup(7, 100),
    col8: colSetup(8, 100),
    col9: colSetup(9, 100),
    col10: colSetup(10, 100),
    col11: colSetup(11, 100),
    col12: colSetup(12, 100),

    colSM: colSetup(0, sm),
    colSM1: colSetup(1, sm),
    colSM2: colSetup(2, sm),
    colSM3: colSetup(3, sm),
    colSM4: colSetup(4, sm),
    colSM5: colSetup(5, sm),
    colSM6: colSetup(6, sm),
    colSM7: colSetup(7, sm),
    colSM8: colSetup(8, sm),
    colSM9: colSetup(9, sm),
    colSM10: colSetup(10, sm),
    colSM11: colSetup(11, sm),
    colSM12: colSetup(12, sm),

    colMD: colSetup(0, md),
    colMD1: colSetup(1, md),
    colMD2: colSetup(2, md),
    colMD3: colSetup(3, md),
    colMD4: colSetup(4, md),
    colMD5: colSetup(5, md),
    colMD6: colSetup(6, md),
    colMD7: colSetup(7, md),
    colMD8: colSetup(8, md),
    colMD9: colSetup(9, md),
    colMD10: colSetup(10, md),
    colMD11: colSetup(11, md),
    colMD12: colSetup(12, md),

    colLG: colSetup(0, lg),
    colLG1: colSetup(1, lg),
    colLG2: colSetup(2, lg),
    colLG3: colSetup(3, lg),
    colLG4: colSetup(4, lg),
    colLG5: colSetup(5, lg),
    colLG6: colSetup(6, lg),
    colLG7: colSetup(7, lg),
    colLG8: colSetup(8, lg),
    colLG9: colSetup(9, lg),
    colLG10: colSetup(10, lg),
    colLG11: colSetup(11, lg),
    colLG12: colSetup(12, lg),

    colXL: colSetup(0, xl),
    colXL1: colSetup(1, xl),
    colXL2: colSetup(2, xl),
    colXL3: colSetup(3, xl),
    colXL4: colSetup(4, xl),
    colXL5: colSetup(5, xl),
    colXL6: colSetup(6, xl),
    colXL7: colSetup(7, xl),
    colXL8: colSetup(8, xl),
    colXL9: colSetup(9, xl),
    colXL10: colSetup(10, xl),
    colXL11: colSetup(11, xl),
    colXL12: colSetup(12, xl),

    colXXL: colSetup(0, xxl),
    colXXL1: colSetup(1, xxl),
    colXXL2: colSetup(2, xxl),
    colXXL3: colSetup(3, xxl),
    colXXL4: colSetup(4, xxl),
    colXXL5: colSetup(5, xxl),
    colXXL6: colSetup(6, xxl),
    colXXL7: colSetup(7, xxl),
    colXXL8: colSetup(8, xxl),
    colXXL9: colSetup(9, xxl),
    colXXL10: colSetup(10, xxl),
    colXXL11: colSetup(11, xxl),
    colXXL12: colSetup(12, xxl),
    outContainer: { flex: 1 },
    container: containerSetup(),
    containerTab: containerTabSetup(),
    containerReg: containerRegSetup(),
    containerRegTab: containerRegTabSetup(),
    containerRegTerm: containerRegTermSetup(),
    containerRegTermTab: containerRegTermTabSetup(),
  });
}

function rowBaseSetup() {
  if (Platform.OS == "web") {
    return { flex: 0, flexWrap: "wrap", flexDirection: "row-reverse" };
  } else {
    return { flex: 0, flexWrap: "wrap", };
  }
}

function colSetup(num, size) {
  let screenWidth = Dimensions.get("window").width;

  if (screenWidth >= size) {
    switch (num) {
      case 0:
        return {
          flex: 1,
          flexShrink: 0,
          flexBasis: "auto",
          width: "auto",
        };
        break;
      case 1:
        return {
          flex: 1,
          flexShrink: 0,
          flexBasis: "auto",
          width: "8.3333333333%",
        };
        break;
      case 2:
        return {
          flex: 1,
          flexShrink: 0,
          flexBasis: "auto",
          width: "16.6666666667%",
        };
        break;
      case 3:
        return {
          flex: 1,
          flexShrink: 0,
          flexBasis: "auto",
          width: "25%",
        };
        break;
      case 4:
        return {
          flex: 1,
          flexShrink: 0,
          flexBasis: "auto",
          width: "33.3333333333%",
        };
        break;
      case 5:
        return {
          flex: 1,
          flexShrink: 0,
          flexBasis: "auto",
          width: "41.6666666667%",
        };
        break;
      case 6:
        return {
          flex: 1,
          flexShrink: 0,
          flexBasis: "auto",
          width: "50%",
        };
        break;
      case 7:
        return {
          flex: 1,
          flexShrink: 0,
          flexBasis: "auto",
          width: "58.3333333333%",
        };
        break;
      case 8:
        return {
          flex: 1,
          flexShrink: 0,
          flexBasis: "auto",
          width: "66.6666666667%",
        };
        break;
      case 9:
        return {
          flex: 1,
          flexShrink: 0,
          flexBasis: "auto",
          width: "75%",
        };
        break;
      case 10:
        return {
          flex: 1,
          flexShrink: 0,
          flexBasis: "auto",
          width: "83.3333333333%",
        };
        break;
      case 11:
        return {
          flex: 1,
          flexShrink: 0,
          flexBasis: "auto",
          width: "91.6666666667%",
        };
        break;
      case 12:
        return {
          flex: 1,
          flexShrink: 0,
          flexBasis: "auto",
          width: "100%",
        };
        break;
    }
  } else {
    /* return {
      flex:1,
      flexShrink:0,
      flexBasis: 'auto',
      width: "100%",
    }  */
  }
}

/* 
export var styleDiplay;
displayStyleSetup()

function displayStyleSetup() {
  styleDiplay = StyleSheet.create({
    dNone: {display: 'none'},
    dBlock: {display: 'flex'},
    dSMNone: dNoneSetup(sm),
    dLGNone: dNoneSetup(lg),
    dXLNone: dNoneSetup(xl), 
    dMDNone: dNoneSetup(md),
  })
}

function dNoneSetup(size) {
  let screenWidths = Dimensions.get('window').width

  if (!(screenWidths < size)) {
    screenWidths < size ? console.log('1none-small -> ' + size) : console.log('2none-large -> ' + size)
    return {display: 'none'}
  } else {
    screenWidths < size ? console.log('3none-small -> ' + size) : console.log('4none-large -> ' + size)
    return {display: 'flex'}
  }
}

function dBlockSetup(size) {
  
  let screenWidthz = parseInt(Dimensions.get('window').width)

  //screenWidthz > size ? console.log('block-large = ' + screenWidthz + "-" + size) : console.log('block-small = ' + screenWidthz + "-" + size)

  if (screenWidthz > size) {
    console.log("display - " + screenWidthz + " - " + size)
    return {display: 'flex'};
  } 
} 
*/

function outContainerSetup() {
  let screenWidth = Dimensions.get("window").width;
  if (screenWidth >= xxl) {
    return { flex: 1 };
  }

  if (screenWidth >= xl && screenWidth < xxl) {
    return { flex: 1 };
  }

  if (screenWidth >= lg && screenWidth < xl) {
    return { flex: 1 };
  }

  if (screenWidth >= md && screenWidth < lg) {
    return { flex: 1 };
  }

  if (screenWidth >= sm && screenWidth < md) {
    return { flex: 1 };
  }

  if (screenWidth < sm) {
    return { flex: 0 };
  }
}

function containerSetup() {
  let screenWidth = Dimensions.get("window").width;
  let styleObj = {};
  if (screenWidth >= xxl) {
    styleObj = { width: 1320 };
  }

  if (screenWidth >= xl && screenWidth < xxl) {
    styleObj = { width: 1140 };
  }

  if (screenWidth >= lg && screenWidth < xl) {
    styleObj = { width: 960 };
  }

  if (screenWidth >= md && screenWidth < lg) {
    styleObj = { width: "97%" };
  }

  if (screenWidth >= sm && screenWidth < md) {
    styleObj = { width: "97%" };
  }

  if (screenWidth < sm) {
    styleObj = { width: "100%" };
  }

  //console.log("screenWidth=" + screenWidth + " -Width= " + styleObj.width)
  return styleObj;
}

function containerTabSetup() {
  let screenWidth = Dimensions.get("window").width;
  let styleObj = {};
  if (screenWidth >= xxl) {
    styleObj = { width: 1260 };
  }

  if (screenWidth >= xl && screenWidth < xxl) {
    styleObj = { width: 1060 };
  }

  if (screenWidth >= lg && screenWidth < xl) {
    styleObj = { width: 880 };
  }

  if (screenWidth >= md && screenWidth < lg) {
    styleObj = { width: "90%" };
  }

  if (screenWidth >= sm && screenWidth < md) {
    styleObj = { width: "90%" };
  }

  if (screenWidth < sm) {
    styleObj = { width: "92%" };
  }

  //console.log("screenWidth=" + screenWidth + " -Width= " + styleObj.width)
  return styleObj;
}

function containerRegSetup() {
  let screenWidth = Dimensions.get("window").width;
  let styleObj = {};
  if (screenWidth >= xxl) {
    styleObj = { width: "32vw" };
  }

  if (screenWidth >= xl && screenWidth < xxl) {
    styleObj = { width: "42vw" };
  }

  if (screenWidth >= lg && screenWidth < xl) {
    styleObj = { width: "50vw" };
  }

  if (screenWidth >= md && screenWidth < lg) {
    styleObj = { width: "62vw" };
  }

  if (screenWidth >= sm && screenWidth < md) {
    styleObj = { width: "75vw" };
  }

  if (screenWidth < sm) {
    styleObj = { width: "98vw" };
  }

  //console.log("screenWidth=" + screenWidth + " -Width= " + styleObj.width)
  return styleObj;
}

function containerRegTabSetup() {
  let screenWidth = Dimensions.get("window").width;

  let styleObj = {};
  if (screenWidth >= xxl) {
    styleObj = { width: "27vw" };
  }

  if (screenWidth >= xl && screenWidth < xxl) {
    styleObj = { width: "35vw" };
  }

  if (screenWidth >= lg && screenWidth < xl) {
    styleObj = { width: "43vw" };
  }

  if (screenWidth >= md && screenWidth < lg) {
    styleObj = { width: "55vw" };
  }

  if (screenWidth >= sm && screenWidth < md) {
    styleObj = { width: "68vw" };
  }

  if (screenWidth < sm) {
    styleObj = { width: "89vw" };
  }

  return styleObj;
}


function containerRegTermSetup() {
  let screenWidth = Dimensions.get("window").width;
  let styleObj = {};
  if (screenWidth >= xxl) {
    styleObj = { width: "62vw" };
  }

  if (screenWidth >= xl && screenWidth < xxl) {
    styleObj = { width: "62vw" };
  }

  if (screenWidth >= lg && screenWidth < xl) {
    styleObj = { width: "72vw" };
  }

  if (screenWidth >= md && screenWidth < lg) {
    styleObj = { width: "82vw" };
  }

  if (screenWidth >= sm && screenWidth < md) {
    styleObj = { width: "92vw" };
  }

  if (screenWidth < sm) {
    styleObj = { width: "98vw" };
  }

  //console.log("screenWidth=" + screenWidth + " -Width= " + styleObj.width)
  return styleObj;
}

function containerRegTermTabSetup() {
  let screenWidth = Dimensions.get("window").width;

  let styleObj = {};
  if (screenWidth >= xxl) {
    styleObj = { width: "57vw" };
  }

  if (screenWidth >= xl && screenWidth < xxl) {
    styleObj = { width: "57vw" };
  }

  if (screenWidth >= lg && screenWidth < xl) {
    styleObj = { width: "67vw" };
  }

  if (screenWidth >= md && screenWidth < lg) {
    styleObj = { width: "77vw" };
  }

  if (screenWidth >= sm && screenWidth < md) {
    styleObj = { width: "85vw" };
  }

  if (screenWidth < sm) {
    styleObj = { width: "89vw" };
  }

  return styleObj;
}

function outLineSet() {
  if (Platform.OS == "web") {
    return { outlineWidth: 0 };
  } else {
    return;
  }
}

function footerWebStyle() {
  if (Platform.OS == "web") {
    return {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
    };
  } else {
    return {
      position: "relative",
    };
  }
}

function headerWebStyle() {
  if (Platform.OS == "web") {
    return {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
    };
  } else {
    return {
      position: "relative",
    };
  }
}

function postionFixed() {
  if (Platform.OS == "web") {
    return {
      position: "fixed",
    };
  } else {
    return {
      position: "absolute",
    };
  }
}
