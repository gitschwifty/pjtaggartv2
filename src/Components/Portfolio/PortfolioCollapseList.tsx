import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { GitRepoInterface, GitDirInterface } from './Portfolio';
import PortfolioRecursiveCollapse from './PortfolioRecursiveCollapse';
import PortfolioListItem from './PortfolioListItem';
import { updateRepo } from '../../Redux/Actions/portfolioActions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface CollapseListProps {
  git_repo: GitRepoInterface;
  openModal: (code: JSX.Element) => void;
  updateRepo: typeof updateRepo;
}

export interface CollapseListState {
  open: boolean;
}

export const InitialState: CollapseListState = {
  open: false
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateRepo: (repo: GitRepoInterface) => dispatch(updateRepo(repo))
});

class PortfolioCollapseList extends React.Component<
  CollapseListProps,
  CollapseListState
> {
  constructor(props: CollapseListProps) {
    super(props);

    this.state = InitialState;
    this.handleClick = this.handleClick.bind(this);
  }

  private handleClick = () => {
    const { git_repo } = this.props;
    if (!git_repo.loaded) {
      git_repo.topDirs = git_repo.topDirs.map(dir =>
        this.getTreeRecursive(dir)
      );

      this.props.updateRepo(git_repo);
    }

    this.setState(state => ({
      open: !state.open
    }));
  };

  private getTreeRecursive(dir: GitDirInterface) {
    fetch(dir.git_url + '?recursive=1')
      .then(response => {
        if (response.status !== 403) {
          response
            .json()
            .then(data => {
              for (const treeFile of data.tree) {
                if (treeFile.path.includes('/')) {
                  const path = treeFile.path.split('/');
                  dir.dirs = dir.dirs.map(folder =>
                    folder.path === path[0]
                      ? this.updateDir(path.slice(1), treeFile, folder)
                      : folder
                  );
                } else {
                  if (treeFile.type === 'tree') {
                    dir.dirs.push({
                      sha: treeFile.sha,
                      path: treeFile.path,
                      git_url: treeFile.url,
                      dirs: [],
                      files: []
                    });
                  } else {
                    dir.files.push({
                      sha: treeFile.sha,
                      path: treeFile.path,
                      type: treeFile.type,
                      git_url: treeFile.url
                    });
                  }
                }
              }

              return dir;
            })
            .catch(error => alert(error));
        }
      })
      .catch(error => alert(error));

    return dir;
  }

  private updateDir(path: string[], file: any, dir: GitDirInterface) {
    if (path.length === 1) {
      if (file.type === 'tree') {
        dir.dirs.push({
          sha: file.sha,
          path: path[0],
          git_url: file.url,
          dirs: [],
          files: []
        });
      } else {
        dir.files.push({
          sha: file.sha,
          path: path[0],
          type: file.type,
          git_url: file.url
        });
      }
    } else {
      dir.dirs = dir.dirs.map(folder =>
        folder.path === path[0]
          ? this.updateDir(path.slice(1), file, folder)
          : folder
      );
    }

    return dir;
  }

  public render() {
    const { git_repo } = this.props;

    const topDirs = git_repo.topDirs.map(dir => (
      <PortfolioRecursiveCollapse
        dir={dir}
        depth={1}
        key={dir.path}
        openModal={this.props.openModal}
      />
    ));

    const topFiles = git_repo.topFiles.map(file => (
      <PortfolioListItem
        file={file}
        depth={1}
        key={file.path}
        openModal={this.props.openModal}
      />
    ));

    return (
      <React.Fragment>
        <ListItem divider button onClick={this.handleClick}>
          <ListItemText primary={git_repo.title} />
        </ListItem>
        <Collapse in={this.state.open} timeout={500} unmountOnExit>
          <List disablePadding>
            {topDirs}
            {topFiles}
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(PortfolioCollapseList);
