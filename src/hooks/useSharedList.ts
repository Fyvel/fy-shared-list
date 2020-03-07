import { useEffect, useState, useCallback, useMemo } from "react"
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
    const [loading, setLoading] = useState(false)
    const [links, setLinks] = useState<LinkItem[]>([])

    const updateList = useCallback((newList: List) => {
        if (!newList.id) return
        setList(newList)
        const update = firestore().collection('lists')
            .doc(newList.id)
            .update(newList)
        return update
    }, [firestore])

    const selectList = (id: string) => {
        const selectedList = { ...listFactory(), id }
        setList(selectedList)
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

    const fetchLinks = useMemo(() => {
        firestore().collection('lists')
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
                    });
                    setLinks(result)
                    setLoading(false)
                },
                err => {
                    setError(err)
                    setList(initialState)
                    setLoading(false)
                })
    }, [firestore])

    const fetchList = useMemo(() => {
        if (!list.id) return
        firestore().collection('lists')
            .doc(list.id)
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
    }, [firestore, list.id])

    // fetch list info
    useEffect(() => {
        setLoading(true)
        return fetchLinks
    }, [])

    // fetch items on load
    useEffect(() => {
        selectList(list.id)
        setLoading(true)
        return fetchList
    }, [list.id])

    return {
        error,
        loading,
        list,
        addItem,
        removeItem,
        resetList,
        checkItem,
        selectList,
        links,
    }
}