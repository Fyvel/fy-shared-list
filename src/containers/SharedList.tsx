import React, { useState, ChangeEvent, useEffect } from "react";
import { List, NewItem } from "../components/List";
import useSharedList from "../hooks/useSharedList";

type Props = { id: string | null }
export default function SharedList(props: Props) {
    const initial = {
        item: '',
        listId: ''
    }
    const [item, setItem] = useState<string>(initial.item)

    const {
        list,
        addItem,
        checkItem,
        removeItem,
        resetList,
        error,
        loading,
        selectList
    } = useSharedList()

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

    useEffect(() => {
        if (!props.id) return
        const unsubscribe = selectList(props.id)
        return () => unsubscribe
    }, [props.id, selectList])

    return (
        <>
            <h3>{list.name}</h3>
            {!loading && props.id &&
                <NewItem
                    value={item}
                    handleClick={handleAddClick}
                    handleKeyDown={handleEnterPress}
                    handleChange={handleChange} />}
            {props.id &&
                <List
                    loading={loading}
                    error={error}
                    items={list.items}
                    handleChangeItem={checkItem}
                    handleRemoveItem={removeItem}
                    handleResetList={resetList} />}
            {/* TODO: {!props.id && 'Grid coming'} */}
        </>)
}