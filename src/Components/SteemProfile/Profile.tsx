import React from 'react';
import {
  ExtendedAccount,
  Client,
  DatabaseAPI,
  Asset,
  DynamicGlobalProperties
} from 'dsteem';
import LoadingIcon from '../LoadingIcon';
import Wallet from './Wallet';
import Witness, { WitnessProps } from './Witness';

interface ProfileState {
  acc?: ExtendedAccount;
  loading: boolean;
  witness?: any;
  witness_schedule?: any;
  properties?: DynamicGlobalProperties;
  steemPerVest: number;
}

// create my own types for all dsteem returns
// set it up to go to hivemind instead eventually?
// rewrite/redo dsteem
// abstract away all the whatever

interface WalletProps {
  balance: string | Asset;
  posting_rewards: number | string;
  received_vesting_shares: string | Asset;
  reward_sbd_balance: string | Asset;
  reward_steem_balance: string | Asset;
  reward_vesting_balance: string | Asset;
  reward_vesting_steem: string | Asset;
  sbd_balance: string | Asset;
  vesting_balance: string | Asset;
  vesting_shares: string | Asset;
  delegated_vesting_shares: string | Asset;
}

export default class Profile extends React.Component<any, ProfileState> {
  private steemClient: Client;
  private dbAPI: DatabaseAPI;

  constructor(props: any) {
    super(props);

    this.state = {
      loading: true,
      steemPerVest: 0
    };

    this.steemClient = new Client('https://api.steemit.com');
    this.dbAPI = new DatabaseAPI(this.steemClient);
  }

  public componentDidMount() {
    this.dbAPI
      .getDynamicGlobalProperties()
      .then(properties => {
        console.log(properties);
        this.setState({
          properties,
          steemPerVest:
            Asset.from(properties.total_vesting_fund_steem).amount /
            Asset.from(properties.total_vesting_shares).amount
        });
      })
      .catch(err => alert(err));
    this.dbAPI
      .getAccounts(['petertag'])
      .then(accs => {
        if (accs.length === 1) {
          console.log(accs[0]);
          this.setState({
            acc: accs[0],
            loading: false
          });
        }
      })
      .catch(err => alert(err));
    this.steemClient
      .call('condenser_api', 'get_witness_by_account', ['petertag'])
      .then(witness => {
        if (witness) {
          console.log(witness);
          this.setState({ witness });
        }
      })
      .catch(err => alert(err));
    this.steemClient
      .call('condenser_api', 'get_witness_schedule', [])
      .then(witnessSchedule => {
        if (witnessSchedule) {
          console.log(witnessSchedule);
          this.setState(witnessSchedule);
        }
      })
      .catch(err => alert(err));
  }

  public render() {
    if (
      this.state.loading ||
      !this.state.acc ||
      !this.state.witness ||
      !this.state.properties
    ) {
      return <LoadingIcon size={80} />;
    }

    return (
      <React.Fragment>
        <Wallet
          {...this.state.acc as WalletProps}
          steemPerVest={this.state.steemPerVest}
        />
        <Witness
          {...this.state.witness as WitnessProps}
          steemPerVest={this.state.steemPerVest}
          current_aslot={this.state.properties.current_aslot}
          head_block_number={this.state.properties.head_block_number}
        />
      </React.Fragment>
    );
  }
}

/** </Table>balance: string | Asset;
  posting_rewards: number | string;
  received_vesting_shares: string | Asset;
  reward_sbd_balance: string | Asset;
  reward_steem_balance: string | Asset;
  reward_vesting_balance: string | Asset;
  reward_vesting_steem: string | Asset;
  sbd_balance: string | Asset;
  vesting_balance: string | Asset;
  vesting_shares: string | Asset;
  delegated_vesting_shares: string | Asset; */
