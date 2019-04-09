import React, { ReactChildren } from 'react';
import { ScheduledWitness } from '../WitnessSchedule/WitnessSchedule';
import {
  ListItem,
  Collapse,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead
} from '@material-ui/core';
import { CollapseProps } from '@material-ui/core/Collapse';

const collapseComponent = (props: CollapseProps) => (
  <td colSpan={4}>
    <div className={props.className} style={{ margin: 'auto', width: '80%' }}>
      {props.children}
    </div>
  </td>
);

export default class WitnessCollapse extends React.PureComponent<
  {
    witness: ScheduledWitness;
    steemPerVest: number;
    index: number;
    head_block: number;
  },
  { open: boolean }
> {
  constructor(props: {
    witness: ScheduledWitness;
    steemPerVest: number;
    index: number;
    head_block: number;
  }) {
    super(props);

    this.state = {
      open: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  private handleClick() {
    this.setState({
      open: !this.state.open
    });
  }

  public render() {
    return (
      <React.Fragment>
        <TableRow onClick={this.handleClick}>
          <TableCell>
            {this.props.index + 1 + '. ' + this.props.witness.owner}
          </TableCell>
          <TableCell align='justify'>
            {(
              ((Number(this.props.witness.votes) / 1e6) *
                this.props.steemPerVest) /
              1e6
            ).toFixed(3)}{' '}
            M SP
          </TableCell>
          <TableCell align='center'>
            {this.props.witness.last_confirmed_block_num > 0
              ? (
                  (this.props.head_block -
                    this.props.witness.last_confirmed_block_num) /
                  1200
                ).toFixed(3) + ' hours'
              : 'Never'}
          </TableCell>
          <TableCell align='center'>
            {this.props.witness.total_missed}
          </TableCell>
        </TableRow>

        <Collapse
          in={this.state.open}
          timeout={500}
          unmountOnExit
          component={collapseComponent}
        >
          <TableRow>
            <TableCell>Created At</TableCell>
            <TableCell align='right'>
              {new Date(this.props.witness.created).toLocaleDateString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component='th' scope='row'>
              Current steemd Version
            </TableCell>

            <TableCell align='right'>
              {this.props.witness.running_version}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component='th' scope='row'>
              Total Missed Blocks
            </TableCell>
            <TableCell align='right'>
              {this.props.witness.total_missed.toLocaleString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component='th' scope='row'>
              Votes
            </TableCell>
            <TableCell align='right'>
              {(Number(this.props.witness.votes) / 1e12).toLocaleString(
                undefined,
                { maximumFractionDigits: 3 }
              )}{' '}
              MVEST
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component='th' scope='row'>
              Votes (SP)
            </TableCell>
            <TableCell align='right'>
              {(
                (Number(this.props.witness.votes) / 1e6) *
                this.props.steemPerVest
              ).toLocaleString(undefined, { maximumFractionDigits: 3 })}{' '}
              SP
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component='th' scope='row'>
              Last Confirmed Block
            </TableCell>
            <TableCell align='right'>
              {this.props.witness.last_confirmed_block_num.toLocaleString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component='th' scope='row'>
              Last ASlot
            </TableCell>
            <TableCell align='right'>
              {this.props.witness.last_aslot.toLocaleString()}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Signing Key</TableCell>
            <TableCell align='right'>
              {this.props.witness.signing_key}
            </TableCell>
          </TableRow>
        </Collapse>
      </React.Fragment>
    );
  }
}

//  <TableCell colSpan={4} style={{ border: 'none' }}>
