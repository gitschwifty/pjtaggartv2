import React from 'react';
import { Client, DynamicGlobalProperties, Asset } from 'dsteem';
import { WitnessSetProps } from '../SteemProfile/Witness';
import LoadingIcon from '../LoadingIcon';
import OrderedScheduleDisplay from './OrderedScheduleDisplay';
import CurrentRoundSchedule from './CurrentRoundSchedule';

interface WitnessScheduleState {
  active_witnesses: RankedWitness[];
  top_twenty: RankedWitness[];
  ordered_list: RankedWitness[];
  witness_schedule?: CurrentWitnessSchedule;
  dynamic_global_properties?: DynamicGlobalProperties;
  steemPerVest: number;
}

export interface ScheduledWitness {
  owner: string;
  created: string;
  total_missed: number;
  last_confirmed_block_num: number;
  last_aslot: number;
  running_version: string;
  signing_key: string;
  virtual_last_update: string;
  virtual_position: string;
  virtual_scheduled_time: string;
  votes: string;
}

export interface RankedWitness extends ScheduledWitness {
  rank: number;
}

interface AccountSubsidyRound {
  budget_per_time_unit: number;
  decay_params: {
    decay_per_time_unit: number;
    decay_per_time_unit_denom_shift: number;
  };
  max_pool_size: number;
  min_decay: number;
  pool_eq: number;
  resource_unit: number;
}

export interface CurrentWitnessSchedule {
  account_subsidy_rd: AccountSubsidyRound;
  account_subsidy_witness_rd: AccountSubsidyRound;
  current_shuffled_witnesses: string[];
  current_virtual_time: string;
  elected_weight: number;
  hardfork_required_witnesses: number;
  id: number;
  majority_version: string;
  max_miner_witnesses: number;
  max_runner_witnesses: number;
  max_voted_witnesses: number;
  median_props: WitnessSetProps;
  min_witness_account_subsidy_decay: number;
  miner_weight: number;
  next_shuffle_block_num: number;
  num_scheduled_witnesses: number;
  timeshare_weight: number;
  witness_pay_normalization_factor: number;
}

function compareWitnesses(a: ScheduledWitness, b: ScheduledWitness) {
  return Number(a.virtual_scheduled_time) - Number(b.virtual_scheduled_time);
}

export default class WitnessSchedule extends React.Component<
  any,
  WitnessScheduleState
> {
  private client: Client;
  private updateTimeout: NodeJS.Timeout | undefined;
  private updateCurrentRoundTime: NodeJS.Timeout | undefined;
  constructor(props: any) {
    super(props);
    this.state = {
      active_witnesses: [],
      top_twenty: [],
      ordered_list: [],
      steemPerVest: 500 / 1e6
    };

    this.client = new Client('https://api.steemit.com');
    this.updateData = this.updateData.bind(this);
  }

  public componentDidMount() {
    this.updateData();

    // this.updateCurrentRoundTime = setInterval(this.updateCurrentRound, 3000);
  }

  public componentWillUnmount() {
    if (this.updateTimeout !== undefined) {
      clearInterval(this.updateTimeout);
    }
  }

  private updateData() {
    this.client
      .call('condenser_api', 'get_dynamic_global_properties')
      .then(globalProps => {
        this.setState({
          dynamic_global_properties: globalProps,
          steemPerVest:
            Asset.from(globalProps.total_vesting_fund_steem).amount /
            Asset.from(globalProps.total_vesting_shares).amount
        });
        this.client
          .call('condenser_api', 'get_witness_schedule', [])
          .then(witnessSchedule => {
            this.setState({ witness_schedule: witnessSchedule });

            this.client
              .call('condenser_api', 'get_witnesses_by_vote', [undefined, 500])
              .then(witnesses => {
                const activeWitnesses = witnesses
                  .filter(
                    (witness: any) =>
                      witness.signing_key !==
                        'STM1111111111111111111111111111111114T1Anm' &&
                      (globalProps.head_block_number -
                        witness.last_confirmed_block_num <
                        300000 ||
                        witness.last_confirmed_block_num === 0)
                  )
                  .map((value: any, index: number) => ({
                    ...value,
                    rank: index
                  }));

                this.setState({
                  active_witnesses: activeWitnesses
                });

                setTimeout(
                  this.updateData,
                  (witnessSchedule.next_shuffle_block_num -
                    globalProps.head_block_number) *
                    3000
                );
                this.sortSchedule(activeWitnesses);
              })
              .catch(err => console.log(err));
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  private sortSchedule(activeWitnesses: RankedWitness[]) {
    const orderedList = activeWitnesses.slice(20).sort(compareWitnesses);
    this.setState({
      ordered_list: orderedList,
      top_twenty: activeWitnesses.slice(0, 20)
    });
  }

  public render() {
    if (
      !this.state.dynamic_global_properties ||
      !this.state.witness_schedule ||
      this.state.ordered_list.length === 0
    ) {
      return <LoadingIcon size={80} />;
    }

    return (
      <React.Fragment>
        <CurrentRoundSchedule
          current_round={this.state.witness_schedule.current_shuffled_witnesses}
          current_block={this.state.dynamic_global_properties.head_block_number}
          start_block={this.state.witness_schedule.next_shuffle_block_num - 21}
          next_block={this.state.witness_schedule.next_shuffle_block_num}
        />
        <OrderedScheduleDisplay ordered_list={this.state.ordered_list} />
      </React.Fragment>
    );
  }
}
