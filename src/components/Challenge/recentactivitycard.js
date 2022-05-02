import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col,
  Button,
  CardImg,
} from "reactstrap";
import saladDefulaIMage from "../../assets/img/sadal-defaultImage.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faShare, faHeart } from "@fortawesome/free-solid-svg-icons";
import avatarImg from "../../assets/img/portrait/small/avatar-s-20.jpg";
import Avatar from "../@vuexy/avatar/AvatarComponent";
export default class componentName extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="border rounded">
        <Card>
          {/* <CardHeader> */}
          <CardImg
            top
            className="img-fluid"
            src={saladDefulaIMage}
            alt="card image cap"
          />

          {/* <img
              src={saladDefulaIMage}
              alt="loginImg"
              className="dishes-image-view"
            /> */}
          <CardTitle
            className="card-title-with-full-width"
            style={{ display: "flex", padding: "5px" }}
          >
            <Avatar img={avatarImg} />
            <label className="dish-name-title">
              Dawood Saddique created salad
            </label>{" "}
            <br />
          </CardTitle>
          {/* </CardHeader> */}
          <CardBody>
            <div className="d-flex justify-content-lg-between">
              <div>
                <label>Today !</label> <br />
                {/* <Row>
                    <Col lg="6" md="6" sm="6" xs="6"> */}
                <p className="dish-name-time">Oct 17 | 10:00 pm</p>
              </div>
              {/* <div className="dishes-like-comment-icon">
                <FontAwesomeIcon icon={faHeart} /> 7 &nbsp;
                <FontAwesomeIcon icon={faShare} className="comment-icon" /> 8
              </div> */}
            </div>
            {/* </Col>
                    <Col lg="6" md="6" sm="6" xs="6"> */}

            {/* </Col> */}
            {/* </Row> */}
          </CardBody>
        </Card>
      </div>
    );
  }
}
