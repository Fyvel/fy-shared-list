export type ListItem = {
    complete: boolean,
    text: string,
}

export type List = {
    id: string,
    name: string,
    active: boolean,
    items: ListItem[],
}

export type LinkItem = {
    text: string,
    id: string,
    itemsNumber: number,
}