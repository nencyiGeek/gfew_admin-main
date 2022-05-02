import React from "react"
import { Row, Col } from "reactstrap"
import ActivityTimeline from "./ActivityTimeline"
import "../../../assets/scss/pages/dashboard-analytics.scss"


class AnalyticsDashboard extends React.Component {
  
  render() {
    return (
      <React.Fragment>
        <Row className="match-height">
          <Col lg="12">
            <ActivityTimeline />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default AnalyticsDashboard
