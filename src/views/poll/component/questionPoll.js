import React from "react"
import {
    Col,
    Input,
    Row, FormGroup,
    Button
} from "reactstrap"
import { connect } from "react-redux"
import { Minus, Plus } from "react-feather"

class QuestionPollOption extends React.Component {
    render() {
        const { id,rowData } = this.props;
        return (
            <Row>
                <Col  md="4" sm="12">
                    <FormGroup>
                        <Input type="text"
                            value={this.props.optionName}
                            onChange={(e) => this.props.OptionChangeHandler(e)}
                            name={`option_name_${rowData.key}`}
                            placeholder="option name" />
                    </FormGroup>
                </Col>
                <Col  md="4" sm="12">
                    <FormGroup>
                        <Input type="file"
                            name={`option_image_${rowData.key}`}
                            onChange={(e) => this.props.OptionFileChangeHandler(e)}
                            placeholder="image" />
                    </FormGroup>
                </Col>
                <Col  md="1" sm="12">
                    <FormGroup>
                        <Button.Ripple
                            className="btn-icon"
                            outline
                            color="primary"
                            onClick={(e) => this.props.optionAddMoreClick(e)}
                        >
                            <Plus size={16} />
                        </Button.Ripple>
                    </FormGroup>

                </Col>

                <Col md="1" sm="12">
                    <FormGroup>
                        <Button.Ripple
                            className="btn-icon"
                            outline
                            onClick={(e) => this.props.removeOption(e, id)}
                            color="primary" >
                            <Minus size={16} />
                        </Button.Ripple>
                    </FormGroup>
                </Col>
            </Row>

        )
    }
}

const mapStateToProps = state => {
    return {
    }
}
export default connect(mapStateToProps, {
})(QuestionPollOption)