import React, { Component } from "react";
import { Card, CardTitle, CardText } from "reactstrap";

import "../../assets/scss/components/TopCardDetail.scss";

export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { colorValue, borderColorValue, Title, discText } = this.props;
    return (
      <>
        <Card
          body
          inverse
          style={{
            backgroundColor: colorValue,
            borderColor: borderColorValue,
            height: "80%",
          }}
        >
          <CardTitle className="card_title_number" tag="h1">
            {Title}
          </CardTitle>
          <CardText className="card_disc_text">{discText}</CardText>
        </Card>
      </>
    );
  }
}