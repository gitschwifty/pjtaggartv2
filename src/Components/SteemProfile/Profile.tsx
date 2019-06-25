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
  loaded: string;
  witness?: any;
  properties?: DynamicGlobalProperties;
  steemPerVest: number;
  witnessLoaded: boolean;
}

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

export default class Profile extends React.Component<
  { user: string },
  ProfileState
> {
  private steemClient: Client;
  private dbAPI: DatabaseAPI;

  constructor(props: any) {
    super(props);

    this.state = {
      loading: true,
      loaded: 'none',
      steemPerVest: 0,
      witnessLoaded: false
    };

    this.steemClient = new Client('https://api.steemit.com');
    this.dbAPI = new DatabaseAPI(this.steemClient);
  }

  public componentDidMount() {
    this.loadAccount();
  }

  public shouldComponentUpdate(
    prevProps: { user: string },
    prevState: ProfileState
  ) {
    if (
      prevProps.user !== this.props.user ||
      prevState.loading !== this.state.loading ||
      this.state.witnessLoaded !== prevState.witnessLoaded
    ) {
      return true;
    }

    return false;
  }

  public componentDidUpdate() {
    if (this.state.loaded !== this.props.user) {
      this.setState({
        loading: true,
        witnessLoaded: false
      });
      this.loadAccount();
    }
  }

  private loadAccount() {
    this.dbAPI
      .getDynamicGlobalProperties()
      .then(properties => {
        this.setState({
          properties,
          steemPerVest:
            Asset.from(properties.total_vesting_fund_steem).amount /
            Asset.from(properties.total_vesting_shares).amount
        });

        this.dbAPI
          .getAccounts([this.props.user])
          .then(accs => {
            if (accs.length === 1) {
              if (accs[0].witness_votes.includes(this.props.user)) {
                this.steemClient
                  .call('condenser_api', 'get_witness_by_account', [
                    this.props.user
                  ])
                  .then(witness => {
                    if (witness) {
                      this.setState({
                        witness,
                        witnessLoaded: true,
                        acc: accs[0],
                        loading: false,
                        loaded: this.props.user
                      });
                    }
                  })
                  .catch(err => alert(err));
              } else {
                this.setState({
                  acc: accs[0],
                  loading: false,
                  loaded: this.props.user
                });
              }
            }
          })
          .catch(err => alert(err));
      })
      .catch(err => alert(err));
  }

  public render() {
    if (this.state.loading || !this.state.acc || !this.state.properties) {
      return <LoadingIcon size={80} />;
    }

    return (
      <React.Fragment>
        <Wallet
          {...this.state.acc as WalletProps}
          steemPerVest={this.state.steemPerVest}
        />
        {this.state.witnessLoaded ? (
          <Witness
            {...this.state.witness as WitnessProps}
            steemPerVest={this.state.steemPerVest}
            current_aslot={this.state.properties.current_aslot}
            head_block_number={this.state.properties.head_block_number}
          />
        ) : null}
      </React.Fragment>
    );
  }
}
