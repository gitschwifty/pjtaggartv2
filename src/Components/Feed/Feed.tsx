import React from 'react';
import { Discussion } from 'dsteem';
import { connect, ConnectedComponentClass } from 'react-redux';
import { AppState } from '../../Redux/Reducers';
import PostPreview from './PostPreview';
import './Feed.css';
import LoadingIcon from '../LoadingIcon';

interface FeedProps {
  posts: Discussion[];
}

const mapStateToProps = (state: AppState) => ({
  posts: state.Post.posts
});

class Feed extends React.Component<FeedProps> {
  public render() {
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
)(Feed) as unknown as ConnectedComponentClass<typeof Feed, Pick<FeedProps, never>>;
