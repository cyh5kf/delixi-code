import React from 'react';
import List from '@material-ui/core/List';
import {ListItem, ListItemIcon, ListItemText} from '@material-ui/core/List';
import Icon from '@material-ui/core/Icon';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import logoPng from './logo.png';
import Divider from '@material-ui/core/Divider';
import {Link} from 'react-router-dom';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';

class Menu extends React.Component {
    state = {
        selected:0
    }

    onSelected = (key,item) => {
        const {history} = this.props;
        history.push(item.url)
        this.setState({
            selected:key
        })
    }
    render() {
        const {data, classes, history } = this.props;
        return (
            <List style={{paddingTop:0}} className="menu">
                <div className={classes.toolbar}>
                    <Typography className="app_login" variant="title" color="inherit" noWrap>
                        <img src={logoPng} alt=""/>
                    </Typography>
                </div>
                <Divider />
                <MenuList>
                    {
                        data.map((item,key)=>
                            <MenuItem className={classes.menuItem} key={key} selected={
                                location.pathname === item.url} onClick={()=>this.onSelected(key,item)}>
                                <ListItemIcon className={classes.icon}>
                                    <Icon>send</Icon>
                                </ListItemIcon>
                                <ListItemText classes={{ primary: classes.primary }} inset primary={item.label}/>
                            </MenuItem>)
                    }
                </MenuList>
            </List>
        )
    }
}

export default Menu;