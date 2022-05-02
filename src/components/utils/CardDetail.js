import React, { Component } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardImg,
  Button,
  UncontrolledTooltip,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import * as Icon from "react-feather";
import img1 from "../../assets/img/pages/content-img-1.jpg";
import {
  // faCoffee,
  faTrophy,
} from "@fortawesome/free-solid-svg-icons";
import "../../assets/scss/components/CardDetail.scss";
import moment from "moment";
import { history } from "../../history";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

export default class componentName extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      title,
      Button_Name,
      RangeTime,
      dateValue,
      Price,
      tagValue,
      img,
      data,
      index,
    } = this.props;
    // console.log(data._id);
    return (
      <>
        <Card className="card_h_100" key={index}>
          <CardImg
            top
            className="img-fluid"
            src={img && img.includes("amazonaws.com") ? img : img1}
            alt="card image cap"
          // style={{objectFit: "contain", }}
          />
          <CardBody>
            <h5 className="title_card_challenge" id={`Title${index}`}>
              {title}
            </h5>
            {title ? (
              <UncontrolledTooltip placement="bottom" target={`Title${index}`}>
                {title}
              </UncontrolledTooltip>
            ) : null}

            <div className="mt-1">
              <div className="text_9b9bb5_color_challenge date_div_challenge">
                From: {moment(RangeTime).format("llll")}
              </div>
              <div className="text_9b9bb5_color_challenge date_div_challenge">
                To: {moment(dateValue).format("llll")}
              </div>
            </div>
            <div className="my-1">
              <FontAwesomeIcon icon={faTrophy} />{" "}
              <span className="text_9b9bb5_color_challenge">${Price}</span>
            </div>
            <div
              className="mb-1"
              style={{ borderBottom: "2px dashed lightgray" }}
            />
            <div className="d-flex justify-content-center">

           
            <div style={{ width:`95%`}}>
              {/* <div> */}
              <Slider
                dots={false}
                slidesToShow={1}
                slidesToScroll={2}
                infinite={false}
                variableWidth={true}
                className={"slider variable-width"}
              >
                {tagValue &&
                  tagValue.map((data, indexForBadge) => {
                    return (
                      <div>
                        <Badge
                          key={indexForBadge}
                          className="badge_class"
                          style={{ backgroundColor: data.color }}
                          pill
                        >
                          {data.label}
                        </Badge>
                      </div>
                    );
                  })}
              </Slider>
            </div>
            </div>
            {/* <Badge className="badge_class" color="primary" pill>
                PrimaryPrimary
              </Badge>
              <Badge className="badge_class" color="primary" pill>
                Primary
              </Badge>  */}
            {/* </div> */}
            <div className="card-btns d-flex justify-content-between mt-2">
              <Button
                className="button_color w-100 text-white"
                onClick={() => {
                  history.push(`/challenge?id=${data._id}`);
                }}
              // style={{ backgroundColor: "F2C94C" }}
              >
                {Button_Name}
              </Button>
            </div>
          </CardBody>
        </Card>
      </>
    );
  }
}
