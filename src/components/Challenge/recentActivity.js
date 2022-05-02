import React, { Component } from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Bell } from "react-feather";
import moment from "moment";
import "../../assets/scss/recentactivity.scss";

class RecentActivity extends Component {
  state = {
    recentactivitydata: null,
  };

  render() {
    const { recentactivitydata } = this.props;
    // console.log(recentactivitydata && recentactivitydata.length === 0);
    // () => {
    //   return (
    //     <>
    //       <p>No activity found!</p>
    //     </>
    //   );
    // }
    return (
      <div>
        {recentactivitydata && recentactivitydata.length === 0 ? (
          <>
            <p className="text-center" style={{fontSize: "1.5rem", color: "lightgray", fontWeight: "600"}}>No activity found!</p>
          </>
        ) : (
          <VerticalTimeline >
            {recentactivitydata &&
              recentactivitydata.map((data, index) => {
                // console.log(data);
                return (
                  <VerticalTimelineElement
                    className="vertical-timeline-element--work  "
                    contentStyle={{
                      color: "#fff",
                      boxShadow: "none",
                      background: "#f5f5f5",
                      // width: "30%"
                    }}
                    contentArrowStyle={{
                      borderRight: "7px solid  #f2c94c",
                    }}
                    // da moment().format('h:mm a')
                    date={`${moment(
                      data && data?.created_at && data?.created_at
                    ).calendar()}`}
                    iconStyle={{ background: "#f2c94c", color: "#fff" }}
                    icon={<Bell />}
                  >
                    <div className="d-flex mr-1 ">
                      {/* <Avatar img={avatarImg} className="bg-transparent" /> */}
                      <h3 className="vertical-timeline-element-title align-items-center d-flex">
                        created {data && data?.todo}
                      </h3>
                    </div>
                    {/* <h6 className="vertical-timeline-element-subtitle text-secondary mt-1">{data.time}</h6> */}
                    {data && data?.image && (
                      <>
                        <img
                          src={data && data?.image}
                          alt="loginImg"
                          // style={{ objectFit: "contain" }}
                          className="dishes-image-view mt-2"
                        />
                      </>
                    )}
                  </VerticalTimelineElement>
                );
              })}
          </VerticalTimeline>
        )}
      </div>
    );
  }
}

export default RecentActivity;
