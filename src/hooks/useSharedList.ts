import { useState, useCallback } from "react"
import useFirebase from "./useFirebase"
import { List, LinkItem } from "../models/domain"

const initialState = {
    id: '',
    name: '',
    active: true,
    items: [] as { complete: boolean, text: string }[]
}

const listFactory = ({ id, active, items, name } = initialState): List => {
    return {
        id: id || initialState.id,
        active: (active !== undefined) ? active : initialState.active,
        items: items || initialState.items,
        name: name || initialState.name,
    }
}

export default function useSharedList() {
    const { firestore } = useFirebase()
    const [list, setList] = useState<List>(initialState)
    const [error, setError] = useState<Error>()
    const [loading, setLoading] = useState(true)
    const [listNames, setListNames] = useState<LinkItem[]>([])


    const selectList = useCallback((id: string) => {
        if (!id) return
        firestore.collection('lists')
            .doc(id)
            .onSnapshot(
                doc => {
                    if (!doc) { throw new Error('Nothing here') }
                    const result = listFactory({ ...doc.data() as List })
                    setList(result)
                    setLoading(false)
                },
                err => {
                    setError(err)
                    setList(initialState)
                    setLoading(false)
                })
    }, [firestore])
    const getLists = useCallback(() => {
        firestore.collection('lists')
            .where("active", "==", true)
            .onSnapshot(
                snapchot => {
                    if (!snapchot) { throw new Error('Nothing here') }
                    const result: LinkItem[] = []
                    snapchot.forEach(doc => {
                        const { id, name, items } = doc.data() as List
                        result.push({
                            id,
                            text: name,
                            itemsNumber: (items || []).filter(x => x && !x.complete).length
                        })
                    })
                    setListNames(result)
                    setLoading(false)
                },
                err => {
                    setError(err)
                    setList(initialState)
                    setLoading(false)
                })
    }, [firestore])
    const updateList = useCallback((newList: List) => {
        if (!newList.id) return
        setList(newList)
        const update = firestore.collection('lists')
            .doc(newList.id)
            .update(newList)
        return update
    }, [firestore])
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

    const hook = {
        error,
        list,
        listNames,
        loading,
        addItem,
        removeItem,
        resetList,
        checkItem,
        selectList,
        getLists,
    }

    return hook
}