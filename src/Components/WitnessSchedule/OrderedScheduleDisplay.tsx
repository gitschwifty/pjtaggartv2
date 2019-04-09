import React from 'react';
import { RankedWitness } from './WitnessSchedule';
import { ListItem, List, ListSubheader } from '@material-ui/core';

export default class OrderedScheduleDisplay extends React.PureComponent<{
  ordered_list: RankedWitness[];
}> {
  public render() {
    const listItems = this.props.ordered_list.map((value, index) => (
      <ListItem key={index} style={{ paddingTop: 0, paddingBottom: 0 }}>
        <p
          style={{
            fontSize: '12px',
            lineHeight: '1.25em',
            display: 'block',
            margin: '0'
          }}
        >
          {index + 1 + '. ' + value.owner + ' (' + value.rank + ' )'}
        </p>
      </ListItem>
    ));
    return (
      <List
        style={{
          width: '22%',
          float: 'right',
          display: 'inline',
          marginTop: '3%',
          border: '1px solid #373737',
          borderRadius: '5px'
        }}
        disablePadding
        subheader={
          <ListSubheader style={{ position: 'relative' }}>
            Runner Witness Rank
          </ListSubheader>
        }
      >
        {listItems}
      </List>
    );
  }
}
