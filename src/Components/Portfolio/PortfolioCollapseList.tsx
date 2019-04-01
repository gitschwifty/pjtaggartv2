import React from 'react';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { GitRepoInterface } from './Portfolio';
import PortfolioRecursiveCollapse from './PortfolioRecursiveCollapse';
import PortfolioListItem from './PortfolioListItem';

interface CollapseListProps {
  git_repo: GitRepoInterface;
  openModal: (code: JSX.Element) => void;
}

export interface CollapseListState {
  open: boolean;
}

export const InitialState: CollapseListState = {
  open: false
};

class PortfolioCollapseList extends React.Component<
  CollapseListProps,
  CollapseListState
> {
  constructor(props: CollapseListProps) {
    super(props);

    this.state = InitialState;
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState(state => ({
      open: !state.open
    }));
  };

  render() {
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
        <ListItem button onClick={this.handleClick}>
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

export default PortfolioCollapseList;
