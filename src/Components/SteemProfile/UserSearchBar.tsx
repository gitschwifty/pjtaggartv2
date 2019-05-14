import React from 'react';
import { TextField } from '@material-ui/core';

interface SearchBarProps {
  handleEnter: (searchText: string) => void;
}

interface SearchBarState {
  searchText: string;
}

export default class UserSearchBar extends React.Component<
  SearchBarProps,
  SearchBarState
> {
  constructor(props: SearchBarProps) {
    super(props);

    this.state = {
      searchText: ''
    };
  }

  public handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchText: event.target.value });
  };

  public handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      this.props.handleEnter(this.state.searchText);
    }
  };

  public render() {
    return (
      <TextField
        id='searchbar'
        placeholder='Search Steem Users'
        value={this.state.searchText}
        onChange={this.handleSearchChange}
        onKeyDown={this.handleKeyPress}
        fullWidth
        style={{
          margin: '10px auto',
          display: 'block',
          width: '30%',
          textAlign: 'center'
        }}
      />
    );
  }
}
