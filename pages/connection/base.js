import React from 'react'

export default class Base extends React.Component {
    render() {
        return (<></>)
    }
}

var LocalUrl = "http://localhost/smalltis/server"
var MobileUrl = "http://192.168.43.142/smalltis/server"
var mahanUrl = "http://php.mahanalborz.com"
var stApiUrl = "http://api.smalltis.com"
global.Buffer = global.Buffer || require('buffer').Buffer

var AuthUsername = "BMaFZpBaZDeAr"
var AuthPassword = "^cg!2n!;vswR"

export var FetchUrl = stApiUrl;
export var phpExtension = ".php"

export const authHeader = 'Basic ' + new Buffer.from(AuthUsername + ' : ' + AuthPassword).toString('base64')

export const smalltisUrl = stApiUrl