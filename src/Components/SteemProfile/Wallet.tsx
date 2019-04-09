import React from 'react';
import { Asset } from 'dsteem';
import {
  ListItem,
  ListItemText,
  Collapse,
  List,
  Table,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';

interface WalletState {
  open: boolean;
}

interface WalletProps {
  balance: string | Asset;
  received_vesting_shares: string | Asset;
  reward_sbd_balance: string | Asset;
  reward_vesting_balance: string | Asset;
  sbd_balance: string | Asset;
  vesting_shares: string | Asset;
  delegated_vesting_shares: string | Asset;
  steemPerVest: number;
}

export default class Wallet extends React.PureComponent<
  WalletProps,
  WalletState
> {
  constructor(props: WalletProps) {
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
        <ListItem
          divider
          button
          onClick={this.handleClick}
          style={{ marginTop: '3%' }}
        >
          <ListItemText primary='Wallet Information' />
        </ListItem>
        <Collapse in={this.state.open} timeout={500} unmountOnExit>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Steem Per MVest
                </TableCell>
                <TableCell align='right'>
                  {(this.props.steemPerVest * 1e6).toLocaleString(undefined, {
                    maximumFractionDigits: 3
                  })}{' '}
                  STEEM
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Vesting Shares
                </TableCell>
                <TableCell align='right'>
                  {Asset.from(this.props.vesting_shares).amount.toLocaleString(
                    undefined,
                    {
                      maximumFractionDigits: 3
                    }
                  )}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Steem Power
                </TableCell>
                <TableCell align='right'>
                  {(
                    Asset.from(this.props.vesting_shares).amount *
                    this.props.steemPerVest
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: 3
                  })}{' '}
                  SP
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Steem Balance
                </TableCell>
                <TableCell align='right'>{this.props.balance}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  SBD Balance
                </TableCell>
                <TableCell align='right'>{this.props.sbd_balance}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Vesting Shares Received
                </TableCell>
                <TableCell align='right'>
                  +
                  {Asset.from(
                    this.props.received_vesting_shares
                  ).amount.toLocaleString(undefined, {
                    maximumFractionDigits: 3
                  })}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Steem Power Received
                </TableCell>
                <TableCell align='right'>
                  +
                  {(
                    Asset.from(this.props.received_vesting_shares).amount *
                    this.props.steemPerVest
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: 3
                  })}{' '}
                  SP
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Vesting Shares Delegated
                </TableCell>
                <TableCell align='right'>
                  -
                  {Asset.from(
                    this.props.delegated_vesting_shares
                  ).amount.toLocaleString(undefined, {
                    maximumFractionDigits: 3
                  })}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Steem Power Delegated
                </TableCell>
                <TableCell align='right'>
                  -
                  {(
                    Asset.from(this.props.delegated_vesting_shares).amount *
                    this.props.steemPerVest
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: 3
                  })}{' '}
                  SP
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Unclaimed Vesting Rewards
                </TableCell>
                <TableCell align='right'>
                  {Asset.from(
                    this.props.reward_vesting_balance
                  ).amount.toLocaleString(undefined, {
                    maximumFractionDigits: 3
                  })}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Unclaimed SP Rewards
                </TableCell>
                <TableCell align='right'>
                  {(
                    Asset.from(this.props.reward_vesting_balance).amount *
                    this.props.steemPerVest
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: 3
                  })}{' '}
                  SP
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component='th' scope='row'>
                  Unclaimed SBD Rewards
                </TableCell>
                <TableCell align='right'>
                  {this.props.reward_sbd_balance}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Collapse>
      </React.Fragment>
    );
  }
}
