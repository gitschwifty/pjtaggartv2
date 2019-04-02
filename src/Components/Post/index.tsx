import React from 'react';
import Post, { PostRouteParams } from './Post';
import Page from '../Page';
import { RouteComponentProps } from 'react-router';

export default class extends React.Component<
  RouteComponentProps<PostRouteParams>
> {
  public render() {
    return (
      <Page>
        <Post {...this.props} />
      </Page>
    );
  }
}
