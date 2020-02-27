import { useEffect, useState, useCallback } from "react"
import useFirebase from "./useFirebase"

const initialState = {
    id: 'todos',
    name: 'New list',
    active: true,
    items: [] as { complete: boolean, text: string }[]
}
type List = typeof initialState

const listFactory = ({ id, active, items, name } = initialState): List => {
    return {
        id: id || initialState.id,
        active: (active !== undefined) ? active : initialState.active,
        items: items || initialState.items,
        name: name || initialState.name,
    }
}

export default function useSharedList() {
    const [list, setList] = useState(initialState)
    const [error, setError] = useState<Error>()
    const [loading, setLoading] = useState(false)
    const { firebase } = useFirebase()

    const updateList = useCallback((newList: List) => {
        setList(newList)
        const update = firebase.firestore().collection('lists')
            .doc(newList.id)
            .update(newList)
        return update
    }, [])

    const selectList = (name: string) => {
        const selectedList = { ...listFactory(), name }
        updateList({ ...selectedList })
    }
    const addItem = (newItem: string) => {
        const items = [...list.items]
        items.unshift({ complete: false, text: newItem })
        const update = { ...list }
        update.items = items
        updateList(update)
    }
    const checkItem = (index: number) => {
        const items = [...list.items]
        items[index].complete = !items[index].complete
        const update = { ...list }
        update.items = items
        updateList(update)
    }
    const removeItem = (index: number) => {
        const items = [...list.items]
        items.splice(index, 1)
        const update = { ...list }
        update.items = items
        updateList(update)
    }
    const resetList = () => {
        const update = { ...list }
        update.items = []
        updateList(update)
    }

    // fetch items on load
    useEffect(() => {
        setLoading(true)
        const fetchList = firebase.firestore().collection('lists')
            .doc('todos')
            .onSnapshot(
                doc => {
                    if (!doc) { throw new Error('Nothing here') }
                    console.log('doc received', doc.data())
                    const result = listFactory({ ...doc.data() as List })
                    setList(result)
                    setLoading(false)
                },
                err => {
                    setError(err)
                    setList(initialState)
                    setLoading(false)
                })
        // returning the fetchList function will ensure that
        // we unsubscribe from document changes when our id
        // changes to a different value.
        return fetchList
    }, [])

    return {
        error,
        loading,
        list,
        addItem,
        removeItem,
        resetList,
        checkItem,
    }
}