import React, {Component, PropTypes} from "react";
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  TextInput
} from 'react-native';
var { width, height } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import IconFa from 'react-native-vector-icons/FontAwesome5';
import MyStyleFunc, { styles, styleRow } from '../../css/base_styles'
import { colorPrimary, colorWhite, colorBlack } from "../../connection/color";

var customPickerThis;
export default class CustomMultiPicker extends Component {
    constructor(props){
        super(props);
        this.state = {
            pageWidth: Dimensions.get('window').width,
            pageHeight: Dimensions.get('window').height,
            searchText: null,
            selected: [],
            backdropBarDisplay: true,
            isItemOver: [],
        };
        customPickerThis = this
    }

    componentDidMount = () => {
        const selected = this.props.selected
        if(typeof selected === "object") {
            selected.map(select => {
                this._onSelect(select)
            })
        } else {
            this._onSelect(selected)
        }
    }

    getNewDimensions(event){
            var pageHeight = event.nativeEvent.layout.height
            var pageWidth = event.nativeEvent.layout.width
            this.setState({
                pageHeight, pageWidth
            })
    }

    _onSelect = (item) => {
        var selected = this.state.selected
        if(this.props.multiple){
            if(selected.indexOf(item) == -1) {
                selected.push(item)
                this.setState({
                    selected: selected
                })
            } else {
                selected = selected.filter(i => i != item)
                this.setState({
                    selected: selected
                })
            }
        } else {
            if(selected.indexOf(item) == -1){
                selected = [item]
                this.setState({
                    selected: selected
                })
            } else {
                selected = []
                this.setState({
                    selected: selected
                })
            }
        }
        this.props.callback(selected)
    }

    _onSearch = (text) => {
        this.setState({
        searchText: text.length > 0 ? text.toLowerCase() : null
        })
    }

    _isSelected = (item) => {
        const selected = this.state.selected
        if(selected.indexOf(item) == -1){
            return false
        }
        return true
    }

    filterObjectByValue = (obj, predicate) => {
        return Object.keys(obj)
            .filter( key => predicate(obj[key]) )
            .reduce( (res, key) => (res[key] = obj[key], res), {} )
    }
  
    hideBackdrop = () => {
        this.setState({
            backdropBarDisplay: false,
        })
    }

  render(){
    const { options, returnValue } = this.props;
    const list = this.state.searchText ? this.filterObjectByValue(options, option => option.toLowerCase().includes(this.state.searchText)) : options
    const labels = Object.keys(list).map(i => list[i])
    const values = Object.keys(list)
    return(
        <>
            { this.state.backdropBarDisplay ? (
                <>
                    <TouchableOpacity 
                        style={[{
                            alignSelf:'center',
                            flex:9,
                            left:0,
                            top:0,
                            zIndex:5000,
                            height: Dimensions.get('window').height,
                            width: Dimensions.get('window').width,
                            backgroundColor: 'rgba(52, 52, 52, 0.8)',
                        },
                        styles.postionFixed,
                        ]}
                        onPress={()=> {
                            this.hideBackdrop();
                            this.props.backDrop();
                        }}
                    />

                    <View  style={[this.props.modalViewStyle, styles.postionFixed, {zIndex: 5001,}]} onLayout={(evt)=>{this.getNewDimensions(evt)}}>
                        
                    <ScrollView
                        style={[{ padding: 5, height: this.props.scrollViewHeight }, this.props.scrollViewStyle]}
                        >
                        {this.props.search && <View style={{ flexDirection: 'row', height: 55 }}>
                        <View style={{ marginTop: 15, marginLeft: 15, backgroundColor: 'transparent' }}>
                            <IconFa name={this.props.searchIconName || "search"} color={this.props.searchIconColor || this.props.iconColor} size={this.props.searchIconSize || this.props.iconSize || 25} />
                        </View>
                        <TextInput
                            style={[
                                {
                                    flexDirection: "row-reverse",
                                    width: this.state.pageWidth-20,
                                    height: 35,
                                    margin: 0,
                                    marginTop: 10,
                                    marginLeft: -25,
                                    padding: 5,
                                    paddingLeft: 30,
                                    borderColor: this.props.iconColor,
                                    borderWidth: 1,
                                    borderRadius: 5
                                }, 
                                this.props.searchViewStyle
                            ]}
                            onChangeText={(text) => { this._onSearch(text) }}
                            clearButtonMode={'always'}
                            placeholder={this.props.placeholder}
                            placeholderTextColor={this.props.placeholderTextColor}
                            underlineColorAndroid={'transparent'}
                        />
                        </View>}
                        {labels.map((label, index) => {
                            const itemKey = returnValue == "label" ? label : values[index]
                            return(
                            <TouchableOpacity
                                key={Math.round(Math.random() * 1000000)}
                                style={[{
                                    padding: 7,
                                    marginTop: 0,
                                    marginLeft: 2,
                                    marginRight: 2,
                                    marginBottom: 6,
                                    backgroundColor: this.state.isItemOver[index] ? colorPrimary : this.props.rowBackgroundColor,
                                    height: this.props.rowHeight,
                                    flexDirection: 'row-reverse',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderRadius: this.props.rowRadius
                                    },
                                    this.state.isItemOver[index] ? styles.zDepth1 : styles.zDepth0,
                                    this.props.itemStyle
                                ]}
                                onPress={() => {
                                    if (!this.props.multiple) {
                                        this.hideBackdrop();
                                        this.props.backDrop();
                                    }
                                    this._onSelect(itemKey)
                                }}

                                onMouseEnter={
                                    () => {
                                        let newArray = []
                                        for (let i = 0; i < labels.length; i++) {
                                            if (i == index) {
                                                newArray.push(true)
                                            } else {
                                                newArray.push(false)
                                            }
                                        }
                                        this.setState({
                                            isItemOver: newArray,
                                        })
                                    }
                                }

                                onMouseLeave={
                                    () => {
                                        let newArray = []
                                        for (let i = 0; i < labels.length; i++) {
                                            newArray.push(false)
                                        }
                                        this.setState({
                                            isItemOver: false,
                                        })
                                    }
                                }
                            >
                                {React.isValidElement(label)
                                ?
                                label
                                :
                                <Text style={this.props.labelStyle}>{label}</Text>
                                }
                                {

                                this._isSelected(itemKey) ?
                                <Icon name={this.props.selectedIconName}
                                        style={[{color: this.props.iconColor, fontSize: this.props.iconSize}, this.props.selectedIconStyle]}
                                        />
                                :
                                <Icon name={this.props.unselectedIconName}
                                        style={[{color: this.props.iconColor, fontSize: this.props.iconSize}, this.props.unselectedIconStyle]}
                                        />
                                }
                            </TouchableOpacity>
                            )
                        })}
                        </ScrollView>
                    </View>
                </>
            ) : (
                <></>
            ) }
        </>
    );
  }
}