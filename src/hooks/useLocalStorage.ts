import { useState } from "react"

export default function useLocalStorage<T>(key: string, defaultValue?: T) {
    const [state, setState] = useState(() => {
        let value
        try {
            value = JSON.parse(window.localStorage.getItem(key) || String(defaultValue))
        } catch (e) {
            value = defaultValue
        }
        return value
    })

    const updateKey = (value?: T) => {
        setState(value)
        window.localStorage.setItem(key, value ? JSON.stringify(value) : '')
    }

    return [state, updateKey]
}