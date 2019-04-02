import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { GitFileInterface } from './Portfolio';
import './Portfolio.css';

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

  private onClick = () => {
    fetch(this.props.file.git_url)
      .then(response =>
        response.json().then(code => {
          this.props.openModal(
            <pre style={{ fontSize: '16px' }}>{atob(code.content)}</pre>
          );
        })
      )
      .catch(error => alert(error));
  };

  public render() {
    if (
      new RegExp(/^\.\w*|.*\.(gif|jpg|jpeg|png|pdf|ico)/, 'i').test(
        this.props.file.path
      )
    ) {
      return (
        <ListItem className='noClickItem'>
          <ListItemText
            style={{
              marginLeft: 25 * this.props.depth + 'px'
            }}
            primary={this.props.file.path}
          />
        </ListItem>
      );
    }

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
