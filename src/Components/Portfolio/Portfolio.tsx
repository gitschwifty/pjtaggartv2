import React from 'react';
import { BodyContainer, HeaderContainer } from '../Container';
import { List, ListSubheader } from '@material-ui/core';
import PortfolioCollapseList from './PortfolioCollapseList';
import { AppState } from '../../Redux/Reducers';
import LoadingIcon from '../LoadingIcon';
import ModalCodeDisplay from './ModalDisplay';
import { connect, ConnectedComponentClass } from 'react-redux';

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
  files: GitFileInterface[];
  dirs: GitDirInterface[];
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
  loaded: boolean;
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

  private closeModal = () => {
    this.setState({ modalOpen: false });
  };

  private openModal = (code: JSX.Element) => {
    this.setState({ modalOpen: true, displayCode: code });
  };

  public render() {
    if (this.props.repos.length < 1) {
      return <LoadingIcon size={80} />;
    }

    const gitRepos = this.props.repos.map(repo => (
      <PortfolioCollapseList
        git_repo={repo}
        openModal={this.openModal}
        key={repo.title}
      />
    ));

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
            {gitRepos}
          </List>
        </BodyContainer>
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(Portfolio) as unknown as ConnectedComponentClass<typeof Portfolio, Pick<PortfolioProps, never>>;
