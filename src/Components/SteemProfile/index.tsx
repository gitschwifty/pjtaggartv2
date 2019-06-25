import React from 'react';
import Profile from './Profile';
import Page from '../Page';
import { HeaderContainer, BodyContainer } from '../Container';
import Helmet from 'react-helmet';
import { RouteComponentProps } from 'react-router';
import UserSearchBar from './UserSearchBar';

export interface ProfileProps {
  user?: string;
}

export default class extends React.Component<
  RouteComponentProps<ProfileProps>,
  { user: string; searchBar: string }
> {
  constructor(props: RouteComponentProps<ProfileProps>) {
    super(props);

    this.state = {
      user: props.match.params.user ? props.match.params.user : 'petertag',
      searchBar: ''
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  public handleSearch = (searchText: string) => {
    this.setState({
      user: searchText
    });
  };

  public render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <Helmet>
          <title>{'@' + user}</title>
        </Helmet>
        <Page>
          <HeaderContainer title={'@' + user} />
          <BodyContainer>
            <UserSearchBar handleEnter={this.handleSearch} />
            <Profile user={user} />
          </BodyContainer>
        </Page>
      </React.Fragment>
    );
  }
}
