import React from 'react';

class BodyContainer extends React.Component {
  public render() {
    return <div id='body_container'>{this.props.children}</div>;
  }
}

export default BodyContainer;
