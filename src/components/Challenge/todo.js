import React, { Component } from "react";
import { Card, CardBody, Row, Col, CardFooter } from "reactstrap";

class ToDO extends Component {
  render() {
    const { dataChallenge } = this.props;
    // console.log(dataChallenge);
    return (
      <div>
        <Row>
          {/* {dataChallenge && !dataChallenge?.todos && (
            <> */}
          {/* {dataChallenge &&
            dataChallenge?.todos &&
            !dataChallenge?.todos.length && (
              
            )} */}

          {/* </> */}
          {/* )} */}
          {dataChallenge && dataChallenge?.todos ? (
            dataChallenge?.todos.map((data, index) => {
              if (data.todo === "" || data.todo === null) {
                return null;
              } else {
                return (
                  <Col className="mb-2" lg="2" md="4" sm="6" xs="6">
                    <div
                      className="rounded h-100 w-100"
                      style={{ border: "1px solid lightgray" }}
                    >
                      <Card className="mb-0">
                        {/* <img
                          src={groceryImg1}
                          alt="loginImg"
                          className="todo-image-view"
                        /> */}
                        <CardBody style={{ background: "#f2c94c33" }}>
                          <div className="text-center">{data?.todo}</div>
                        </CardBody>
                        {/* <div className="todo-check-image-view-brown">
                            <CheckCircle
                              size={25}
                              className="collapse-icon todo-icon-checked-brown"
                            />
                          </div> */}
                        {/* {[1, 3, 6].includes(data) ? (
                          <div className="todo-check-image-view-brown">
                            <CheckCircle
                              size={25}
                              className="collapse-icon todo-icon-checked-brown"
                            />
                          </div>
                        ) : (
                          <div className="todo-check-image-view">
                            <CheckCircle
                              size={25}
                              className="collapse-icon todo-icon-checked"
                            />
                          </div>
                        )} */}
                        {/* <img src={groceryImg1} alt="loginImg"  /> */}
                        <CardFooter
                          style={{
                            padding: "10px",
                            backgroundColor: "#ffffff",
                          }}
                        >
                          {data?.points ? data?.points : 0} points
                        </CardFooter>
                      </Card>
                    </div>
                  </Col>
                );
              }
            })
          ) : (
            <p
              className="text-center w-100"
              style={{
                fontSize: "1.5rem",
                color: "lightgray",
                fontWeight: "600",
              }}
            >
              No ToDo's available
            </p>
          )}
        </Row>
      </div>
    );
  }
}

export default ToDO;
