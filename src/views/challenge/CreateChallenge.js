import React, { Component } from "react";
import { ModalComponent } from "../../components/utils";
export default class CreateChallenge extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  // componentDidMount = () => {
  //   console.log(this.props);
  // };

  render() {
    return (
      <div>
        <ModalComponent
          dataChallenge={this.props.dataChallenge}
          toggle={this.props.toggle}
          modal={this.props.modal}
          isForEdit={this.props.isForEdit}
        />
      </div>
    );
  }
}
