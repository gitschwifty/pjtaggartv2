import React from 'react';
import { Discussion } from 'dsteem';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

import { AppState } from '../../Redux/Reducers';

import PostPreview from './PostPreview';
import { BodyContainer, HeaderContainer } from '../Container';

import './Feed.css';
import LoadingIcon from '../LoadingIcon';

interface FeedProps {
  posts: Discussion[];
}

const mapStateToProps = (state: AppState) => ({
  posts: state.Post.posts
});

class Feed extends React.Component<FeedProps> {
  render() {
    if (this.props.posts.length === 0) {
      return <LoadingIcon size={80} />;
    }

    return this.props.posts.map(post => (
      <PostPreview post={post} key={post.permlink} />
    ));
  }
}

export default connect(
  mapStateToProps,
  null
)(Feed);
