import React from "react";
import {
  View,
  Text,
  ScrollView,
  Platform,
  Dimensions,
  StyleSheet,
  Animated,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import MyStyleFunc, { styles, styleRow } from "../../css/base_styles";
import { pm1, pm2, pm3, pm4, pm5 } from "../../connection/gutter";
import { sm, md, lg, xl, xxl } from "../../connection/screen_size";
import { colorPrimary, colorGray } from "../../connection/color";
import { smalltisUrl } from "../../connection/base";
import LoadingLoop from "../../Animate/loadingLoop";
import * as Font from "expo-font";
import { Link, useRouting } from "expo-next-react-navigation";
import Head from "next/head";
import MikhakMedium from "../../assets/fonts/Mikhak-Medium.ttf";
import EstedadMedium from "../../assets/fonts/Estedad-Medium.ttf";
import TopNavbar from "./topNavbar";
import FooterBar from "./footerBar";
import InvertibleScrollView from "react-native-invertible-scroll-view";
import { useRouter } from "next/router";
import { StackNavigator } from "react-navigation";

export const siteTitle = "اسمالتیس فروشگاه آنلاین شما";
export default class BaseTemplate extends React.Component {
  constructor(props) {
    super(props);
    // ifsn = index file server name
    this.state = {
      fontLoaded: false,
      ifsn: "page",
    };
  }

  async componentDidMount() {
    try {
      await Font.loadAsync({
        MikhakMedium: {
          uri: MikhakMedium,
        },
        EstedadMedium: {
          uri: EstedadMedium,
        },
      }).then((result) => {
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

        this.setState({ ifsn: fileSave, fontLoaded: true });
      });
    } catch (error) {
      alert(error);
    }
  }

  componentDidUpdate() {}

  render() {
    if (this.state.fontLoaded) {
      return (
        <ImageBackground
          style={{ flex: 1, width: "100vw", height: "100vh" }}
          resizeMode="cover"
          source={{
            uri: smalltisUrl + "/image/background/register-bg.jpg",
          }}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(43, 91, 121, 0.6)",
              width: "100vw",
              height: "100vh",
            }}
          >
            <View>
              <MyStyleFunc class={this} />
              <HeaderOfPage />
              <TopNavbar
                ifsn={this.state.ifsn}
                fontLoaded={this.state.fontLoaded}
                page={this.props.routeName}
              />
            </View>
            <View
              style={[
                Platform.OS == "web"
                  ? styles.scrollPaddingWeb
                  : styles.scrollPaddingAndroid,
                { zIndex: -1, height: "100vh" },
              ]}
            >
              {this.props.children}
            </View>
            {/* <FooterBar
              ifsn={this.state.ifsn}
              fontLoaded={this.state.fontLoaded}
              page={this.props.routeName}
            /> */}
          </View>
        </ImageBackground>
      );
    } else {
      return <LoadingLoop />;
    }
  }
}

class HeaderOfPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //favIcon: smalltisUrl + "/image/logo/logo-st.png"
    };
  }

  componentDidMount() {}

  render() {
    return (
      <Head>
        <title>اسمالتیس - فروشگاه آنلاین شما</title>
        <link
          rel="icon"
          href={smalltisUrl + "/image/logo/logo-st.png"}
        />
        <meta
          name="description"
          content="فروش آنلاین محصولات الکترونیکی، صنعتی، لوازم خانه و آشپزخانه، آرایشی و بهداشتی، کتاب و هنر، ورزشی و تفریحی، مد و پوشاک، اسمالتیس محلی برای تبلیغات و آگهی کالای نو و دست دوم شما"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
    );
  }
}
