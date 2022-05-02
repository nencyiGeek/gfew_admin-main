import React from "react"
import {
    Col, 
    Input,
    Row, FormGroup,
    Button
} from "reactstrap"
import { connect } from "react-redux";
import { Minus, Plus } from "react-feather";

class NumberPollOption extends React.Component {
    render() {
        const { id, rowData } = this.props;
        return (
            <Row>
                <Col md="3" sm="12">
                    <FormGroup>
                        <Input
                            value={this.props.optionName}
                            type="text" name={`option_name_${rowData.key}`}
                            onChange={(e) => this.props.OptionChangeHandler(e)}
                            placeholder="option name" />
                    </FormGroup>
                </Col>
                <Col md="3" sm="12">
                    <FormGroup>
                        <Input
                            value={this.props.min}
                            type="number" name={`min_${rowData.key}`}
                            onChange={(e) => this.props.OptionChangeHandler(e)}
                            placeholder="min" />
                    </FormGroup>
                </Col>
                <Col md="3" sm="12">
                    <FormGroup>
                        <Input
                            value={this.props.max}
                            type="number" name={`max_${rowData.key}`}
                            onChange={(e) => this.props.OptionChangeHandler(e)}
                            placeholder="max" />
                    </FormGroup>
                </Col>
                <Col md="1" sm="12">
                    <FormGroup>
                        <Button.Ripple
                            className="btn-icon"
                            outline
                            color="primary"
                            onClick={(e) => this.props.optionAddMoreClick(e)}>
                            <Plus size={16} />
                        </Button.Ripple>
                    </FormGroup>

                </Col>
                <Col md="1" sm="12">
                    <FormGroup>
                        <Button.Ripple
                            className="btn-icon"
                            outline
                            color="primary"
                            onClick={(e) => this.props.removeOption(e, id)} >
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
})(NumberPollOption)