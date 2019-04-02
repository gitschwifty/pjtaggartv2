import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Discussion } from 'dsteem';
import { connect } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { AppState } from '../../Redux/Reducers';
import { HeaderContainer, BodyContainer } from '../Container';
import './Post.css';
import LoadingIcon from '../LoadingIcon';

export interface PostRouteParams {
  permlink: string;
}

interface PostProps extends RouteComponentProps<PostRouteParams> {
  posts: Discussion[];
}

interface PostState {
  post?: Discussion;
  tags: string[];
}

const mapStateToProps = (state: AppState) => ({
  posts: state.Post.posts
});

class Post extends React.Component<PostProps, PostState> {
  constructor(props: PostProps) {
    super(props);

    if (props.match && props.match.params.permlink) {
      const currentPost = props.posts.find(
        post => post.permlink === props.match.params.permlink
      );

      this.state = {
        post: currentPost,
        tags: []
      };

      if (currentPost) {
        const jsonMetadata = JSON.parse(currentPost.json_metadata);
        this.state = {
          post: currentPost,
          tags: jsonMetadata.tags
        };
      }
    }
  }

  public componentDidUpdate() {
    if (this.state.post) return;
    if (this.props.match && this.props.match.params.permlink) {
      const currentPost = this.props.posts.find(
        post => post.permlink === this.props.match.params.permlink
      );

      if (currentPost) {
        const jsonMetadata = JSON.parse(currentPost.json_metadata);
        this.setState({
          post: currentPost,
          tags: jsonMetadata.tags
        });
      }
    }
  }

  public render() {
    if (!this.state.post) {
      if (this.props.posts.length === 0) {
        return <LoadingIcon size={80} />;
      }
      return (
        <React.Fragment>
          <HeaderContainer title='Post not found.' />
        </React.Fragment>
      );
    }

    const { title, created, category, body } = this.state.post;
    return (
      <React.Fragment>
        <HeaderContainer
          title={title}
          date={created}
          category={category}
          tags={this.state.tags.slice(1)}
        />
        <BodyContainer>
          <ReactMarkdown source={body} className='markdown_container' />
        </BodyContainer>
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(Post);
