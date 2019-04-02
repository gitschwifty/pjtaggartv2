import React from 'react';
import TopNav from './TopNav';
import Footer from './Footer';
import './Page.css';

class Page extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <TopNav />
        <div id='content_container'>{this.props.children}</div>
        <Footer />
      </React.Fragment>
    );
  }
}

export default Page;
