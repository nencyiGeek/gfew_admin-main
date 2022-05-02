import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  TabContent,
  Collapse,
} from "reactstrap";
import classnames from "classnames";
import { Plus, Minus } from "react-feather";

class Rules extends Component {
  state = {
    activeTab: "1",
    collapseItems: [],
    status: "Closed",
  };

  toggleTab = (tab) => {
    if (this.state.activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  };

  toggleCollapse = (collapseID) => {
    let index = this.state.collapseItems.indexOf(collapseID);
    if (index >= 0) {
      let items = this.state.collapseItems;
      items.splice(index, index + 1);
      this.setState({ collapseItems: items });
    } else {
      let items = this.state.collapseItems;
      items.push(collapseID);
      this.setState({ collapseItems: items });
    }
  };

  onEntered = (id) => {
    if (this.state.collapseItems.includes(id))
      this.setState({ status: "Opened" });
  };
  onEntering = (id) => {
    if (this.state.collapseItems.includes(id))
      this.setState({ status: "Opening..." });
  };

  onExited = (id) => {
    if (this.state.collapseItems.includes(id))
      this.setState({ status: "Closed" });
  };

  onExiting = (id) => {
    if (this.state.collapseItems.includes(id))
      this.setState({ status: "Closing..." });
  };

  render() {
    // console.log("-this.state--", this.state);
    const { dataChallenge } = this.props;
    // console.log(dataChallenge);

    const renderCollapse =
      dataChallenge && dataChallenge?.faqs.length ? (
        dataChallenge?.faqs.map((collapseItem, index) => {
          if (collapseItem.que === "" || collapseItem.ans === "") {
            if (dataChallenge && dataChallenge.faqs.length === 1) {
              return (
                <div style={{ color: "lightgrey" }}>No FAQs available</div>
              );
            } else {
              return null;
            }
          } else {
            return (
              <Card
                key={index}
                onClick={() => this.toggleCollapse(index)}
                className={classnames({
                  "collapse-collapsed":
                    this.state.status === "Closed" &&
                    this.state.collapseItems.includes(index),
                  "collapse-shown":
                    this.state.status === "Opened" &&
                    this.state.collapseItems.includes(index),
                  closing:
                    this.state.status === "Closing..." &&
                    this.state.collapseItems.includes(index),
                  opening:
                    this.state.status === "Opening..." &&
                    this.state.collapseItems.includes(index),
                })}
              >
                <CardHeader>
                  <CardTitle className="lead collapse-title collapsed">
                    {collapseItem.que}
                  </CardTitle>

                  {this.state.collapseItems.includes(index) ? (
                    <Minus size={15} className="collapse-icon" />
                  ) : (
                    <Plus size={15} className="collapse-icon" />
                  )}
                </CardHeader>
                <Collapse
                  isOpen={this.state.collapseItems.includes(index)}
                  onEntering={() => this.onEntering(index)}
                  onEntered={() => this.onEntered(index)}
                  onExiting={() => this.onExiting(index)}
                  onExited={() => this.onExited(index)}
                >
                  <CardBody>{collapseItem.ans}</CardBody>
                </Collapse>
              </Card>
            );
          }
        })
      ) : (
        <div style={{ color: "lightgrey" }}>No FAQs available</div>
      );

    return (
      <div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="card-title-with-full-width">
                <b>How to play ?</b>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <p>
                {dataChallenge?.howtoplay ? (
                  dataChallenge?.howtoplay
                ) : (
                  <div style={{ color: "lightgrey" }}>
                    How to play is not available
                  </div>
                )}
              </p>
            </CardBody>
          </Card>
        </div>
        <div className="border-dashed-bottom"></div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="card-title-with-full-width">
                <b>Rules ?</b>
              </CardTitle>
            </CardHeader>
            <CardBody>
              {dataChallenge?.rules && dataChallenge?.rules.length ? (
                dataChallenge?.rules.map((data, index) => {
                  if (data.value.trim() === "") {
                    if (dataChallenge?.rules.length === 1) {
                      return (
                        <div style={{ color: "lightgrey" }}>
                          No rules for this challenge
                        </div>
                      );
                    } else {
                      return null;
                    }
                  } else {
                    return (
                      <Card className="mb-0">
                        <CardHeader>
                          {/* <CardTitle className="vx-collapse collapse-title">
                          {index + 1} . {data.value}
                        </CardTitle> */}
                          <CardTitle
                            className="lead collapse-title collapsed"
                            style={{
                              fontWeight: "400",
                              fontSize: "1.2rem",
                            }}
                          >
                            {index + 1} . {data.value}
                          </CardTitle>
                        </CardHeader>
                      </Card>
                    );
                  }
                })
              ) : (
                <div style={{ color: "lightgrey" }}>
                  No rules for this challenge
                </div>
              )}
              {/* <img src={ruleImage} alt="loginImg" className="rule-image-view" />
              <img src={ruleImage} alt="loginImg" className="rule-image-view" />
              <img src={ruleImage} alt="loginImg" className="rule-image-view" />
              <img src={ruleImage} alt="loginImg" className="rule-image-view" />
              <img src={ruleImage} alt="loginImg" className="rule-image-view" />
              <img src={ruleImage} alt="loginImg" className="rule-image-view" /> */}
            </CardBody>
          </Card>
        </div>
        <div className="border-dashed-bottom"></div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="card-title-with-full-width">
                <b>FAQ </b>
              </CardTitle>
            </CardHeader>
            <CardBody>
              <TabContent activeTab={this.state.activeTab}>
                <div className="vx-collapse collapse-bordered">
                  {renderCollapse}
                </div>
              </TabContent>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default Rules;
