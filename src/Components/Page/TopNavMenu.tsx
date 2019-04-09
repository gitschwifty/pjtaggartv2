import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

interface TopNavMenuState {
  anchorEl: HTMLElement | null;
}

export default class TopNavMenu extends React.PureComponent<
  { title: string; children: JSX.Element[] },
  TopNavMenuState
> {
  constructor(props: { title: string; children: JSX.Element[] }) {
    super(props);

    this.state = {
      anchorEl: null
    };
  }

  private handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  private handleClose = () => {
    this.setState({ anchorEl: null });
  };

  public render() {
    const { anchorEl } = this.state;

    return (
      <React.Fragment>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : undefined}
          aria-haspopup='true'
          onClick={this.handleClick}
          style={{ color: '#f4f4f4' }}
        >
          {this.props.title}
        </Button>
        <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          disableAutoFocusItem
        >
          {this.props.children.map((child, index) => (
            <MenuItem
              key={index}
              onClick={this.handleClose}
              style={{ color: '#373737' }}
            >
              {child}
            </MenuItem>
          ))}
        </Menu>
      </React.Fragment>
    );
  }
}
