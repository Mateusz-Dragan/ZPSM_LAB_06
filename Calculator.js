import React from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import InputPortraitButtons from "./components/InputPortraitButtons";
import InputLandscapeButtons from "./components/InputLandscapeButtons";
import PortraitDisplay from "./components/PortraitDisplay";
import LandscapeDisplay from "./components/LandscapeDisplay";

function factorial(n) {
    if (n < 0) return;
    if (n < 2) return 1;
    return n * factorial(n - 1);
}

export default class CalculatorScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            displayValue: "0",
            value: "",
            calculatorLine: "",
            allowDot: true,
            allowPlusMinus: true,
            orientation: "portrait",
            buttons: [
                [{
                    backgroundColor: '#a9a9a9',
                    title: 'AC',
                    disable: false,
                    borderColor: '#555759',
                    onPress: () => {
                        this.onClearPress()
                    },
                    color: '#e8e9ea'
                }],
                [{
                    backgroundColor: '#a9a9a9',
                    title: '7',
                    disable: false,
                    borderColor: '#555759',
                    onPress: () => {
                        this.onDigitPress("7")
                    },
                    color: '#e8e9ea'
                },
                    {
                        backgroundColor: '#a9a9a9',
                        title: '8',
                        disable: false,
                        borderColor: '#555759',
                        onPress: () => {
                            this.onDigitPress("8")
                        },
                        color: '#e8e9ea'
                    },
                    {
                        backgroundColor: '#a9a9a9',
                        title: '9',
                        disable: false,
                        borderColor: '',
                        onPress: () => {
                            this.onDigitPress("9")
                        },
                        color: '#e8e9ea'
                    },
                    {
                        backgroundColor: '#a9a9a9',
                        title: '/',
                        disable: false,
                        borderColor: '',
                        onPress: () => {
                            this.onBinaryOperatorPress('/')
                        },
                        color: '#e8e9ea'
                    }
                ],
                [{
                    backgroundColor: '#a9a9a9',
                    title: '4',
                    disable: false,
                    borderColor: '#555759',
                    onPress: () => {
                        this.onDigitPress("4")
                    },
                    color: '#e8e9ea'
                },
                    {
                        backgroundColor: '#a9a9a9',
                        title: '5',
                        disable: false,
                        borderColor: '#555759',
                        onPress: () => {
                            this.onDigitPress("5")
                        },
                        color: '#e8e9ea'
                    },
                    {
                        backgroundColor: '#a9a9a9',
                        title: '6',
                        disable: false,
                        borderColor: '',
                        onPress: () => {
                            this.onDigitPress("6")
                        },
                        color: '#e8e9ea'
                    }, {
                    backgroundColor: '#a9a9a9',
                    title: 'x',
                    disable: false,
                    borderColor: '',
                    onPress: () => {
                        this.onBinaryOperatorPress('*')
                    },
                    color: '#e8e9ea'
                }],
                [{
                    backgroundColor: '#a9a9a9',
                    title: '1',
                    disable: false,
                    borderColor: '#555759',
                    onPress: () => {
                        this.onDigitPress("1")
                    },
                    color: '#e8e9ea'
                },
                    {
                        backgroundColor: '#a9a9a9',
                        title: '2',
                        disable: false,
                        borderColor: '#555759',
                        onPress: () => {
                            this.onDigitPress("2")
                        },
                        color: '#e8e9ea'
                    },
                    {
                        backgroundColor: '#a9a9a9',
                        title: '3',
                        disable: false,
                        borderColor: '',
                        onPress: () => {
                            this.onDigitPress("3")
                        },
                        color: '#e8e9ea'
                    },
                    {
                        backgroundColor: '#a9a9a9',
                        title: '-',
                        disable: false,
                        borderColor: '',
                        onPress: () => {
                            this.onBinaryOperatorPress('-')
                        },
                        color: '#e8e9ea'
                    }
                ],
                [{
                    backgroundColor: '#a9a9a9',
                    title: '0',
                    disable: false,
                    borderColor: '#555759',
                    onPress: () => {
                        this.onDigitPress("0")
                    },
                    color: '#e8e9ea'
                },
                    {
                        backgroundColor: '#a9a9a9',
                        title: '.',
                        disable: false,
                        borderColor: '',
                        onPress: () => {
                            this.onDotPress('.')
                        },
                        color: '#e8e9ea'
                    },
                    {
                        backgroundColor: '#a9a9a9',
                        title: '=',
                        disable: false,
                        borderColor: '',
                        onPress: () => {
                            this.onEqualsPress()
                        },
                        color: '#e8e9ea'
                    }, {
                    backgroundColor: '#a9a9a9',
                    title: '+',
                    disable: false,
                    borderColor: '',
                    onPress: () => {
                        this.onBinaryOperatorPress('+')
                    },
                    color: '#e8e9ea'
                }]

            ]
        }



        Dimensions.addEventListener('change', () => {
            const {width, height} = Dimensions.get("window");
            const orientation = (width > height) ? "landscape" : "portrait";
            this.setState({orientation: orientation});
        });
    }

    RenderButtons() {

        let layout = this.state.buttons.map((row, index) => {
            let rowItem = row.map((buttonItems, buttonIndex) => {
                return (
                    <InputPortraitButtons
                        onPress={buttonItems.onPress} disable={buttonItems.disable} title={buttonItems.title}
                        key={'btn-' + buttonIndex}
                    />
                )
            });
            return <View style={styles.rowInput} key={"row-" + index}>{rowItem}</View>
        });
        return layout
    }

    onDigitPress = (digit) => {
        let ds = ''
        ds += digit
        if (this.state.displayValue === "0") {
            this.setState({displayValue: this.state.value + ds});
        } else {
            this.setState({displayValue: this.state.displayValue + ds});
        }
    }

    onDotPress = (dot) => {
        let ds = ''
        ds += dot
        if (this.state.allowDot === true) {
            if (this.state.displayValue === "0") {
                this.setState(
                    {
                        displayValue: this.state.displayValue + ds,
                        allowDot: false
                    });
            } else {
                this.setState({
                    displayValue: this.state.displayValue + ds,
                    allowDot: false
                });
            }
        }
    }

    onUnaryOperatorPress = (operator) => {
        if(operator === "x^2"){
            this.setState({displayValue: Math.pow(this.state.displayValue,2)});
        }
        if(operator === "x^3"){
            this.setState({displayValue: Math.pow(this.state.displayValue,3)});
        }
        if(operator === "π"){
            this.setState({displayValue: Math.PI});
        }
        if(operator === "e"){
            this.setState({displayValue: Math.E});
        }
        if(operator === "y√x"){
            this.setState({displayValue: Math.sqrt(this.state.displayValue)});
        }
        if(operator === "x!"){
            this.setState({displayValue: factorial(this.state.displayValue)});
        }
        if(operator === "e^x"){
            this.setState({displayValue: Math.pow(Math.E, this.state.displayValue)});
        }
        if(operator === "10^x"){
            this.setState({displayValue: Math.pow(10, this.state.displayValue)});
        }
        if(operator === "ln"){
            this.setState({displayValue: Math.log(this.state.displayValue)});
        }
        if(operator === "log10"){
            this.setState({displayValue:  Math.log(this.state.displayValue) / Math.LN10});
        }
    }

    onBinaryOperatorPress = (operator) => {
        this.setState({
            displayValue: this.state.displayValue + operator,
            allowDot: true
        });
    }

    onEqualsPress = () => {
        let result= eval(this.state.displayValue);
        this.setState({displayValue: result % 1 === 0 ? result : result.toFixed(2)});
    }

    onClearPress = () => {
        this.setState({
            displayValue: "0",
            allowDot: true,
            allowPlusMinus: true
        });
    }

    onPlusMinusPress = () => {
        if (this.state.allowPlusMinus === true) {
            if(this.state.displayValue !== '0') {
                this.setState({
                    displayValue: "-" + this.state.displayValue,
                    allowPlusMinus: false
                });
            }
        }
    }

    onModulusPress = (operator) => {
        this.setState({
            displayValue: this.state.displayValue + operator,
            allowDot: true
        });
    }

    renderPortrait() {
        return (
            <View style={styles.container}>
                <View style={styles.resultContainer}>
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
                        <InputLandscapeButtons onPress={() => {
                            this.onUnaryOperatorPress("y√x")
                        }} title="y√x"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onUnaryOperatorPress("x!")
                        }} title="x!"/>
                        <InputLandscapeButtons onPress={this.onClearPress} title="AC"/>
                        <InputLandscapeButtons onPress={this.onPlusMinusPress} title="+/-"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onModulusPress('%')
                        }} title="%"/>
                    </View>

                    <View style={styles.rowInput}>

                        <InputLandscapeButtons onPress={() => {
                            this.onUnaryOperatorPress("e^x")
                        }} title="e^x"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onUnaryOperatorPress("10^x")
                        }} title="10^x"/>


                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("7")
                        }} title="7"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("8")
                        }} title="8"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("9")
                        }} title="9"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onBinaryOperatorPress("/")
                        }} title="÷"/>

                    </View>

                    <View style={styles.rowInput}>
                        <InputLandscapeButtons onPress={() => {
                            this.onUnaryOperatorPress("ln")
                        }} title="ln"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onUnaryOperatorPress("log10")
                        }} title="log10"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("4")
                        }} title="4"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("5")
                        }} title="5"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("6")
                        }} title="6"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onBinaryOperatorPress("*")
                        }} title="x"/>
                    </View>

                    <View style={styles.rowInput}>
                        <InputLandscapeButtons onPress={() => {
                            this.onUnaryOperatorPress("e")
                        }} title="e"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onUnaryOperatorPress("x^2")
                        }} title="x^2"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("1")
                        }} title="1"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("2")
                        }} title="2"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("3")
                        }} title="3"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onBinaryOperatorPress("-")
                        }} title="-"/>

                    </View>

                    <View style={styles.rowInput}>
                        <InputLandscapeButtons onPress={() => {
                            this.onUnaryOperatorPress("π")
                        }} title="π"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onUnaryOperatorPress("x^3")
                        }} title="x^3"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onDigitPress("0")
                        }} title="0" color="white" backgroundColor="#607D8B" style={{flex: 2}}/>
                        <InputLandscapeButtons onPress={() => {
                            this.onDotPress(".")
                        }} title="." color="white" backgroundColor="#607D8B"/>
                        <InputLandscapeButtons onPress={this.onEqualsPress} title="=" color="white"
                                               backgroundColor="#DCA394"/>
                        <InputLandscapeButtons onPress={() => {
                            this.onBinaryOperatorPress("+")
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
    container: {flex: 1, paddingVertical: 50},
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