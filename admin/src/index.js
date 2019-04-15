/*
* @Author: TomChen
* @Date:   2019-04-09 19:28:12
* @Last Modified by:   TomChen
* @Last Modified time: 2019-04-12 19:05:31
*/

//1.整个应用的入口
//2.配置中指定的文件
import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import store from './store'

import App from './App.js'

//走到App.js
ReactDOM.render(<Provider store={store}><App /></Provider>,document.getElementById('root'))