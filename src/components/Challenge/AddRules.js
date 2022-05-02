import React, { Component } from "react";
import { X } from "react-feather";
import { Button, Input } from "reactstrap";
export default class AddRules extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { rules, handleChange, handleRemove } = this.props;
    // console.log("=>in",rules)
    return (
      <>
        {rules && rules.length
          ? rules.map((field, idx) => {
              return (
                <div
                  key={`${field}-${idx}`}
                  className="d-flex mt-1 align-items-center"
                >
                  <Input
                    type="text"
                    placeholder="Enter new rule"
                    className="w-75"
                    value={field.value}
                    onChange={(e) => handleChange(idx, e)}
                  />
                  {/* <Button
                          type="button"
                          onClick={() => this.handleRemove(idx)}
                        >
                          X
                        </Button> */}
                  <div className="d-inline-block mr-1 ml-2">
                    {" "}
                    <Button.Ripple
                      className="btn-icon rounded-circle"
                      outline
                      color="danger"
                      onClick={() => handleRemove(idx)}
                    >
                      <X size={5} />
                    </Button.Ripple>
                  </div>
                </div>
              );
            })
          : null}
      </>
    );
  }
}
