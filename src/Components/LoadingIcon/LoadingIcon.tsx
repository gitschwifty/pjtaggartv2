import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './LoadingIcon.css';

interface LoadingIconProps {
  size: number;
}

class LoadingIcon extends React.Component<LoadingIconProps> {
  render() {
    return (
      <div style={{ width: this.props.size + 'px' }} className='progress_div'>
        <CircularProgress size={this.props.size} />
      </div>
    );
  }
}

export default LoadingIcon;
