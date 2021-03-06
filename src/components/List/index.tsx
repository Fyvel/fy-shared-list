import React from 'react';
import styles from './List.module.scss';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';

type Item = { text: string, complete: boolean };

type NewItemProps = {
    value: string
    handleChange: (args: any) => void
    handleKeyDown: (args: any) => void
    handleClick: (args: any) => void
}
export function NewItem({ value, handleChange, handleKeyDown, handleClick }: NewItemProps) {
    return (
        <div className={styles.newItem}>
            <TextField
                className={styles.input}
                variant='outlined'
                value={value}
                onChange={handleChange}
                onKeyDown={handleKeyDown} />
            <Button aria-label='Add item'
                color='primary'
                variant="contained"
                className={styles.button}
                onClick={handleClick}>
                <AddCircleOutlineIcon />
            </Button>
        </div>
    )
}

type ListProps = {
    items: Item[]
    loading?: boolean
    error?: Error
    handleChangeItem: (index: number) => void
    handleRemoveItem: (args: any) => void
    handleResetList: () => void
}
export function List({ items, loading, handleChangeItem, handleRemoveItem, handleResetList }: ListProps) {
    return (
        <div className={styles.list}>
            {loading && <CircularProgress className={styles.loading} color='primary' />}
            {(!loading && items.length === 0) && <div>Empty list</div>}
            {items.map((item, i) => (
                <Item id={i}
                    key={i}
                    item={item}
                    handleChangeItem={handleChangeItem}
                    handleRemoveItem={handleRemoveItem} />
            ))}
            {/* {items.length > 0 &&
                <Button aria-label='Clear list' onClick={handleResetList} variant="outlined" color="secondary">
                    Clear List
                </Button>
            } */}
        </div>
    )
}

type ItemProps = {
    id: number,
    item: Item,
    handleChangeItem: (index: number) => void
    handleRemoveItem: (id: number) => void
}
export function Item({ id, item, handleChangeItem, handleRemoveItem }: ItemProps) {
    return (
        <div className={styles.item}>
            <FormControlLabel
                className={item.complete ? styles.checked : ''}
                control={
                    <Checkbox
                        checked={item.complete}
                        onChange={() => handleChangeItem(id)}
                        color="primary"
                        value={item.text} />
                } label={item.text}
            />
            <Button aria-label='Remove item' color="secondary" onClick={() => handleRemoveItem(id)}>
                <DeleteForeverRoundedIcon />
            </Button>
        </div>
    )
}

