import React, { useState, KeyboardEvent, MouseEvent } from 'react'
import styles from './Menu.module.scss'
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import CircularProgress from '@material-ui/core/CircularProgress'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import ListIcon from '@material-ui/icons/List'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import { LinkItem } from '../../models/domain'
import { RoutePath } from '../../router/routes'

const useStyles = makeStyles({
    fullList: {
        width: 'auto',
        maxHeight: '65vh',
    }
})

type MenuProps = {
    links: LinkItem[],
    loading?: boolean
    user?: any
    handleLogout?: () => void
}
export default function Menu(props: MenuProps) {
    const classes = useStyles()
    const [state, setState] = useState({ bottom: false })

    const toggleDrawer = (open: boolean) => (
        event: KeyboardEvent | MouseEvent,
    ) => {
        if (event.type === 'keydown' &&
            ((event as KeyboardEvent).key === 'Tab' ||
                (event as KeyboardEvent).key === 'Shift')) {
            return
        }
        setState({ bottom: open })
    }

    return (
        <>
            <Button
                aria-label='Open drawer'
                variant="contained"
                onClick={toggleDrawer(true)} color='primary' className={styles.button}>
                <ListIcon />
            </Button>
            <Drawer anchor="bottom" open={state.bottom} onClose={toggleDrawer(false)}>
                <div
                    className={classes.fullList}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}>
                    <List>
                        {props.loading && <div className={styles.loading}>
                            <CircularProgress color='primary' />
                        </div>}
                        {props.user && props.links.map((item, index) => (
                            <Link to={`${RoutePath.SHAREDLIST}?list=${item.id}`}
                                className={styles.link}
                                key={index}>
                                <div className={styles.item}>
                                    {item.text}
                                    <Badge badgeContent={item.itemsNumber}
                                        className={styles.chip}
                                        color="primary">
                                        <div />
                                    </Badge>
                                </div>
                            </Link>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {props.user ?
                            <ListItem button key={"Sign out"}
                                onClick={props.handleLogout}>
                                <ListItemIcon>
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText primary={"Sign out"} />
                            </ListItem>
                            :
                            <ListItem button key={"Sign in"}>
                                <ListItemIcon>
                                    <span role='img' aria-label='emoji'>👋</span>
                                </ListItemIcon>
                                <ListItemText primary={"Sign in"} />
                            </ListItem>}
                    </List>
                </div>
            </Drawer>
        </>
    )
}