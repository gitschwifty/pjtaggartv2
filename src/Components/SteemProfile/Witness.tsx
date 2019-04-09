import React from 'react';
import {
  ListItem,
  ListItemText,
  Collapse,
  Table,
  TableBody,
  TableRow,
  TableCell
} from '@material-ui/core';

export interface WitnessSetProps {
  account_creation_fee: string;
  account_subsidy_budget: number;
  account_subsidy_decay: number;
  maximum_block_size: number;
  sbd_interest_rate: number;
}

export interface WitnessProps {
  created: string;
  last_sbd_exchange_update: string;
  last_confirmed_block_num: number;
  last_aslot: number;
  props: WitnessSetProps;
  running_version: string;
  sbd_exchange_rate: {
    base: string;
    quote: string;
  };
  signing_key: string;
  total_missed: number;
  url: string;
  virtual_last_update: string;
  virtual_position: string;
  virtual_scheduled_time: string;
  votes: string;
  steemPerVest: number;
  head_block_number: number;
  current_aslot: number;
}

interface WitnessState {
  open: boolean;
}

export default class Witness extends React.PureComponent<
  WitnessProps,
  WitnessState
> {
  constructor(props: WitnessProps) {
    super(props);
    this.state = {
      open: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  private handleClick = () => {
    this.setState(state => ({
      open: !state.open
    }));
  };

  public render() {
    return (
      <React.Fragment>
        <ListItem divider button onClick={this.handleClick}>
          <ListItemText primary='Witness Information' />
        </ListItem>
        <Collapse in={this.state.open} timeout={500} unmountOnExit>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Created At
                </TableCell>
                <TableCell align='right'>
                  {new Date(this.props.created).toLocaleDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Current steemd Version
                </TableCell>
                <TableCell align='right'>
                  {this.props.running_version}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Total Missed Blocks
                </TableCell>
                <TableCell align='right'>{this.props.total_missed}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Witness URL
                </TableCell>
                <TableCell align='right'>{this.props.url}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Votes
                </TableCell>
                <TableCell align='right'>
                  {(Number(this.props.votes) / 1e12).toLocaleString(undefined, {
                    maximumFractionDigits: 3
                  })}{' '}
                  MVEST
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Votes (SP)
                </TableCell>
                <TableCell align='right'>
                  {(
                    (Number(this.props.votes) / 1e6) *
                    this.props.steemPerVest
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: 3
                  })}{' '}
                  SP
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Last Confirmed Block
                </TableCell>
                <TableCell align='right'>
                  {this.props.last_confirmed_block_num.toLocaleString(
                    undefined,
                    { maximumFractionDigits: 3 }
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Time Since Last Block
                </TableCell>
                <TableCell align='right'>
                  {(
                    (this.props.head_block_number -
                      this.props.last_confirmed_block_num) /
                    1200
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: 3
                  })}{' '}
                  hours
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Last Assigned Slot
                </TableCell>
                <TableCell align='right'>
                  {this.props.last_aslot.toLocaleString(undefined, {
                    maximumFractionDigits: 3
                  })}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Last SBD Exchange Update
                </TableCell>
                <TableCell align='right'>
                  {new Date(
                    this.props.last_sbd_exchange_update
                  ).toLocaleDateString()}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  SBD Base
                </TableCell>
                <TableCell align='right'>
                  {this.props.sbd_exchange_rate.base}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Steem Quote
                </TableCell>
                <TableCell align='right'>
                  {this.props.sbd_exchange_rate.quote}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Account Creation Fee
                </TableCell>
                <TableCell align='right'>
                  {this.props.props.account_creation_fee}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Account Subsidy Budget
                </TableCell>
                <TableCell align='right'>
                  {this.props.props.account_subsidy_budget}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Account Subsidy Decay
                </TableCell>
                <TableCell align='right'>
                  {this.props.props.account_subsidy_decay}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Maximum Block Size
                </TableCell>
                <TableCell align='right'>
                  {this.props.props.maximum_block_size}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  SBD Interest Rate
                </TableCell>
                <TableCell align='right'>
                  {this.props.props.sbd_interest_rate}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Virtual Last Update
                </TableCell>
                <TableCell align='right'>
                  {this.props.virtual_last_update}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Virtual Scheduled Time
                </TableCell>
                <TableCell align='right'>
                  {this.props.virtual_scheduled_time}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Virtual Position
                </TableCell>
                <TableCell align='right'>
                  {this.props.virtual_position}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Votes (Virtual Velocity)
                </TableCell>
                <TableCell align='right'>{this.props.votes}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Signing Key
                </TableCell>
                <TableCell align='right'>{this.props.signing_key}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Collapse>
      </React.Fragment>
    );
  }
}
