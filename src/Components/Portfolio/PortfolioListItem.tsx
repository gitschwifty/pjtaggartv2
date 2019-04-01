import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import { GitFileInterface } from './Portfolio';

interface PortfolioListItemProps {
  file: GitFileInterface;
  depth: number;
  openModal: (code: JSX.Element) => void;
}

class PortfolioListItem extends React.Component<PortfolioListItemProps> {
  constructor(props: PortfolioListItemProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick = () => {
    fetch(this.props.file.git_url).then(response =>
      response.json().then(code => {
        console.log(code);
        console.log(atob(code.content));
        this.props.openModal(
          <pre style={{ fontSize: '16px' }}>{atob(code.content)}</pre>
        );
      })
    );
  };

  render() {
    return (
      <ListItem button onClick={this.onClick}>
        <ListItemText
          style={{ marginLeft: 25 * this.props.depth + 'px' }}
          primary={this.props.file.path}
        />
      </ListItem>
    );
  }
}

export default PortfolioListItem;
