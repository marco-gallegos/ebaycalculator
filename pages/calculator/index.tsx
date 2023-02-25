import { View, Text, Button, TextInput, ScrollView } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useCalculator from './useCalculator'
import axios from 'axios' 


export default function  Calculator() {
    const calculatorState = useCalculator()

    const handleCalculate = async (event:any) => {
        await calculatorState.requestCalculator()
    }
    

    return (
        <View>
            <Text>Ebay Price</Text>
            <TextInput
                placeholder='Name'
                value={`${calculatorState.name}`}
                onChangeText={calculatorState.updateName}
            ></TextInput>
            <TextInput
                inputMode='decimal'
                placeholder='Price'
                value={`${calculatorState.value}`}
                onChangeText={calculatorState.updateValue}
            ></TextInput>

            <Button title={"Calculate"} onPress={handleCalculate} />

             <Text>Price History</Text>

            <ScrollView>

                {
                    calculatorState.valueHistory.map( (history:any) => {
                        return (
                            <View>
                                <Text>{  history.final_cost }</Text>
                                <Text>{ history.final_cost_in_local_currency }</Text>
                            </View>
                        )
                    })
                }
        
            </ScrollView>
        </View>
    )
}
