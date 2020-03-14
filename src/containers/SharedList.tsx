import React, { useState, ChangeEvent, useEffect } from "react";
import { List, NewItem } from "../components/List";
import useSharedList from "../hooks/useSharedList";
import EventEmitter from '../event/event';

export default function SharedList() {
    const initial = {
        item: '',
        listId: 'todos'
    }
    const [item, setItem] = useState<string>(initial.item)
    const [listId, setListId] = useState<string>(initial.listId)

    const {
        list,
        addItem,
        checkItem,
        removeItem,
        resetList,
        error,
        loading,
        selectList } = useSharedList()

    useEffect(() => {
        EventEmitter.subscribe('onListChange', (id: string) => setListId(id))
        return () => EventEmitter.unsubscribe('onListChange')
    }, [])

    useEffect(() => {
        selectList(listId)
    }, [listId])

    const handleChange = (event: ChangeEvent<{ value: unknown }>) =>
        setItem(event.target.value as string);

    const handleAddClick = () => {
        if (!item) { return }
        addItem(item)
        setItem(initial.item)
    }

    const handleEnterPress = (e: any) => {
        if (+e.keyCode === 13) {
            handleAddClick()
        }
    }

    return (
        <>
            <h3>{list.name}</h3>
            {!loading &&
                <NewItem
                    value={item}
                    handleClick={handleAddClick}
                    handleKeyDown={handleEnterPress}
                    handleChange={handleChange} />}
            <List
                loading={loading}
                error={error}
                items={list.items}
                handleChangeItem={checkItem}
                handleRemoveItem={removeItem}
                handleResetList={resetList} />
        </>)
}