import React from 'react';
import Calculator from "./Calculator";
import SplashScreen from 'react-native-splash-screen'


export default class App extends React.Component{
    componentDidMount() {
        // do stuff while splash screen is shown
        // After having done stuff (such as async tasks) hide the splash screen
        SplashScreen.hide();
    }
    render(){
        return <Calculator/>
    }
}