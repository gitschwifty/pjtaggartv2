import React from 'react';
import { BodyContainer, HeaderContainer } from '../Container';
import { List, ListSubheader, ListItem, ListItemText } from '@material-ui/core';
import PortfolioCollapseList from './PortfolioCollapseList';
import { AppState } from '../../Redux/Reducers';
import LoadingIcon from '../LoadingIcon';
import ModalCodeDisplay from './ModalDisplay';
import { connect } from 'react-redux';

export interface GitFileInterface {
  sha: string;
  path: string;
  type: 'file' | 'blob';
  git_url: string;
}

export interface GitDirInterface {
  sha: string;
  path: string;
  git_url: string;
  has_dir: boolean;
  tree: GitTreeInterface;
  dir: GitDirInterface[];
}

export interface GitTreeFileInterface {
  sha: string;
  path: string;
  type: 'blob';
  url: string;
}

export interface GitTreeInterface {
  sha: string;
  tree: GitTreeFileInterface[];
}

export interface GitRepoInterface {
  name: string;
  title: string;
  url: string;
  topFiles: GitFileInterface[];
  topDirs: GitDirInterface[];
}

export interface PortfolioState {
  modalOpen: boolean;
  displayCode: JSX.Element;
}

export interface PortfolioProps {
  repos: GitRepoInterface[];
}

const mapStateToProps = (state: AppState) => ({
  repos: state.Portfolio.repos
});

class Portfolio extends React.Component<PortfolioProps, PortfolioState> {
  constructor(props: any) {
    super(props);

    this.state = {
      modalOpen: false,
      displayCode: <code />
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {}

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  openModal = (code: JSX.Element) => {
    this.setState({ modalOpen: true, displayCode: code });
  };

  render() {
    if (this.props.repos.length < 1) {
      return <LoadingIcon size={80} />;
    }

    console.log(this.props.repos);
    const git_repos = this.props.repos.map(repo => (
      <PortfolioCollapseList
        git_repo={repo}
        openModal={this.openModal}
        key={repo.title}
      />
    ));

    console.log(git_repos);

    return (
      <React.Fragment>
        <HeaderContainer title='Portfolio' />
        <ModalCodeDisplay
          open={this.state.modalOpen}
          closeModal={this.closeModal}
        >
          {this.state.displayCode}
        </ModalCodeDisplay>
        <BodyContainer>
          <List
            component='nav'
            subheader={
              <ListSubheader component='div'>
                Programming Projects
              </ListSubheader>
            }
          >
            {git_repos}
          </List>
        </BodyContainer>
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(Portfolio);
