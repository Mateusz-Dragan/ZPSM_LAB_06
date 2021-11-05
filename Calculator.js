require("./lib/swisscalc.lib.format.js");
require("./lib/swisscalc.lib.operator.js");
require("./lib/swisscalc.lib.operatorCache.js");
require("./lib/swisscalc.lib.shuntingYard.js");
require("./lib/swisscalc.display.numericDisplay.js");
require("./lib/swisscalc.display.memoryDisplay.js");
require("./lib/swisscalc.calc.calculator.js");

import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import InputPortraitButtons from "./components/InputPortraitButtons";
import InputLandscapeButtons from "./components/InputLandscapeButtons";
import PortraitDisplay from "./components/PortraitDisplay";
import LandscapeDisplay from "./components/LandscapeDisplay";


export default class CalculatorScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayValue: "0",
            orientation: "portrait",
            buttons :[
                [{
                    backgroundColor: '#a9a9a9',
                    title: 'AC',
                    disable:false,
                    borderColor: '#555759',
                    onPress: () => {this.onClearPress()},
                    color: '#e8e9ea'
                }],
                [{
                    backgroundColor: '#a9a9a9',
                    title: '7',
                    disable:false,
                    borderColor: '#555759',
                    onPress: () => {this.onDigitPress("7")},
                    color: '#e8e9ea'
                },
                {
                    backgroundColor: '#a9a9a9',
                    title: '8',
                    disable:false,
                    borderColor: '#555759',
                    onPress: () => {this.onDigitPress("8")},
                    color: '#e8e9ea'
                },
                {
                    backgroundColor: '#a9a9a9',
                    title: '9',
                    disable:false,
                    borderColor: '',
                    onPress: () => {this.onDigitPress("9")},
                    color: '#e8e9ea'
                },
                    {
                        backgroundColor: '#a9a9a9',
                        title: '/',
                        disable:false,
                        borderColor: '',
                        onPress: () => {this.onBinaryOperatorPress(this.oc.DivisionOperator)},
                        color: '#e8e9ea'
                    }
                ],
                [{
                    backgroundColor: '#a9a9a9',
                    title: '4',
                    disable:false,
                    borderColor: '#555759',
                    onPress: () => {this.onDigitPress("4")},
                    color: '#e8e9ea'
                },
                {
                    backgroundColor: '#a9a9a9',
                    title: '5',
                    disable:false,
                    borderColor: '#555759',
                    onPress: () => {this.onDigitPress("5")},
                    color: '#e8e9ea'
                },
                {
                    backgroundColor: '#a9a9a9',
                    title: '6',
                    disable:false,
                    borderColor: '',
                    onPress: () => {this.onDigitPress("6")},
                    color: '#e8e9ea'
                },{
                    backgroundColor: '#a9a9a9',
                    title: 'x',
                    disable:false,
                    borderColor: '',
                    onPress: () => {this.onBinaryOperatorPress(this.oc.MultiplicationOperator)},
                    color: '#e8e9ea'
                }],
                [{
                    backgroundColor: '#a9a9a9',
                    title: '1',
                    disable:false,
                    borderColor: '#555759',
                    onPress: () => {this.onDigitPress("1")},
                    color: '#e8e9ea'
                },
                {
                    backgroundColor: '#a9a9a9',
                    title: '2',
                    disable:false,
                    borderColor: '#555759',
                    onPress: () => {this.onDigitPress("2")},
                    color: '#e8e9ea'
                },
                {
                    backgroundColor: '#a9a9a9',
                    title: '3',
                    disable:false,
                    borderColor: '',
                    onPress: () => {this.onDigitPress("3")},
                    color: '#e8e9ea'
                },
                    {
                        backgroundColor: '#a9a9a9',
                        title: '-',
                        disable:false,
                        borderColor: '',
                        onPress: () => {this.onBinaryOperatorPress(this.oc.SubtractionOperator)},
                        color: '#e8e9ea'
                    }
                ],
                [{
                    backgroundColor: '#a9a9a9',
                    title: '0',
                    disable:false,
                    borderColor: '#555759',
                    onPress: () => {this.onDigitPress("0")},
                    color: '#e8e9ea'
                },
                {
                    backgroundColor: '#a9a9a9',
                    title: '.',
                    disable:false,
                    borderColor: '',
                    onPress: () => {this.onDigitPress('.')},
                    color: '#e8e9ea'
                },
                {
                    backgroundColor: '#a9a9a9',
                    title: '=',
                    disable:false,
                    borderColor: '',
                    onPress: () => {this.onEqualsPress()},
                    color: '#e8e9ea'
                },{
                    backgroundColor: '#a9a9a9',
                    title: '+',
                    disable:false,
                    borderColor: '',
                    onPress: () => {this.onBinaryOperatorPress(this.oc.AdditionOperator)},
                    color: '#e8e9ea'
                }]

            ]
        }


        this.oc = global.swisscalc.lib.operatorCache;
        this.calc = new global.swisscalc.calc.calculator();

        Dimensions.addEventListener('change', () => {
            const {width, height} = Dimensions.get("window");
            var orientation = (width > height) ? "landscape" : "portrait";
            this.setState({orientation: orientation});
        });
    }

    RenderButtons(){

        let layout = this.state.buttons.map((row,index)=> {
            let rowItem = row.map((buttonItems, buttonIndex) => {
                return (
                    <InputPortraitButtons
                        onPress={ buttonItems.onPress} disable={buttonItems.disable} title= {buttonItems.title} key={'btn-' + buttonIndex}
                    />
                )
            });
            return <View style={styles.rowInput} key={"row-" + index}>{rowItem}</View>
        });
        return layout
    }

    onDigitPress = (digit) => {
        this.calc.addDigit(digit);
        this.setState({displayValue: this.calc.getMainDisplay()});
    }

    onUnaryOperatorPress = (operator) => {
        this.calc.addUnaryOperator(operator);
        this.setState({displayValue: this.calc.getMainDisplay()});
    }

    onBinaryOperatorPress = (operator) => {
        this.calc.addBinaryOperator(operator);
        this.setState({displayValue: this.calc.getMainDisplay()});
    }

    onEqualsPress = () => {
        this.calc.equalsPressed();
        this.setState({displayValue: this.calc.getMainDisplay()});
    }

    onClearPress = () => {
        this.calc.clear();
        this.setState({displayValue: this.calc.getMainDisplay()});
    }

    onPlusMinusPress = () => {
        this.calc.negate();
        this.setState({displayValue: this.calc.getMainDisplay()});
    }

    onBackspacePress = () => {
        this.calc.backspace();
        this.setState({displayValue: this.calc.getMainDisplay()});
    }

    renderPortrait() {
        return (
            <View style={styles.container}>
                <View style={styles.resultContainer} >
                    <PortraitDisplay display={this.state.displayValue}/>
                </View>

                <View style={styles.inputContainer}>
                    {this.RenderButtons()}
                </View>

            </View>
        );
    }

    renderLandscape() {
        return (
            <View style={styles.container}>
                <View style={styles.resultContainer}>
                    <LandscapeDisplay display={this.state.displayValue}/>
                </View>

                <View style={styles.inputContainer}>
                    <View style={styles.rowInput}>
                        <InputLandscapeButtons onPress={() =>{this.onUnaryOperatorPress(this.oc.SquareRootOperator)}} title="y√x"/>
                        <InputLandscapeButtons onPress={() =>{this.onUnaryOperatorPress(this.oc.FactorialOperator)}} title="x!"/>
                        <InputLandscapeButtons onPress={this.onClearPress} title="AC"/>
                        <InputLandscapeButtons onPress={this.onPlusMinusPress} title="+/-"/>
                        <InputLandscapeButtons onPress={() => { this.onUnaryOperatorPress(this.oc.PercentOperator)}}title="%"/>
                    </View>

                    <View style={styles.rowInput}>

                            <InputLandscapeButtons onPress={() =>{this.onUnaryOperatorPress(this.oc.EExponentialOperator)}}  title="e^x"/>
                            <InputLandscapeButtons onPress={() =>{this.onUnaryOperatorPress(this.oc.TenExponentialOperator)}} title="10^x"/>


                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("7")
                        }} title="7" />
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("8")
                        }} title="8" />
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("9")
                        }} title="9" />
                        <InputLandscapeButtons onPress={() => {
                            this.onBinaryOperatorPress(this.oc.DivisionOperator)
                        }} title="÷" />

                    </View>

                    <View style={styles.rowInput}>
                        <InputLandscapeButtons onPress={() => { this.onUnaryOperatorPress(this.oc.NaturalLogOperator)}} title="ln"/>
                        <InputLandscapeButtons onPress={() => { this.onUnaryOperatorPress(this.oc.LogBase10Operator)}} title="log10"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("4")
                        }} title="4" />
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("5")
                        }} title="5" />
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("6")
                        }} title="6" />
                        <InputLandscapeButtons onPress={() => {
                            this.onBinaryOperatorPress(this.oc.MultiplicationOperator)
                        }} title="x" />
                    </View>

                    <View style={styles.rowInput}>
                        <InputLandscapeButtons onPress={() => { this.onUnaryOperatorPress(this.oc.EOperator)}} title="e"/>
                        <InputLandscapeButtons onPress={() => { this.onUnaryOperatorPress(this.oc.XSquaredOperator)}} title="x^2"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("1")
                        }} title="1" />
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("2")
                        }} title="2" />
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("3")
                        }} title="3" />
                        <InputLandscapeButtons onPress={() => {
                            this.onBinaryOperatorPress(this.oc.SubtractionOperator)
                        }} title="-" />

                    </View>

                    <View style={styles.rowInput}>
                        <InputLandscapeButtons onPress={() => { this.onUnaryOperatorPress(this.oc.PiOperator)}} title="π"/>
                        <InputLandscapeButtons onPress={() => { this.onUnaryOperatorPress(this.oc.XCubedOperator)}} title="x^3"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("0")
                        }} title="0" color="white" backgroundColor="#607D8B" style={{flex: 2}}/>
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress(".")
                        }} title="." color="white" backgroundColor="#607D8B"/>
                        <InputLandscapeButtons onPress={this.onEqualsPress} title="=" color="white" backgroundColor="#DCA394"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onBinaryOperatorPress(this.oc.AdditionOperator)
                        }} title="+" color="white" backgroundColor="#DCA394"/>
                    </View>
                </View>

            </View>
        )
    }

    render() {

        const view = (this.state.orientation === "portrait")
            ? this.renderPortrait()
            : this.renderLandscape();

        return (
            <View style={{flex: 1}}>
                {view}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {flex: 1, paddingVertical: 50 },
    resultContainer: {
        flex: 2,
        justifyContent: 'center',
        backgroundColor: '#696969',
    },
    inputContainer: {
        backgroundColor: `#a9a9a9`,
    },
    rowInput: {
        flexDirection: "row", justifyContent: "space-between", flexWrap: 'wrap'
    },
})