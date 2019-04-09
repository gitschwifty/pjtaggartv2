import React from 'react';
import { ScheduledWitness } from '../WitnessSchedule/WitnessSchedule';
import {
  List,
  ListSubheader,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';
import WitnessCollapse from './WitnessCollapse';
import { Client, Asset } from 'dsteem';
import LoadingIcon from '../LoadingIcon';

interface WitnessTableState {
  witnesses: ScheduledWitness[];
  steemPerVest: number;
  head_block_number: number;
}

export default class WitnessRanking extends React.PureComponent<
  any,
  WitnessTableState
> {
  private client: Client;
  constructor(props: any) {
    super(props);

    this.state = {
      witnesses: [],
      steemPerVest: 500 / 1e6,
      head_block_number: 3800000
    };

    this.client = new Client('https://api.steemit.com');
  }

  public componentDidMount() {
    this.client
      .call('condenser_api', 'get_dynamic_global_properties')
      .then(globalProps => {
        this.setState({
          steemPerVest:
            Asset.from(globalProps.total_vesting_fund_steem).amount /
            Asset.from(globalProps.total_vesting_shares).amount,
          head_block_number: globalProps.head_block_number
        });

        this.client
          .call('condenser_api', 'get_witnesses_by_vote', [undefined, 500])
          .then(witnesses => {
            const activeWitnesses = witnesses.filter(
              (witness: any) =>
                witness.signing_key !==
                  'STM1111111111111111111111111111111114T1Anm' &&
                (globalProps.head_block_number -
                  witness.last_confirmed_block_num <
                  500000 ||
                  witness.last_confirmed_block_num === 0)
            );

            this.setState({
              witnesses: activeWitnesses
            });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  public render() {
    if (this.state.witnesses.length === 0) {
      return <LoadingIcon size={80} />;
    }

    const witnesses = this.state.witnesses.map((witness, index) => (
      <WitnessCollapse
        witness={witness}
        index={index}
        steemPerVest={this.state.steemPerVest}
        head_block={this.state.head_block_number}
        key={index}
      />
    ));

    return (
      <React.Fragment>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell component='th' scope='table'>
                Witness Rank and Name
              </TableCell>
              <TableCell component='th' scope='table'>
                Witness Votes
              </TableCell>
              <TableCell component='th' scope='table'>
                Time Since Last Block
              </TableCell>
              <TableCell component='th' scope='table'>
                Total Blocks Missed
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{witnesses}</TableBody>
        </Table>
      </React.Fragment>
    );
  }
}
