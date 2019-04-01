import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Discussion } from 'dsteem';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import './PostPreview.css';

interface PostPreviewProps {
  post: Discussion;
  key: string;
}

class PostPreview extends React.Component<PostPreviewProps> {
  render() {
    return (
      <React.Fragment>
        <div className='preview_div'>
          <Link to={'/post/' + this.props.post.permlink}>
            <h2 className='preview_title'>{this.props.post.title}</h2>
          </Link>
          <h4 className='preview_date'>
            {new Date(this.props.post.created).toUTCString()}
          </h4>
          <h4 className='preview_tag'>
            Posted to{' '}
            {this.props.post.category.charAt(0).toLocaleUpperCase() +
              this.props.post.category.slice(1)}
          </h4>
          <ReactMarkdown
            source={this.props.post.body.slice(0, 550).trimRight() + '...'}
            allowedTypes={['text', 'paragraph']}
            allowNode={node => {
              if (
                node.type === 'paragraph' &&
                node.children &&
                node.children.length > 0
              )
                return true;
              if (node.type === 'text' && node.value && node.value.length > 5) {
                return true;
              }
              return false;
            }}
          />
        </div>
        <Divider variant='middle' style={{ backgroundColor: '#373737' }} />
      </React.Fragment>
    );
  }
}

export default PostPreview;
