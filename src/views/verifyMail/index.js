import React, { Component } from 'react';
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Row,
    Col,
    Button,
} from "reactstrap"
import fgImg from '../../assets/img/logo/getFitEatWell.jpg';
import { history } from "../../history"
import "../../assets/scss/pages/authentication.scss"
import { Alert } from "reactstrap";
import { emailVerification } from '../../action/auth';

class VerifyMail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            error: "",
            status: false,
            verificationStatus: 1
        }
    }

    componentDidMount = async () => {
        if (this.props?.match?.params?.token) {
            const res = await emailVerification(this.props.match.params.token);
            if (res && res.status === true) {
                this.setState({
                    verificationStatus: 3
                })
            } else {
                this.setState({
                    verificationStatus: 2
                })
            }
        }
    }

    render() {
        // const { email, error } = this.state;
        return (
            <Row className="m-0 justify-content-center">
                <Col
                    sm="8"
                    xl="7"
                    lg="10"
                    md="8"
                    className="d-flex justify-content-center"
                >
                    <Card className="bg-authentication rounded-0 mb-0 w-100">
                        <Row className="m-0">
                            <Col
                                lg="6"
                                className="d-lg-block d-none text-center align-self-center"
                            >
                                <img src={fgImg} alt="fgImg" />
                            </Col>
                            <Col lg="6" md="12" className="p-0">
                                <Card className="rounded-0 mb-0 px-2 py-1">
                                    <CardHeader className="pb-1">
                                        <CardTitle>
                                            <h4 className="mb-0">Verifying mail</h4>
                                        </CardTitle>
                                    </CardHeader>
                                    <CardBody className="pt-1 pb-0">
                                        {this.state.verificationStatus === 1 && <Alert color="info">Loading...</Alert>}
                                        {this.state.verificationStatus === 2 && <Alert color="warning">Mail not verified. Something went wrong !</Alert>}
                                        {this.state.verificationStatus === 3 && <Alert color="success">Your mail has verified. Try login !</Alert>}

                                        <div className="float-md-left d-block mb-1">
                                            <Button.Ripple
                                                color="primary"
                                                outline
                                                className="px-75 btn-block"
                                                onClick={() => history.push("/login")}
                                            >
                                                Back to Login
                            </Button.Ripple>
                                        </div>

                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        )
    }
}
export default VerifyMail;