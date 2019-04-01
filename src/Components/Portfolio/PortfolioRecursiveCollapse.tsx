import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { GitRepoInterface, GitDirInterface } from './Portfolio';
import { CollapseListState, InitialState } from './PortfolioCollapseList';
import PortfolioListItem from './PortfolioListItem';

interface PortfolioRecursiveCollapseProps {
  dir: GitDirInterface;
  depth: number;
  openModal: (code: JSX.Element) => void;
}

class PortfolioRecursiveCollapse extends React.Component<
  PortfolioRecursiveCollapseProps,
  CollapseListState
> {
  constructor(props: PortfolioRecursiveCollapseProps) {
    super(props);

    this.state = {
      open: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { dir } = this.props;

    const listFiles = dir.tree
      ? dir.tree.tree.map(file => {
          return (
            <PortfolioListItem
              file={{
                sha: file.sha,
                path: file.path,
                git_url: file.url,
                type: file.type
              }}
              depth={this.props.depth + 1}
              key={file.path}
              openModal={this.props.openModal}
            />
          );
        })
      : null;

    const listDirs = dir.dir.map(subDir => {
      return (
        <PortfolioRecursiveCollapse
          dir={subDir}
          depth={this.props.depth + 1}
          key={subDir.path}
          openModal={this.props.openModal}
        />
      );
    });

    return (
      <React.Fragment>
        <ListItem button onClick={this.handleClick}>
          <ListItemText
            style={{ marginLeft: 25 * this.props.depth + 'px' }}
            primary={dir.path}
          />
        </ListItem>
        <Collapse in={this.state.open} timeout={500} unmountOnExit>
          <List disablePadding>
            {listDirs}
            {listFiles}
          </List>
        </Collapse>
      </React.Fragment>
    );
  }
}

export default PortfolioRecursiveCollapse;
