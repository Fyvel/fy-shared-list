import React, { useState, ChangeEvent } from "react";
import { List, NewItem } from "../components/List";
import useSharedList from "../hooks/useSharedList";

export default function SharedList() {
    const initial = ''
    const [item, setItem] = useState<string>(initial)
    const { list, addItem, checkItem, removeItem, resetList, error, loading } = useSharedList()

    const handleChange = (event: ChangeEvent<{ value: unknown }>) =>
        setItem(event.target.value as string);

    const handleAddClick = () => {
        if (!item) { return }
        addItem(item)
        setItem(initial)
    }

    const handleEnterPress = (e: any) => {
        if (+e.keyCode === 13) {
            handleAddClick()
        }
    }

    return (
        <>
            <h3>Ma darling's list</h3>
            <NewItem
                value={item}
                handleClick={handleAddClick}
                handleKeyDown={handleEnterPress}
                handleChange={handleChange} />
            <List
                loading={loading}
                error={error}
                items={list.items}
                handleChangeItem={checkItem}
                handleRemoveItem={removeItem}
                handleResetList={resetList} />

        </>)
}