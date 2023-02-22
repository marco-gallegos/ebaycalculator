import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'


const useCalculator = () => {
    // app states
    const [name, setName] = useState(null)
    const [value, setValue] = useState(10)
    const [valueHistory, setValueHistory]:any = useState([])
    

    // control states
    const [ working, setWorking ] = useState(false)
    const [ reloadHistory, setReloadHistory ] = useState(false)
    const [ apiError, setApiError ] = useState(false)   

    const requestCalculator = async () => {
        let result:any = null
        try {
            result = await axios.get(`/calculator/${value}`)
            console.debug(result.data)
        } catch (error:any) {
            console.error(`error callin calculator api with ${value}`)
            console.error(error.message)
        }

        if (!!result) {
            setValueHistory([result.data])
        }
    }
    // on load use effect
    useEffect(()=>{
        //AsyncStorage.getItem("test").then( data => {
            //console.debug("element from async storage")
            //console.debug(data)
        //})
    }, [])

    return {
        name: name,
        value: value,
        valueHistory: valueHistory,

        requestCalculator: requestCalculator,
    }
}

export default useCalculator
