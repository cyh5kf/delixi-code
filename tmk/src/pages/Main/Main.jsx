import React from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import WorkIcon from '@material-ui/icons/Work';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import StarIcon from "@material-ui/icons/Star";
import SendIcon from "@material-ui/icons/Send";
import MailIcon from "@material-ui/icons/Mail";
import DeleteIcon from "@material-ui/icons/Delete";
import ReportIcon from "@material-ui/icons/Report";
// import { mailFolderListItems, otherMailFolderListItems } from './tileData';
import LoadingBar from 'components/LoadingBar/LoadingBar';
import Notice from 'components/Notice/Notice';
import logoPng from "./TopBar/logo.png";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MapsLocalGasStation from "material-ui/SvgIcon";
import { getMenuTitle } from "utils";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "auto",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  content: {
    overflow: "auto",
    marginTop: "4rem",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});

class Main extends React.Component {
  state = {
    open: false,
    menus: [],
    anchorEl: null,
    selectedIndex: null,
  };

  componentDidMount() {
    const urls = ['returnmoney','withdrawmoney','discountcoupon','guardmoney','duein','wash']
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      if (location.pathname.search(new RegExp(url))!=-1) {
        this.setState({
          selectedIndex:i
        })
      }
    }
  }

  componentWillMount() {
    let menus = sessionStorage.getItem("menus")
      ? JSON.parse(sessionStorage.getItem("menus"))
      : [];
    this.setState({ menus });
  }
  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ selectedIndex: index, anchorEl: null });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme, history} = this.props;
    const {anchorEl}  = this.state
    let list = this.state.menus.map(item => item.name);
    let cov = JSON.stringify(this.state.menus)
    const options = [
      '回款用户',
      '提现用户',
      '可使用优惠券用户',
      '站岗用户','待收用户','流失用户',
    ];
    return (
      <div className={classNames(classes.root,'main')}>
        <AppBar
          position="absolute"
          className={classNames(
            classes.appBar,
            this.state.open && classes.appBarShift
          )}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.hide
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" noWrap>
              客服管理系统
              <cite style={{marginLeft:'100px',padding:'0 10px'}}>{
                getMenuTitle()
              }</cite>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(
              classes.drawerPaper,
              !this.state.open && classes.drawerPaperClose
            )
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <Typography
              className="app_login"
              variant="title"
              color="inherit"
              noWrap
            >
              <img src={logoPng} alt="" />
            </Typography>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <div>
              {list.includes("客户列表") ? (
                <ListItem
                  className={
                    location.pathname.endsWith("customerList")
                      ? "menu_item_selected"
                      : ""
                  }
                  button
                  onClick={() =>{
                      this.setState({selectedIndex: null});
                      history.push("/view/customerManagement/customerList")
                    }
                  }
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="客户列表" />
                </ListItem>
              ) : null}

              {list.includes("专属客服管理") ? (
                <ListItem
                  button
                  className={
                    location.pathname.endsWith("telemarketingManagement")
                      ? "menu_item_selected"
                      : ""
                  }
                  onClick={() =>{
                    this.setState({selectedIndex: null});
                    history.push(
                      "/view/customerManagement/telemarketingManagement"
                    )
                  }
                  }
                >
                  <ListItemIcon>
                    <StarIcon />
                  </ListItemIcon>
                  <ListItemText primary="专属客服管理" />
                </ListItem>
              ) : null}

              {list.includes("VIP2管理") ? (
                <ListItem
                  button
                  className={
                    location.pathname.endsWith("exclusiveCustomerServiceManagement")
                      ? "menu_item_selected"
                      : ""
                  }
                  onClick={() =>{
                    this.setState({selectedIndex: null});
                    history.push(
                      "/view/customerManagement/exclusiveCustomerServiceManagement"
                    )
                  }
                  }
                >
                  <ListItemIcon>
                    <SendIcon />
                  </ListItemIcon>
                  <ListItemText primary="VIP2管理" />
                </ListItem>
              ) : null}

              {list.includes("业绩查询") ? (
                <ListItem
                  button
                  className={
                    location.pathname.endsWith("telemarketingPerformanceManagement")
                      ? "menu_item_selected"
                      : ""
                  }
                  onClick={() =>{
                    this.setState({selectedIndex: null});
                    history.push(
                      "/view/customerManagement/telemarketingPerformanceManagement"
                    )
                  }
                  }
                >
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary="业绩查询" />
                </ListItem>
              ) : null}

              {list.includes("客户-客服管理") ? (
                <ListItem
                  button
                  className={
                    location.pathname.endsWith("customerManagement")
                      ? "menu_item_selected"
                      : ""
                  }
                  onClick={() =>{
                    this.setState({selectedIndex: null});
                    history.push("/view/customerManagement/customerManagement")
                  }
                  }
                >
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary="客户-客服管理" />
                </ListItem>
              ) : null}

              {list.includes("EC账户关系") ? (
                <ListItem
                  button
                  className={
                    location.pathname.endsWith("ecAccountRelation")
                      ? "menu_item_selected"
                      : ""
                  }
                  onClick={() =>{
                    this.setState({selectedIndex: null});
                    history.push("/view/customerManagement/ecAccountRelation")
                  }
                  }
                >
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary="EC账户关系" />
                </ListItem>
              ) : null}

              {list.includes("生日查询") ? (
                <ListItem
                  button
                  className={
                    location.pathname.endsWith("birthdayQueryManagement")
                      ? "menu_item_selected"
                      : ""
                  }
                  onClick={() =>{
                    this.setState({selectedIndex: null});
                    history.push("/view/customerManagement/birthdayQueryManagement")
                  }
                  }
                >
                  <ListItemIcon>
                    <DraftsIcon />
                  </ListItemIcon>
                  <ListItemText primary="生日查询" />
                </ListItem>
              ) : null}
          <ListItem
            button
            className={
              location.pathname.search(/clientclass/)!=-1
                ? "menu_item_selected"
                : ""
            }
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="When device is locked"
            onClick={this.handleClickListItem}
          >
            <ListItemIcon>
              <WorkIcon />
            </ListItemIcon>
            <ListItemText
              primary="客户分类"
              secondary={options[this.state.selectedIndex]}
            />
          </ListItem>



            </div>
          </List>
          <Menu
            id="lock-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            {
              cov.includes("回款用户") ?
                <MenuItem
                  selected={0 === this.state.selectedIndex}
                  onClick={event => {this.handleMenuItemClick(event, 0);history.push("/view/customerManagement/clientclass/returnmoney")}}
                >
                  回款用户
                </MenuItem>
                :null
            }
            {
              cov.includes("提现用户") ?
                <MenuItem
                  selected={1 === this.state.selectedIndex}
                  onClick={event => {this.handleMenuItemClick(event, 1);history.push("/view/customerManagement/clientclass/withdrawmoney")}}
                >
                  提现用户
                </MenuItem>
                :null
            }
            {
              cov.includes("可使用优惠券用户") ?
                <MenuItem
                  selected={2 === this.state.selectedIndex}
                  onClick={event => {this.handleMenuItemClick(event, 2);history.push("/view/customerManagement/clientclass/discountcoupon")}}
                >
                  可使用优惠券用户
                </MenuItem>
                :null
            }
            {
              cov.includes("站岗用户") ?
                <MenuItem
                  selected={3 === this.state.selectedIndex}
                  onClick={event => {this.handleMenuItemClick(event, 3);history.push("/view/customerManagement/clientclass/guardmoney")}}
                >
                  站岗用户
                </MenuItem>
                :null
            }
            {
              cov.includes("待收用户") ?
                <MenuItem
                  selected={4 === this.state.selectedIndex}
                  onClick={event => {this.handleMenuItemClick(event, 4);history.push("/view/customerManagement/clientclass/duein")}}
                >
                  待收用户
                </MenuItem>
                :null
            }
            {
              cov.includes("流失用户") ?
                <MenuItem
                  selected={5 === this.state.selectedIndex}
                  onClick={event => {this.handleMenuItemClick(event, 5);history.push("/view/customerManagement/clientclass/wash")}}
                >
                  流失用户
                </MenuItem>
                :null
            }

            {/* {options.map((option, index) => (
              <MenuItem
                key={option}
                disabled={index === 0}
                selected={index === this.state.selectedIndex}
                onClick={event => this.handleMenuItemClick(event, index)}
              >
                {option}
              </MenuItem>
            ))} */}
          </Menu>
          <Divider />
          <List>{}</List>
        </Drawer>
        <LoadingBar />
        <Notice />
        <main className={classes.content}>{this.props.children}</main>
      </div>
    );
  }
}

export default withStyles(styles)(Main);
