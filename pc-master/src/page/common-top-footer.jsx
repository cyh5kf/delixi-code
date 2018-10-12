
import React, {Component} from "react";
import {render} from "react-dom";
import {Provider,connect} from "react-redux";
import store from "@/store/store.js";
import Css from "@/assets/css/base.scss";


import TopBar from "@/components/TopBar/TopBar.jsx";
import TopBanner from "@/components/TopBanner/TopBanner.jsx";



render(<Provider store={store}>
    <TopBar/>
</Provider>,document.getElementById('topBar'));



render(<Provider store={store}>
    <TopBanner/>
</Provider>,document.getElementById('topBanner'));