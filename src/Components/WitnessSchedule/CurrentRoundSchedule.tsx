import React from "react";
import { Card, CardContent } from "@material-ui/core";
import { Sticky, StickyContainer } from "react-sticky";

interface CurrentRoundScheduleState {
  current_block_increment: number;
}

interface CurrentRoundScheduleProps {
  current_round: string[];
  start_block: number;
  current_block: number;
  next_block: number;
}

const CurrentRoundCards = (
  currentRound: string[],
  distanceFromTop: number,
  startBlock: number,
  currentIncrement: number
) => {
  return currentRound.map((value, index) => (
    <Card
      key={index}
      style={{
        minWidth: "80px",
        maxHeight: "7.5%",
        width: distanceFromTop ? (distanceFromTop > 0 ? "19%" : "19%") : "19%",
        display: "inline-block",
        fontSize: "10px",
        textAlign: "center",
        float: "left",
        marginRight: "1%",
        marginBottom: "1%",
        overflowX: "clip",
        backgroundColor: currentIncrement >= index + 1 ? "#373737" : "inherit",
        color: currentIncrement >= index + 1 ? "#c4c4c4" : "inherit"
      }}
    >
      <CardContent>
        <p>{index + 1}</p>
        <p style={{ paddingLeft: 0, paddingRight: 0 }}>{value}</p>
        <p>{startBlock + 1 + index}</p>
      </CardContent>
    </Card>
  ));
};

export default class CurrentRoundSchedule extends React.PureComponent<
  CurrentRoundScheduleProps,
  CurrentRoundScheduleState
> {
  private blockTimer: NodeJS.Timeout | undefined;
  constructor(props: CurrentRoundScheduleProps) {
    super(props);
    this.state = {
      current_block_increment: props.current_block - props.start_block
    };

    this.updateCurrentRound = this.updateCurrentRound.bind(this);
  }

  public componentDidMount() {
    this.blockTimer = setInterval(this.updateCurrentRound, 3000);
  }

  public componentWillUnmount() {
    if (this.blockTimer) {
      clearInterval(this.blockTimer);
    }
  }

  public componentDidUpdate(prevProps: CurrentRoundScheduleProps) {
    if (
      this.props.current_block !== prevProps.current_block ||
      this.props.start_block !== prevProps.start_block
    ) {
      this.setState({
        current_block_increment:
          this.props.current_block - this.props.start_block
      });
    }
  }

  private updateCurrentRound() {
    this.setState({
      current_block_increment: this.state.current_block_increment + 1
    });
  }

  public render() {
    return (
      <StickyContainer style={{ width: "77.5%", display: "inline-block" }}>
        <Sticky>
          {(props: { distanceFromTop: number }) => {
            if (!props.distanceFromTop || props.distanceFromTop > 0) {
              return (
                <div
                  style={{
                    marginTop: "3.5%",
                    position: "relative",
                    textAlign: "center"
                  }}
                >
                  <h4 style={{ margin: "0" }}>
                    Current Block Number:{" "}
                    {this.props.start_block +
                      this.state.current_block_increment}
                  </h4>
                  <h5 style={{ marginTop: "5px", marginBottom: "5px" }}>
                    Next Witness Rotation: {this.props.next_block}
                  </h5>
                  {CurrentRoundCards(
                    this.props.current_round,
                    props.distanceFromTop,
                    this.props.start_block,
                    this.state.current_block_increment
                  )}
                </div>
              );
            } else {
              return (
                <div
                  style={{
                    width: "49%",
                    display: "inline-block",
                    top: "10px",
                    position: "fixed",
                    textAlign: "center"
                  }}
                >
                  <h4 style={{ margin: "0" }}>
                    Current Block Number:{" "}
                    {this.props.start_block +
                      this.state.current_block_increment}
                  </h4>
                  <h5 style={{ marginTop: "5px", marginBottom: "5px" }}>
                    Next Witness Rotation: {this.props.next_block}
                  </h5>
                  {CurrentRoundCards(
                    this.props.current_round,
                    props.distanceFromTop,
                    this.props.start_block,
                    this.state.current_block_increment
                  )}
                </div>
              );
            }
          }}
        </Sticky>
      </StickyContainer>
    );
  }
}
