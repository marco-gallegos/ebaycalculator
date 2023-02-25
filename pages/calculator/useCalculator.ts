import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'


const useCalculator = () => {
    // app states
    const [name, setName] = useState('')
    const [value, setValue] = useState(10)
    const [valueHistory, setValueHistory]:any = useState([])
    

    // control states
    //const [ working, setWorking ] = useState(false)
    const [ reloadHistory, setReloadHistory ] = useState(false)
    //const [ apiError, setApiError ] = useState(false)

    const updateLocalDb = (newData:any) => {
    }

    const getLocalDb = () => {
        let values:any[] = []

        return values
    }

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
            updateLocalDb([result.data])
        }
    }

    const updateValue = (event:string) => {
        const number = parseInt(event.startsWith(0) ? event.slice(1):event)

        if (!!event){
            setValue(number)
        }else{
            setValue(0)
        }
    }

    const updateName = (event:any) => {
        setName(event)
    }

    // ======================================================================
    // effects to update vars
    
    useEffect(() => {
        if (!!reloadHistory){
            const parsedDb = getLocalDb()
            setValueHistory(parsedDb).then(()=> {
                setReloadHistory(false)
            })
        }
    },[reloadHistory])

    return {
        name: name,
        value: value,
        valueHistory: valueHistory,

        updateValue: updateValue,
        updateName: updateName,

        requestCalculator: requestCalculator,
    }
}

export default useCalculator
