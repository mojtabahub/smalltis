
import React from 'react'
import { View, Text, Dimensions, Platform, Image, Button, TouchableOpacity, TextInput, ScrollView, Keyboard  } from 'react-native'
import { sm, md, lg, xl, xxl } from '../connection/screen_size'
import { pm1, pm2, pm3, pm4, pm5 } from '../connection/gutter'
import { smalltisUrl } from '../connection/base'
import {colorGray, colorPrimary, colorSecondary, colorWhite} from '../connection/color'
import MyStyleFunc, { styles, styleRow } from '../css/base_styles'
import { Link, useRouting } from 'expo-next-react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconMI from 'react-native-vector-icons/MaterialIcons';
import { StatusBarHeight } from '../calc/statusBarHeight'
import {getTableAllData, getTablesColumnName, addTableAllDataToEval} from '../scripts/share'

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
                      searchBarBorderColor : "rgb(200, 200, 200)",
                      searchBarBorderStyle : "solid",
                      searchAreaDisplay: false,
                      backdropSearchBarDisplay: false,
                      sabtAgahiOverColor: colorGray,
                      listMahsolOverColor: colorGray,
                      listButtonItemsOver: [true, false, false, false, false, false, false, false],
                      listInsideHeadersOver: [false, false, false, false, false, false, false, false],
                      showListMahsol: false,
                      listInsideItemsOver: [
                          [
                              false, false, false, false, false, false, false, false,
                          ],
                          [
                              false, false, false, false, false, false, false, false,
                          ],
                          [
                              false, false, false, false, false, false, false, false,
                          ],
                          [
                              false, false, false, false, false, false, false, false,
                          ],
                          [
                              false, false, false, false, false, false, false, false,
                          ],
                          [
                              false, false, false, false, false, false, false, false,
                          ],
                          [
                              false, false, false, false, false, false, false, false,
                          ],
                          [
                              false, false, false, false, false, false, false, false,
                          ],
                      ],
                      listInnerItemsWidth: "100%",
                      categoryListButtonsArray: [],
                      categoryListHeaderArray: [],
                      categoryListAllArray: [],
                      show8ListBaseView: [true, true, true, true, true, true, true, true,],
                      middleOfNavDisplay: true,
                      barIconDisplay: false,
                      smalltisNavLogoDiplay: true,
                      navItemsDispaly: true,
                      navOptionsDisplay: 'none',
                      navOptionsDropDisplay: false,
                      isSideNaveShow: false,
                      showSideNavList: [false, false, false, false, false, false, false, false,],
                      sideNaveButtonIcon: ['keyboard-arrow-down', 'keyboard-arrow-down', 'keyboard-arrow-down', 'keyboard-arrow-down', 'keyboard-arrow-down', 'keyboard-arrow-down', 'keyboard-arrow-down', 'keyboard-arrow-down',],
                      isForDisplaySideNavList: false,
                    };

        TopNavbarClassThis = this;
    }
      
    componentDidMount() { 
        //console.log(this.props.route.name)

        if (Platform.OS == "web") window.addEventListener('resize', handleResize)
        bootstrapNavbar()

        showCategoriesInList(0)
    }

    hideBackdrop = () => {
        this.setState({
            searchbarHeigh: 42,
            searchBarPos: "relative",
            searchBarShadow: false,
            searchAreaDisplay: false,
            backdropSearchBarDisplay: false,
            navOptionsDropDisplay: false,
        },() => {
            isNavOptionOpened = false;
        })
        this.refs['email_input'].blur()
    }

    toggleSideNaveShow = () => {
        this.setState({
            isSideNaveShow: !this.state.isSideNaveShow
        });
    }
    
    render() {
        return (
            <> 
                {this.props.fontLoaded ? ( 
                    <> 
                        <View style={{height: StatusBarHeight, backgroundColor: "rgba(50, 50, 50, 0.2)"}}></View>
                        { this.state.backdropSearchBarDisplay ? (
                            <TouchableOpacity 
                                style={[{
                                    alignSelf:'center',
                                    flex:9,
                                    left:0,
                                    top:0,
                                    zIndex:1,
                                    height: Dimensions.get('window').height,
                                    width: Dimensions.get('window').width,
                                    backgroundColor: 'rgba(52, 52, 52, 0.8)',
                                },
                                styles.postionFixed,
                                ]}
                                onPress={()=> this.hideBackdrop()}
                            />
                        ) : (
                            <></>
                        )}
                        
                            

                        <View 
                            style={[
                                {zIndex:1000, position:"relative",  backgroundColor: 'white'},
                                styles.headerWebStyle
                            ]}
                            onStartShouldSetResponder={
                                () => this.setState({
                                    showListMahsol: false
                                })
                            }
                        >
                            <View style={[{height: 80, flexDirection: 'row'}, styles.headerShadow]}>
                                <View style={{flex: this.state.outContainer}} />
                                <View style={{width: this.state.Container, }}>
                                    <View style={{flexDirection: 'row-reverse'}}>
                                        <View style={{flex: this.state.rightNav, height: 80, alignItems: "flex-end"}}>
                                            <View style={{flex: 1, flexDirection: 'row-reverse', width: "100%",  backgroundColor: 'white' }}>
                                                {this.state.barIconDisplay ? (
                                                    <View>
                                                        <TouchableOpacity 
                                                                onPress={() => 
                                                                            this.setState({ 
                                                                                isSideNaveShow: true
                                                                            })
                                                                        } 
                                                        >
                                                            <Icon
                                                                style={{
                                                                    paddingTop: pm3,
                                                                    paddingRight: pm2,
                                                                    color: colorPrimary, 
                                                                }}
                                                                name="bars"
                                                                size={30}
                                                            />
                                                        </TouchableOpacity>
                                                    </View>
                                                ) : (
                                                    <></>
                                                )}
                                                
                                                {this.state.smalltisNavLogoDiplay ? (
                                                    <Link web={{ as: "/", path: "/" }} routeName="home">
                                                        <View style={{
                                                            flexDirection: 'row-reverse',
                                                            paddingTop: pm3,
                                                            paddingRight: pm2,
                                                        }}
                                                    >
                                                            <Image resizeMode='contain' source={{uri: smalltisUrl + '/image/logo/logo-st.png'}} style={{width: 53, height: 53, marginTop: -pm2}}  />
                                                            <Text style={[{height: 50, padding: pm2, paddingTop: pm1, fontSize: 15, color: colorPrimary },styles.fontFa]}>اسمالتیس</Text>
                                                        </View>
                                                    </Link>
                                                ) : (
                                                    <></>
                                                )}
                                                { this.state.middleOfNavDisplay ? (
                                                    <View style={{flexDirection: 'row-reverse', paddingTop: pm3, paddingRight: pm4}}>
                                                    <TouchableOpacity 
                                                        onMouseLeave={() => this.setState({listMahsolOverColor: colorGray}) } 
                                                        onMouseEnter={() => this.setState({
                                                            listMahsolOverColor: colorPrimary,
                                                            showListMahsol: true,
                                                        },() => {
                                                            //console.log(this.state.listMahsolOverColor)
                                                        })}
                                                    >
                                                        <Link
                                                            web={{ as: "/list/" + this.props.ifsn, path: "/list/" + this.props.ifsn }} 
                                                            routeName="list" 
                                                        >
                                                            <View style={{flexDirection: 'row-reverse'}}>
                                                                <Icon
                                                                    style={{paddingTop: pm2, paddingRight: pm2, color: this.state.listMahsolOverColor}}
                                                                    name="list"
                                                                    size={15}
                                                                />
                                                                <Text style={[{paddingTop: pm1, paddingRight: pm2, color: this.state.listMahsolOverColor}, styles.fontFa]}>لیست محصولات</Text>
                                                            </View>
                                                        </Link>
                                                    </TouchableOpacity>
                                                </View>
                                                
                                                ) : (
                                                    <></>
                                                )}
                                                { this.state.navItemsDispaly ? (

                                                    <View style={{
                                                        flexDirection: 'row-reverse',
                                                        paddingTop: pm3,
                                                        paddingRight: pm4,}}
                                                    >
                                                        <View 
                                                            style={{flexDirection: 'row-reverse'}} 
                                                            onMouseLeave={() => this.setState({sabtAgahiOverColor: colorGray}) } 
                                                            onMouseEnter={() => this.setState({sabtAgahiOverColor: colorPrimary})}
                                                        >
                                                            <Icon
                                                                style={{paddingTop: pm2, paddingRight: pm2, color: this.state.sabtAgahiOverColor}}
                                                                name="plus-circle"
                                                                size={15}
                                                            />
                                                            <Link style={[{paddingTop: pm1, paddingRight: pm2, color: this.state.sabtAgahiOverColor},styles.fontFa]}  
                                                                web={{ as: "/advertisement/" + this.props.ifsn, path: "/advertisement/" + this.props.ifsn }} 
                                                                routeName="advertisement"
                                                            >
                                                                ثبت آگهی
                                                            </Link>
                                                        </View>
                                                    </View>
                                            
                                                ) : (
                                                    <></>
                                                )}
                                            </View>
                                        </View>
                                        { this.state.middleOfNavDisplay ? (
                                            <View style={{flex: this.state.middleNav, height: 80}} >
                                                <View style={{flexDirection: 'row-reverse', justifyContent:"flex-end", height: 80, paddingTop: pm2,  /* backgroundColor: 'skyblue' */ }} >
                                                    { this.state.navItemsDispaly ? (
                                                        <>
                                                            <Link web={{ as: "/register/" + this.props.ifsn, path: "/register/" + this.props.ifsn }} routeName="register">
                                                                <View style={[{flexDirection: 'row-reverse', paddingTop: pm3, paddingRight: pm1, borderColor: colorPrimary, borderWidth: 3 , paddingHorizontal: pm4, borderRadius:25, marginTop: pm2, backgroundColor: "white",  marginHorizontal: pm2, height: 50,
                                                                                
                                                                            }, styles.zDepth1]}
                                                                >
                                                                    <Icon
                                                                        style={{paddingTop: -pm2, paddingRight: pm2, color: colorGray}}
                                                                        name="user-alt"
                                                                        size={15}
                                                                    />
                                                                    <Text style={[{marginTop: -pm1, paddingRight: pm2, paddingBottom: pm2, color: colorGray},styles.fontFa]}>حساب کاربری</Text>
                                                                </View>
                                                            </Link>
                                                            <Link web={{ as: "/sell/" + this.props.ifsn, path: "/sell/" + this.props.ifsn }} routeName="sell">
                                                                <View style={[styles.buttonCircle, styles.zDepth1]}
                                                                >
                                                                    <Icon
                                                                        style={{paddingTop: -pm2, marginTop: -pm1, paddingRight: pm2, color: colorWhite}}
                                                                        name="shopping-cart"
                                                                        size={20}
                                                                    />
                                                                </View>
                                                            </Link>
                                                            <Link web={{ as: "/cash-register/" + this.props.ifsn, path: "/cash-register/" + this.props.ifsn }} routeName="cash-register">
                                                                <View style={[styles.buttonCircle, styles.zDepth1]}
                                                                >
                                                                    <Icon
                                                                        style={{paddingTop: -pm3, marginTop: -pm1, paddingRight: pm2, color: colorWhite}}
                                                                        name="cash-register"
                                                                        size={20}
                                                                    />
                                                                </View>
                                                            </Link>
                                                            
                                                        </>
                                                    ) : ( 
                                                        <></>
                                                    )}
                                                    <View>
                                                        { this.state.navOptionsDisplay ? (
                                                            <TouchableOpacity 
                                                                onPress={() => { 
                                                                    if (isNavOptionOpened) {
                                                                        this.setState({
                                                                            navOptionsDropDisplay: false,
                                                                            showListMahsol: false,
                                                                            backdropSearchBarDisplay: false,
                                                                        })
                                                                        isNavOptionOpened = false;
                                                                    } else {
                                                                        this.setState({
                                                                            navOptionsDropDisplay: true,
                                                                            showListMahsol: false,
                                                                            backdropSearchBarDisplay: true,
                                                                        })
                                                                        isNavOptionOpened = true;
                                                                    }
                                                                }}
                                                            >
                                                                <View style={[{flexDirection:'row'}, styles.btnPrimary]}>
                                                                    <IconMI
                                                                        style={{paddingTop: pm1, marginTop: -pm1, paddingRight: pm1, color: colorWhite}}
                                                                        name="arrow-drop-down"
                                                                        size={20}
                                                                    />
                                                                    <Text style={[{color: colorWhite,}, styles.fontFa]}>گزینه ها</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        ) : (
                                                            <></>
                                                        )}

                                                        { this.state.navOptionsDropDisplay ? (
                                                            <View 
                                                                style={[
                                                                            {
                                                                                backgroundColor: colorWhite,
                                                                                position:'absolute',
                                                                                top: 52,
                                                                                borderRadius: 3,
                                                                                borderWidth: 1,
                                                                                borderColor: 'rgba(0, 0, 0, 0.15)',
                                                                                flexDirection: 'column',
                                                                            },
                                                                            styles.alignItemsEnd,
                                                                            

                                                                        ]
                                                                    }
                                                            >
                                                                <Link 
                                                                    style={[{flexDirection: 'row-reverse'}, styles.ph5, styles.pb2, styles.mb2]} 
                                                                    web={{ as: "/advertisement/" + this.props.ifsn, path: "/advertisement/" + this.props.ifsn }} routeName="advertisement"
                                                                >   <View style={[{flexDirection: 'row', }]}>
                                                                        <View>
                                                                            <Text style={[{flex:9, paddingTop: pm1, paddingRight: pm2, color: colorGray},styles.fontFa]}  >
                                                                                ثبت آگهی
                                                                            </Text>
                                                                        </View>
                                                                        <Icon
                                                                            style={{flex: 3, paddingTop: pm2, paddingRight: pm2, color: colorGray}}
                                                                            name="plus-circle"
                                                                            size={15}
                                                                        />
                                                                    </View>
                                                                </Link>
                                                                <View style={[styles.hr]} />
                                                                <Link 
                                                                    style={[{flexDirection: 'row-reverse'}, styles.pv2]} 
                                                                    web={{ as: "/sell/" + this.props.ifsn, path: "/sell/" + this.props.ifsn }} routeName="sell"
                                                                >
                                                                    <Text style={[{marginTop: -pm2, paddingRight: pm2, color: colorGray},styles.fontFa]}  >
                                                                        سبد خرید
                                                                    </Text>
                                                                    <View style={[styles.buttonCircle, styles.zDepth1]}
                                                                    >
                                                                        <Icon
                                                                            style={{paddingTop: -pm2, marginTop: -pm1, paddingRight: pm2, color: colorWhite}}
                                                                            name="shopping-cart"
                                                                            size={20}
                                                                        />
                                                                    </View>
                                                                </Link>
                                                                <Link 
                                                                    style={[{flexDirection: 'row-reverse'}, styles.pv2, styles.mb2]} 
                                                                    web={{ as: "/cash-register/" + this.props.ifsn, path: "/cash-register/" + this.props.ifsn }} routeName="cash-register"
                                                                >
                                                                    <Text style={[{marginTop: -pm2, paddingRight: pm2, color: colorGray},styles.fontFa]}  >
                                                                        صندوق
                                                                    </Text>
                                                                    <View style={[styles.buttonCircle, styles.zDepth1]}
                                                                    >
                                                                        <Icon
                                                                            style={{paddingTop: -pm3, marginTop: -pm1, paddingRight: pm2, color: colorWhite}}
                                                                            name="cash-register"
                                                                            size={20}
                                                                        />
                                                                    </View>
                                                                </Link>
                                                                <View style={[styles.hr]} />
                                                                <Link  
                                                                    web={{ as: "/register/" + this.props.ifsn, path: "/register/" + this.props.ifsn }} 
                                                                    routeName="register"
                                                                >
                                                                    <View style={[{flexDirection: 'row-reverse', paddingTop: pm3, borderColor: colorPrimary, borderWidth: 3 , paddingHorizontal: pm4, borderRadius:25, marginTop: pm2, backgroundColor: "white",   height: 50,
                                                                                    
                                                                                }, styles.zDepth1, styles.mh2, styles.mb2]}
                                                                    >
                                                                        <Icon
                                                                            style={{paddingTop: -pm2, paddingRight: pm2, color: colorGray}}
                                                                            name="user-alt"
                                                                            size={15}
                                                                        />
                                                                        <View>
                                                                            <Text style={[{marginTop: -pm1, paddingRight: pm2, paddingBottom: pm2, color: colorGray},styles.fontFa]}>حساب کاربری</Text>
                                                                        </View>
                                                                    </View>
                                                                </Link>
                                                            </View>
                                                        ) : ( 
                                                            <></>
                                                        )}
                                                    </View>
                                                </View>
                                            </View>
                                        ) : ( 
                                            <></>
                                        )}
                                        <View style={{flex: this.state.leftNav, height: 80,  /* backgroundColor: 'steelblue' */}}>
                                            <View  
                                                style={[
                                                    {
                                                        marginTop: pm3,
                                                        paddingRight: pm1,
                                                        borderColor: this.state.searchBarBorderColor,
                                                        borderWidth: 1 ,
                                                        position: this.state.searchBarPos,
                                                        paddingHorizontal: pm4,
                                                        borderRadius:25,
                                                        backgroundColor: "white",
                                                        marginHorizontal: pm4,
                                                        height: this.state.searchbarHeigh,
                                                        width: "90%",
                                                        borderStyle: this.state.searchBarBorderStyle,
                                                        zIndex: 20,
                                                    }, 
                                                    this.state.searchBarShadow ? styles.zDepth1 : styles.zDepth0
                                                ]}
                                                
                                                onMouseEnter={() => {
                                                    this.setState({
                                                        searchBarBorderColor: colorPrimary,
                                                        searchBarBorderStyle: "dashed",
                                                    })
                                                }}

                                                onMouseLeave={() => {
                                                    this.setState({
                                                        searchBarBorderColor: "rgb(200, 200, 200)",
                                                        searchBarBorderStyle: "solid",
                                                    })
                                                }}
                                            >
                                                <View style={{ flexDirection: 'row-reverse',}}>
                                                    <TextInput
                                                        style={[
                                                            {
                                                                flex: 15,
                                                                height: 42,
                                                                paddingRight: pm3,
                                                                textAlign: "right",
                                                                borderWidth: 0 ,
                                                            },
                                                            styles.fontFa, 
                                                            Platform.OS == 'web' ? styles.removeOutline : 0
                                                        ]}
                                                        placeholder="...جستجو کن"
                                                        ref="email_input"
                                                        onSubmitEditing={() => this.refs['email_input'].blur()} 
                                                        onFocus ={() => {
                                                            this.setState({
                                                                searchbarHeigh: 300,
                                                                searchBarPos: "absolute",
                                                                searchBarShadow: true,
                                                                searchAreaDisplay: true,
                                                                backdropSearchBarDisplay: true,
                                                            })
                                                        }}
                                                    />
                                                    <Icon
                                                        style={{flex:1, paddingRight: pm2, paddingTop: 13, color: colorSecondary}}
                                                        name="search"
                                                        size={15}
                                                    />
                                                </View>
                                                { this.state.searchAreaDisplay ? (

                                                    <View>
                                                        <View style={{borderBottomWidth:1, borderStyle:"dashed", borderBottomWidth: 1, height:2, width: "98%",marginBottom: pm2,    borderColor: colorPrimary}}/>
                                                        <View>
                                                            <Text style={[{padding: pm2, paddingVertical: pm1, textAlign: "right", fontSize: 14},styles.fontFa]}>
                                                                سلام این پیام تستی منه
                                                            </Text>
                                                            <Text style={[{padding: pm2, paddingVertical: pm1, textAlign: "right", fontSize: 14},styles.fontFa]}>
                                                                سلام این پیام تستی منه
                                                            </Text>
                                                            <Text style={[{padding: pm2, paddingVertical: pm1, textAlign: "right", fontSize: 14},styles.fontFa]}>
                                                                سلام این پیام تستی منه
                                                            </Text>
                                                            <Text style={[{padding: pm2, paddingVertical: pm1, textAlign: "right", fontSize: 14},styles.fontFa]}>
                                                                سلام این پیام تستی منه
                                                            </Text>
                                                        </View>
                                                    </View>

                                                ) : (
                                                    <></>
                                                )}

                                            </View >
                                        </View>
                                    </View> 
                                </View>
                                <View style={{flex: this.state.outContainer}} />
                            </View>
                            
                            { this.state.showListMahsol ? (
                                <View onMouseEnter={() => this.forceUpdate()}
                                    style={[{width:"100%", top: 80, backgroundColor:"white" , position: "absolute", zIndex: 10}]}
                                >
                                    <ScrollView style={[{maxHeight: 500,}]}>
                                        <View style={[{flex:1, flexDirection: "row-reverse"}, styles.mt3]}>
                                            {appendListButtonItems()}
                                        </View>
                                        <View style={[styleRow.row, {width: "100%"}, styles.mt3, styles.pb2, styles.mb2]}>
                                            {appendListDetails()}
                                        </View>
                                    </ScrollView>
                                </View>
                            ) : (
                                <></>
                            )}
                        </View>
                        { this.state.isSideNaveShow ? ( 
                            <>
                                <TouchableOpacity 
                                    style={[{
                                        alignSelf:'center',
                                        flex:1,
                                        left:0,
                                        top:0,
                                        bottom: 0,
                                        zIndex:1900,
                                        height: Dimensions.get('window').height,
                                        width: Dimensions.get('window').width,
                                        backgroundColor: 'rgba(52, 52, 52, 0.8)',
                                    }, 
                                        styles.postionFixed,
                                    ]}
                                    onPress={() => 
                                        this.setState({ 
                                            isSideNaveShow: false
                                        })
                                    } 
                                />
                                <View 
                                    style={[
                                                {
                                                    width:300,
                                                    height: '100%',
                                                    top: 0,
                                                    right: 0,
                                                    bottom: 0,
                                                    backgroundColor: colorWhite,
                                                    zIndex:2000,
                                                },
                                                styles.postionFixed,
                                                styles.zDepth2,
                                            ]}
                                >
                                    <ScrollView>
                                        <View style={[{ flexDirection: 'row-reverse',}, styles.justifyContentCenter]}>
                                            <Link web={{ as: "/", path: "/" }} routeName="home">
                                                <View style={{
                                                    flexDirection: 'row-reverse',
                                                    paddingTop: pm3,
                                                    paddingRight: pm2,
                                                }}
                                            >
                                                    <Image resizeMode='contain' source={{uri: smalltisUrl + '/image/logo/logo-st.png'}} style={{width: 53, height: 53, marginTop: -pm2}}  />
                                                    <Text style={[{height: 50, padding: pm2, paddingTop: pm1, fontSize: 15, color: colorPrimary },styles.fontFa]}>اسمالتیس</Text>
                                                </View>
                                            </Link>
                                        </View>
                                        <View style={styles.hr} />
                                        <Link 
                                            style={[
                                                    {
                                                        borderWidth:2,
                                                        borderColor:colorPrimary,
                                                        backgroundColor: colorWhite,
                                                        borderRadius:3,
                                                    },
                                                    styles.ph5, styles.pv2, styles.mh2, styles.mt3, styles.zDepth1, styles.justifyContentCenter,
                                                    styles.alignItemsCenter
                                                ]}
                                            web={{ as: "/advertisement/" + this.props.ifsn, path: "/advertisement/" + this.props.ifsn }} 
                                            routeName="advertisement"
                                        >
                                            <Text style={[{color: colorPrimary}, styles.fontFa, styles.textCenter]}>
                                                ثبت آگهی
                                            </Text>
                                        </Link>
                                        <View style={[{flexDirection: 'row-reverse'}, styles.justifyContentBetween, styles.mt3]}>
                                            <Link  web={{ as: "/register/" + this.props.ifsn, path: "/register/" + this.props.ifsn }} routeName="register">
                                                <View style={[{flexDirection: 'row-reverse', paddingTop: pm3, borderColor: colorPrimary, borderWidth: 3 , paddingHorizontal: pm4, borderRadius:25, marginTop: pm2, backgroundColor: "white",   height: 50,
                                                                
                                                            }, styles.zDepth1, styles.mh2, styles.mb2]}
                                                >
                                                    <Icon
                                                        style={{paddingTop: -pm2, paddingRight: pm2, color: colorPrimary}}
                                                        name="user-alt"
                                                        size={15}
                                                    />
                                                    <View>
                                                        <Text style={[{marginTop: -pm1, paddingRight: pm2, paddingBottom: pm2, color: colorPrimary},styles.fontFa]}>حساب کاربری</Text>
                                                    </View>
                                                </View>
                                            </Link>
                                            <Link web={{ as: "/sell/" + this.props.ifsn, path: "/sell/" + this.props.ifsn }} routeName="sell">
                                                <View style={[styles.buttonCircle, styles.zDepth1]}
                                                >
                                                    <Icon
                                                        style={{paddingTop: -pm2, marginTop: -pm1, paddingRight: pm2, color: colorWhite}}
                                                        name="shopping-cart"
                                                        size={20}
                                                    />
                                                </View>
                                            </Link>
                                            <Link web={{ as: "/cash-register/" + this.props.ifsn, path: "/cash-register/" + this.props.ifsn }} routeName="cash-register">
                                                <View style={[styles.buttonCircle, styles.zDepth1]}
                                                >
                                                    <Icon
                                                        style={{paddingTop: -pm3, marginTop: -pm1, paddingRight: pm2, color: colorWhite}}
                                                        name="cash-register"
                                                        size={20}
                                                    />
                                                </View>
                                            </Link>
                                        </View>
                                        <View style={[styles.mv3]}>
                                            {appendSideNavListButton()}
                                        </View>
                                        <View style={styles.hr} />
                                        <TouchableOpacity 
                                            style={[styles.btnPrimary, styles.mh2, styles.mv2]}
                                            onPress={() => { 
                                                this.setState({ 
                                                    isSideNaveShow: false,
                                                })
                                            }}
                                        >
                                            <Text style={[styles.fontFa, styles.textCenter, {color: colorWhite}]}>بستن</Text>
                                        </TouchableOpacity>
                                        
                                    </ScrollView>
                                </View> 
                            </>
                        ) : (
                            <></>
                        ) }
                        <View>
                            { 
                                (this.props.page != undefined && this.props.page == "list") || (window.location != undefined && window.location.pathname.split("/")[1] == 'list') ? (
                                    
                                    <ScrollView  style={styles.pt2}>
                                        {appendSideNavListButton()}
                                    </ScrollView>
                                ) : (
                                    <></>
                                )
                            }
                            
                        </View>
                    </>
                ) : (
                    <></>
                )}
            </>
        );
    }
};

function appendListButtonItems() {
    let buttonItems = []
    for (let i = 1; i <= 8; i++) {
        let ltio = i
        
        buttonItems.push(
            <TouchableOpacity  
                key={"listButtonItemsTouch_" + i}   
                onMouseEnter={() => {
                    let newArray = [...TopNavbarClassThis.state.listButtonItemsOver]
                    for (let d = 0; d < newArray.length; d++) {
                        newArray[d] = false
                    }
                    newArray[i-1] = true

                    TopNavbarClassThis.setState({
                        listButtonItemsOver: newArray,
                    });
                    showCategoriesInList(i-1)
                }}
                onMouseLeave={() => {
                    let newArray = [...TopNavbarClassThis.state.listButtonItemsOver]
                    for (let d = 0; d < newArray.length; d++) {
                        newArray[d] = false
                    }

                    TopNavbarClassThis.setState({
                        listButtonItemsOver: newArray,
                    },()=> {
                        
                    });
                }}
                
                style={[
                    {flex:1, flexDirection: "row", borderRadius: 3, paddingVertical: 10},
                    styles.mh4,
                    styles.justifyContentCenter,
                    TopNavbarClassThis.state.listButtonItemsOver[i-1] ? {backgroundColor: colorPrimary} :  {backgroundColor: "rgba(0, 0, 0, 0)"},
                    TopNavbarClassThis.state.listButtonItemsOver[i-1] ? styles.zDepth1 :  styles.zDepth0,
                ]}
            >
                
                <Text 
                    key={"listButtonItemsText_" + i}
                    style={[
                    styles.fontFa,
                    styles.textRight,
                    TopNavbarClassThis.state.listButtonItemsOver[i-1] ? styles.textWhite :  styles.textBlack,
                    ]}>
                    {TopNavbarClassThis.state.categoryListButtonsArray[i-1]}
                </Text> 
            </TouchableOpacity>)
            
    }
    return buttonItems;
    
}

function appendListDetails(topNum) {

    let innerItems = []
    for (let i = 1; i<= 8; i++) {
        innerItems.push(
            <View 
                style={[    
                            styles.ph2,
                            styles.zDepth1,
                            styleRow.colOfRow,
                            styleRow.colLG3,
                            styleRow.colXL,
                            TopNavbarClassThis.state.show8ListBaseView[i-1] ? styles.dBlock : styles.dNone
                        ]}
                key={"listInsideHeadersView_" + i}
            >
                <TouchableOpacity 
                    key={"listInsideHeadersTouch_" + i}
                    onMouseEnter={() => {
                        let newArray = [...TopNavbarClassThis.state.listInsideHeadersOver]
                        for (let d = 0; d < newArray.length; d++) {
                            newArray[d] = false
                        }
                        newArray[i-1] = true

                        TopNavbarClassThis.setState({
                            listInsideHeadersOver: newArray,
                        });
                    }}
                    onMouseLeave={() => {
                        let newArray = [...TopNavbarClassThis.state.listInsideHeadersOver]
                        for (let d = 0; d < newArray.length; d++) {
                            newArray[d] = false
                        }

                        TopNavbarClassThis.setState({
                            listInsideHeadersOver: newArray,
                        });
                    }}
                    style={[
                            styles.mv2,
                            styles.pb2,
                            TopNavbarClassThis.state.listInsideHeadersOver[i-1] ? {borderBottomWidth: 2, borderBottomColor: colorSecondary} : {borderBottomWidth: 2, borderBottomColor: "rgba(0, 0, 0, 0)"},
                            
                        ]}
                >
                    <Text style={[styles.fontFa,]}>
                        {TopNavbarClassThis.state.categoryListHeaderArray[i-1]}
                    </Text>
                </TouchableOpacity>
                {
                    appendListItems(i-1)
                }
            </View> 
        )
    }
    return innerItems;
    
}

function appendListItems(topNum) {
    let insideItems = []
    for (let i = 1; i <= 8; i++) {
        insideItems.push(
            <TouchableOpacity 
                key={"listInsideItems_" + topNum + "_" + i }
                onMouseEnter={() => {
                    let newArray = [...TopNavbarClassThis.state.listInsideItemsOver]
                    for (let d = 0; d < newArray.length; d++) {
                        for (let s = 0; s < newArray[d].length; s++) {
                            newArray[d][s] = false
                        }
                    }
                    newArray[topNum][i-1] = true

                    TopNavbarClassThis.setState({
                        listInsideItemsOver: newArray,
                    });
                }}
                onMouseLeave={() => {
                    let newArray = [...TopNavbarClassThis.state.listInsideItemsOver]
                    for (let d = 0; d < newArray.length; d++) {
                        for (let s = 0; s < newArray[d].length; s++) {
                            newArray[d][s] = false
                        }
                    }
                    newArray[topNum][i-1] = false

                    TopNavbarClassThis.setState({
                        listInsideItemsOver: newArray,
                    });
                }}
            >
                <Text 
                    style={[styles.mv2, styles.fontFa, styles.font12,
                        TopNavbarClassThis.state.listInsideItemsOver[topNum][i-1] ? styles.textPrimary : styles.textBlack ]}>
                    { appendListAll(topNum, (i-1)) }
                </Text>
            </TouchableOpacity>)
    }
    return insideItems;
}

function appendSideNavListButton() {
    let listArray = [];
    for (let i = 1; i <=  8; i++) {
        listArray.push(
            <View key={"sideNavListButtonBase_" + i} >
                <TouchableOpacity 
                    key={"sideNavListButton_" + i}  

                    style={[
                        {
                            flexDirection: 'row',
                            backgroundColor: colorWhite,
                        }, 
                        styles.justifyContentBetween,
                        styles.ph3,
                        styles.pv3,
                        styles.mv1,
                        styles.zDepth1,
                    ]}

                    onPress={
                        () => {
                            let iconArray = TopNavbarClassThis.state.sideNaveButtonIcon
                            let newArray = TopNavbarClassThis.state.showSideNavList
                            for (let s = 0; s < newArray.length; s++) {
                                iconArray[s] = 'keyboard-arrow-down'
                                newArray[s] = false;
                            }
                            newArray[i-1] = !newArray[i-1],

                            newArray[i-1] ? iconArray[i-1] = 'keyboard-arrow-up' : iconArray[i-1] = 'keyboard-arrow-down'
                            
                            TopNavbarClassThis.setState({
                                showSideNavList: newArray,
                                sideNaveButtonIcon: iconArray,
                                isForDisplaySideNavList: false,
                            })

                            showCategoriesInList(i-1)
                        }
                    }
                >
                    <IconMI
                        key={"sideNavListButtonIcon_" + i}  
                        style={{paddingTop: pm1, paddingRight: pm1}}
                        name={TopNavbarClassThis.state.sideNaveButtonIcon[i-1]}
                        size={25}
                    />
                    <Text 
                        key={"sideNavListButtonText_" + i}  
                        style={[styles.fontFa, styles.textBlack]}
                    >
                        
                        {
                            TopNavbarClassThis.state.categoryListButtonsArray[i-1]
                        }
                    </Text>
                </TouchableOpacity>
                { TopNavbarClassThis.state.showSideNavList[i-1] ? (
                    <>
                        { TopNavbarClassThis.state.isForDisplaySideNavList ? (
                            <View key={"sideNavListButtonView_" + i}  style={{backgroundColor: 'rgba(158, 158, 158, 0.3)'}}>
                                {
                                    appendSideNavListDetail(i-1)
                                }
                            </View>
                        ) : (
                            <></>
                        )}
                    </>
                ) : (
                    <View key={"sideNavListButtonNone_" + i}></View>
                ) }
            </View>
            )
    }
    return listArray;
}

function appendSideNavListDetail(topNum) {
    let innerItems = []
    for (let i = 1; i<= 8; i++) {
        innerItems.push(
            <View 
                style={[
                            {
                                width: '100%',
                                flex: 1,
                            },  
                            styles.ph4,
                            TopNavbarClassThis.state.show8ListBaseView[i-1] ? styles.dBlock : styles.dNone
                        ]}
                key={"sideNavListInsideHeadersView_" + i}
            >
                <TouchableOpacity 
                    key={"sideNavListInsideHeadersTouch_" + i}
                    onMouseEnter={() => {
                        let newArray = [...TopNavbarClassThis.state.listInsideHeadersOver]
                        for (let d = 0; d < newArray.length; d++) {
                            newArray[d] = false
                        }
                        newArray[i-1] = true

                        TopNavbarClassThis.setState({
                            listInsideHeadersOver: newArray,
                        });
                    }}
                    onMouseLeave={() => {
                        let newArray = [...TopNavbarClassThis.state.listInsideHeadersOver]
                        for (let d = 0; d < newArray.length; d++) {
                            newArray[d] = false
                        }

                        TopNavbarClassThis.setState({
                            listInsideHeadersOver: newArray,
                        });
                    }}
                    style={[
                            styles.mv2,
                            styles.pb2,
                            TopNavbarClassThis.state.listInsideHeadersOver[i-1] ? {borderBottomWidth: 2, borderBottomColor: colorSecondary} : {borderBottomWidth: 2, borderBottomColor: "rgba(0, 0, 0, 0)"},
                            
                        ]}
                >
                    <Text style={[styles.fontFa,]}>
                        {TopNavbarClassThis.state.categoryListHeaderArray[i-1]}
                    </Text>
                </TouchableOpacity>
                {appendSideNavListItems(i-1)}
                <View style={styles.justifyContentCenter, styles.alignItemsCenter}>
                    <View style={[styles.hr2]} />
                </View>
            </View>
        )
    }
    return innerItems;
}

function appendSideNavListItems(topNum) {
    let insideItems = []
    for (let i = 1; i <= 8; i++) {
        insideItems.push(
            <TouchableOpacity 
                key={"sideNavListInsideItems_" + topNum + "_" + i }
                onMouseEnter={() => {
                    let newArray = [...TopNavbarClassThis.state.listInsideItemsOver]
                    for (let d = 0; d < newArray.length; d++) {
                        for (let s = 0; s < newArray[d].length; s++) {
                            newArray[d][s] = false
                        }
                    }
                    newArray[topNum][i-1] = true

                    TopNavbarClassThis.setState({
                        listInsideItemsOver: newArray,
                    });
                }}
                onMouseLeave={() => {
                    let newArray = [...TopNavbarClassThis.state.listInsideItemsOver]
                    for (let d = 0; d < newArray.length; d++) {
                        for (let s = 0; s < newArray[d].length; s++) {
                            newArray[d][s] = false
                        }
                    }
                    newArray[topNum][i-1] = false

                    TopNavbarClassThis.setState({
                        listInsideItemsOver: newArray,
                    });
                }}
            >
                <Text 
                    style={[styles.mv2, styles.fontFa, styles.font12,
                        TopNavbarClassThis.state.listInsideItemsOver[topNum][i-1] ? styles.textPrimary : styles.textBlack ]}>
                    { appendListAll(topNum, (i-1)) }
                </Text>
            </TouchableOpacity>)
    }
    return insideItems;
}

function appendListAll(topNum, d) {
    let array = TopNavbarClassThis.state.categoryListAllArray[topNum]
    if (array != undefined) {
        return array[d];
    }
}

function showCategoriesInList(buttonNum) {
    getAllListCategory(afterGetCategoryFunc) 
    function afterGetCategoryFunc(categoryArray) {
        
        let categoryButtonsLocal = [];
        for (let d = 0; d < categoryArray.length; d++) {
            if (categoryButtonsLocal.indexOf(categoryArray[d]["category_level_1"]) < 0) {
                categoryButtonsLocal.push(categoryArray[d]["category_level_1"])
            }
        }

        let categoryListHeaderLocal = [];
        for (let d = 0; d < categoryArray.length; d++) {
            if (categoryListHeaderLocal.indexOf(categoryArray[d]["category_level_2"]) < 0 && categoryArray[d]["category_level_1"] == categoryButtonsLocal[buttonNum]) {
                categoryListHeaderLocal.push(categoryArray[d]["category_level_2"])
            }
        }

        let categoryListAllLocal = []
        let categoryListLocal = [];
        let num = 0;
        for (let d = 0; d < categoryArray.length; d++) {
            if (categoryListLocal.indexOf(categoryArray[d]["category_level_3"]) < 0 && categoryArray[d]["category_level_1"] == categoryButtonsLocal[buttonNum] && categoryArray[d]["category_level_2"] == categoryListHeaderLocal[num]) {
                categoryListLocal.push(categoryArray[d]["category_level_3"])
            }
            if (d == (categoryArray.length - 1)) {
                categoryListAllLocal.push(categoryListLocal)
                if (categoryListAllLocal.length < categoryListHeaderLocal.length) {
                    categoryListLocal = []
                    d = 0
                    num++
                }
            }
        }

        let newDisplayArray = []
        switch (categoryListHeaderLocal.length) {
            case 8:
                newDisplayArray = [true, true, true, true, true, true, true, true,]
            break;
            case 7:
                newDisplayArray = [true, true, true, true, true, true, true, false,]
            break;
            case 6:
                newDisplayArray = [true, true, true, true, true, true, false, false,]
            break;
            case 5:
                newDisplayArray = [true, true, true, true, true, false, false, false,]
            break;
            case 4:
                newDisplayArray = [true, true, true, true, false, false, false, false,]
            break;
            case 3:
                newDisplayArray = [true, true, true, false, false, false, false, false,]
            break;
            case 2:
                newDisplayArray = [true, true, false, false, false, false, false, false,]
            break;
            case 1:
                newDisplayArray = [true, false, false, false, false, false, false, false,]
            break;
            case 0:
                newDisplayArray = [false, false, false, false, false, false, false, false,]
            break;
        }
        
        TopNavbarClassThis.setState({ 
            categoryListButtonsArray: categoryButtonsLocal,
            categoryListHeaderArray: categoryListHeaderLocal,
            categoryListAllArray: categoryListAllLocal,
            show8ListBaseView: newDisplayArray,
            isForDisplaySideNavList: true
            
        },() => {
            //console.log(TopNavbarClassThis.state.categoryListAllArray[0])
        })
    }
}

const getAllListCategory = (afterGetCategoryFunc) => {
    let categoryArray = []
    getTableAllData("categories", doUserTableDataFunc)
    function doUserTableDataFunc(response) {
        getTablesColumnName("categories", afterGetTableColumnFunc)
        function afterGetTableColumnFunc(tablesCloumnNames) {
            if (response !=[]) {
                response = JSON.parse(response)
            
                response.forEach(value => {
                    eval(addTableAllDataToEval(tablesCloumnNames, "categoryArray"))
                }); 
            }
            afterGetCategoryFunc(categoryArray)
            //alert("length=" + categoryArray.length + " <--> Array=" + categoryArray)
        }
    }
}

function handleResize() {
    bootstrapNavbar() 
}

function bootstrapNavbar() {
    let screenWidth = Dimensions.get('window').width
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
        })
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
        })
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
        })
    } 

    if (screenWidth >= md && screenWidth < lg) {
        //console.log("md")
        TopNavbarClassThis.setState({
            outContainer: 1,
            Container: '97%',
            rightNav: 1,
            middleNav: 4,
            leftNav: 11,
            showListMahsol: false,
            middleOfNavDisplay: false,
            barIconDisplay: true,
            smalltisNavLogoDiplay: false,
            navItemsDispaly: false,
            navOptionsDisplay: false,
        })
    } 

    if (screenWidth >= sm && screenWidth < md) {
        //console.log("sm")
        TopNavbarClassThis.setState({
            outContainer: 1,
            Container: '97%',
            rightNav: 3,
            middleNav: 0,
            leftNav: 9,
            showListMahsol: false,
            middleOfNavDisplay: false,
            barIconDisplay: false,
            smalltisNavLogoDiplay: true,
            navItemsDispaly: false,
            navOptionsDisplay: false,
        })
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
        })
    }
}

