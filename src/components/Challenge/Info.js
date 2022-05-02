import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle
} from "reactstrap";
import moment from "moment";
import * as Icon from "react-feather";

class Info extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataForInfo: null,
    };
  }

  // componentDidUpdate = (prevProps) => {
  //   if (prevProps.dataForInfo !== this.props.dataChallenge) {
  //     // console.log(this.props.dataChallenge);
  //   }
  // };

  render() {
    const { dataChallenge } = this.props;
    // console.log(dataChallenge);
    return (
      <div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="card-title-with-full-width">
                <b>Timing</b>
              </CardTitle>
            </CardHeader>
            <CardBody>
              {/* <label className="date-label">
                Friday ,April 30 to Friday ,May 30
              </label> */}
              <p className="time-label">
                From:{" "}
                {dataChallenge?.schedulechallenge
                  ? moment(dataChallenge?.schedulechallenge?.from).format(
                      "LLLL"
                    )
                  : ""}
              </p>
              <p className="time-label">
                To:{" "}
                {dataChallenge?.schedulechallenge
                  ? moment(dataChallenge?.schedulechallenge?.to).format("LLLL")
                  : ""}
              </p>
              <label>Times are displayed in your local time zone.</label>
            </CardBody>
          </Card>
        </div>
        <div className="border-dashed-bottom"></div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="card-title-with-full-width">
                <b>
                  Online Event{" "}
                  <Icon.Video size={20} className="fonticon-wrap" />
                </b>
                {/* <Button color="warning" className="online-event-join-button">
                  Join
                </Button> */}
              </CardTitle>
            </CardHeader>
            <CardBody>
              <a
                // href="https://support.zoom.us/hc/en-us/articles/115002262083-Joining-a-test-meeting?mobile_site=true"
                href={dataChallenge?.meetlink ? dataChallenge?.meetlink : "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dataChallenge?.meetlink}
                {/* https://support.zoom.us/hc/en-us/articles/115002262083-Joining-a-test-meeting?mobile_site=true */}
              </a>
            </CardBody>
          </Card>
        </div>
        {/* <div className="border-dashed-bottom"></div>
        <div>
          <Card className="position-relative" style={{ height: "200px" }}>
            <div
              className="position-absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src={inviteFriendsIMage}
                alt="loginImg"
                className="invite-friend-image "
              />
            </div>
            <CardBody>
              <Row>
                <Col lg="10" md="10" sm="10" xs="10">
                  <h4>
                    <b>Invite Friends</b>
                  </h4>{" "}
                  <br />
                </Col>
                <Col lg="2" md="2" sm="2" xs="2">
                  <div className="d-flex justify-content-end">
                    <Button
                      color="primary"
                      style={{ marginTop: "10px", height: "40px" }}
                    >
                      Invite
                    </Button>
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div> */}
        {/* <div className="border-dashed-bottom"></div> */}
        {/* <div className="">
          <Card>
            <CardHeader>
              <CardTitle
                className="card-title-with-full-width"
                style={{ marginBottom: "10px" }}
              >
                <b>
                  Share <Icon.Share2 size={20} className="fonticon-wrap" />
                </b>
                <Button color="primary" className="online-event-join-button">
                  Share
                </Button>
              </CardTitle>
            </CardHeader>
          </Card>
        </div> */}
      </div>
    );
  }
}

export default Info;
