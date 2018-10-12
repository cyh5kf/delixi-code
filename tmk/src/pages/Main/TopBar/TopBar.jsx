import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from '@material-ui/core/IconButton'
import Icon from "@material-ui/core/Icon";

class TopBar extends React.Component {
  render() {
    const { data, classes } = this.props;
    return (
      <div className="top_bar">
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, classes[`appBar-left`])}
        >
          <Toolbar className="toolbar">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.props.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.props.open && classes.hide
              )}
            >
              <Icon>send</Icon>
            </IconButton>
            <div className="top_bar_menu">
              {data.map((item, key) => (
                <Typography
                  className="menu_item"
                  key={key}
                  variant="title"
                  color="inherit"
                  noWrap
                >
                  <Button
                    color="inherit"
                    className={`menu_item_${
                      new RegExp(`/${item.index}/`, "gi").test(
                        location.pathname
                      )
                        ? "selected"
                        : ""
                    }`}
                    onClick={() => this.props.onCheckedTopMenu(key)}
                  >
                    {item.label}
                  </Button>
                </Typography>
              ))}
              <Typography
                className="menu_user"
                variant="title"
                color="inherit"
                noWrap
              >
                <Button color="inherit">User</Button>
              </Typography>
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default TopBar;
