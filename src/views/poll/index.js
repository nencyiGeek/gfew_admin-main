import React, { Component } from 'react';
import { connect } from "react-redux";
import DataTableCustom from "../tables/data-tables/DataTableCustom";
import { getPollData,deletePoll } from '../../redux/actions/poll/index';
class Poll extends Component {
  state = {
    polldata: []
  }

  componentDidMount() {
    this.props.getPollData();
  }

  componentWillReceiveProps(nextProps) {
    const { pollData } = nextProps.polldata;
    
    let polldata = [...pollData.agreementPolls.map(el =>
      ({ pollId: 2,pollName:'Agreement Poll', ...el })
    ),
    ...pollData.numberRangeVotePolls.map(el =>
      ({ pollId: 5,pollName:'Number Vote Poll', ...el })
      ),
    ...pollData.optionPolls.map(el =>
      ({ pollId: 1,pollName:'Question Poll', ...el })
      ),
    ...pollData.rankPolls.map(el =>
      ({ pollId: 4,pollName:'Ranking Poll', ...el })),
    ...pollData.ratingPolls.map(el=>
      ({ pollId: 3,pollName:'Rating Poll', ...el }))];
    this.setState({ polldata });
  }
  render() {
    return (
      <div>
        <DataTableCustom
          title={"Poll"}
          polldata={this.state.polldata}
          deletePoll={this.props.deletePoll}
          getPollData={this.props.getPollData}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    polldata: state.pollApp.poll
  }
}
export default connect(mapStateToProps, {
  getPollData,
  deletePoll
})(Poll)