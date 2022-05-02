import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  CustomInput,
} from "reactstrap";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_green.css";
import { Plus, X } from "react-feather";
import { toast } from "react-toastify";
import AddRules from "../Challenge/AddRules";
import "../../assets/scss/components/modalcomponent.scss";
import Select from "react-select";
import * as ApiCallIng from "../../ApiStructure/index";
import { Camera } from "react-feather";
const short = require("short-uuid");

const colourOptions = [
  { value: "Environment", label: "Environment", color: "#90EE90", isFixed: true },
  { value: "Basketball", label: "Basketball", color: "#0052CC", isFixed: true },
  { value: "Nutrition", label: "Nutrition", color: "#5243AA", isFixed: false },
  { value: "Heart", label: "Heart", color: "#FF5630", isFixed: false },
  { value: "Cooking", label: "Cooking", color: "#FF8B00", isFixed: false },
  { value: "Vegan", label: "Vegan", color: "#FFD700", isFixed: false },
  { value: "Diabetic", label: "Diabetic", color: "#ADD8E6", isFixed: false },
  { value: "Fitness", label: "Fitness", color: "#016937", isFixed: false },
];
export default class ModalComponent extends Component {
  constructor(props) {
    super(props);
    this.inputOpenFileRef = React.createRef();
    this.state = {
      dateTimePickerfrom: new Date(),
      dateTimePickerto: new Date(),
      fields: [{ value: "" }],
      faqs: [{ que: "", ans: "" }],
      todos: [
        {
          todo: "",
          points: "",
          id: short.generate(),
          image: "",
          isImage: true,
          date: "",
        },
      ],
      challengename: "",
      description: "",
      amount: 0,
      meetlink: "",
      howtoplay: "",
      tags: [],
      fileUrl: "",
      isImageUpload: true,
      invalid: false,
    };
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.dataChallenge !== this.props.dataChallenge) {
      this.getChallengeDatForEdit();
    } else if (prevProps.modal !== this.props.modal) {
      if (this.props.modal) {
        this.getChallengeDatForEdit();
      }
    }
  };

  showOpenFileDlg = () => {
    this.inputOpenFileRef.current.click();
  };

  getChallengeDatForEdit = () => {
    if (this.props.isForEdit) {
      const apidata = this.props.dataChallenge;

      this.setState({
        dateTimePickerfrom:
          apidata && apidata.schedulechallenge && apidata.schedulechallenge.from
            ? new Date(apidata.schedulechallenge.from)
            : "",
        dateTimePickerto:
          apidata && apidata.schedulechallenge && apidata.schedulechallenge.to
            ? new Date(apidata.schedulechallenge.to)
            : "",
        fields: apidata && apidata.rules ? apidata.rules : [],
        faqs: apidata && apidata.faqs ? apidata.faqs : [{ que: "", ans: "" }],
        todos:
          apidata && apidata.todos
            ? apidata.todos
            : [
                {
                  todo: "",
                  points: "",
                  id: short.generate(),
                  image: "",
                  isImage: true,
                  date: "",
                },
              ],
        challengename:
          apidata && apidata.challengename ? apidata.challengename : "",
        description: apidata && apidata.description ? apidata.description : "",
        amount: apidata && apidata.priceamount ? apidata.priceamount : null,
        meetlink: apidata && apidata.meetlink ? apidata.meetlink : "",
        howtoplay: apidata && apidata.howtoplay ? apidata.howtoplay : "",
        tags: apidata && apidata.tags ? apidata.tags : [],
        fileUrl: apidata && apidata.avatar ? apidata.avatar : "",
        isImageUpload: true,
      });
    }
  };

  componentDidMount = () => {
    this.getChallengeDatForEdit();
  };

  handleAdd = () => {
    // console.log(this.state.fields.length);
    let invalid = false;
    this.state.fields.map((data, index) => {
      if (
        data.value.trim() === "" ||
        data.value === null ||
        data.value === undefined
      ) {
        //  this.setState({ invalid: true});
        invalid = true;
      }
      return null;
    });
    if (!invalid) {
      if (this.state.fields.length < 4) {
        const values = [...this.state.fields];
        values.push({ value: "" });
        this.setState({ fields: values });
      } else {
        toast.error("Rules can be 4 only");
      }
    } else {
      toast.error("Please fill previous rule");
    }
  };

  handleAddfaqs = () => {
    let invalidfaqs = false;
    // console.log(this.state.faqs.length);
    this.state.faqs.map((data, index) => {
      if (
        data.que.trim() === "" ||
        data.ans.trim() === "" ||
        data.que === null ||
        data.ans === null ||
        data.que === undefined ||
        data.ans === undefined
      ) {
        //  this.setState({ invalid: true});
        invalidfaqs = true;
      }
      return null;
    });
    if (!invalidfaqs) {
      if (this.state.faqs.length < 4) {
        const values = [...this.state.faqs];
        values.push({ que: "", ans: "" });
        this.setState({ faqs: values });
        invalidfaqs = false;
        // this.setState({ invalid: false});
      } else {
        toast.error("FAQs can be 4 only");
        invalidfaqs = false;
        // this.setState({ invalid: false});
      }
    } else {
      toast.error("Please fill previous FAQs correctly");
    }
  };

  handleAddtodos = () => {
    // console.log(this.state.todos.length);
    let invalidtodos = false;
    this.state.todos.map((data, index) => {
      if (
        data.todo.trim() === "" ||
        data.points === "" ||
        data.todo === null ||
        data.points === null ||
        data.todo === undefined ||
        data.points === undefined
      ) {
        invalidtodos = true;
      }
      return null;
    });
    if (!invalidtodos) {
      if (this.state.todos.length < 8) {
        const values = [...this.state.todos];
        const id = short.generate();
        // console.log(id);

        values.push({
          todo: null,
          points: null,
          id: id,
          iscomplete: false,
          image: "",
          date: "",
        });
        this.setState({ todos: values });
      } else {
        toast.error("To Dos can be 8 only");
      }
    } else {
      toast.error("Please fill previous todos correctly");
    }
  };

  handleChange = (i, event) => {
    const values = [...this.state.fields];
    values[i].value = event.target.value;
    this.setState({ fields: values });
  };

  handleChangeque = (i, event) => {
    const values = [...this.state.faqs];
    values[i].que = event.target.value;
    this.setState({ faqs: values });
  };

  handleChangeans = (i, event) => {
    const values = [...this.state.faqs];
    values[i].ans = event.target.value;
    this.setState({ faqs: values });
  };

  handleChangetodo = (i, event) => {
    const values = [...this.state.todos];
    values[i].todo = event.target.value;
    this.setState({ todos: values });
  };

  handleChangepoint = (i, event) => {
    const values = [...this.state.todos];
    // console.log(i);
    values[i].points = event.target.value;
    // console.table(values);
    this.setState({ todos: values });
  };
  handleChangeImage = (i, event) => {
    const values = [...this.state.todos];
    // console.log(i);
    values[i].isImage = event.target.checked;
    // console.table(values);
    this.setState({ todos: values });
  };

  handleRemove = (i) => {
    const values = [...this.state.fields];

    values.splice(i, 1);
    this.setState({ fields: values });
  };

  handleRemovefaqs = (i) => {
    const values = [...this.state.faqs];

    values.splice(i, 1);
    this.setState({ faqs: values });
  };

  handleRemovetodos = (i) => {
    const values = [...this.state.todos];

    values.splice(i, 1);
    this.setState({ todos: values });
  };

  handleUploadFile = (file) => {
    const fd = new FormData();
    fd.append("image", file);
    ApiCallIng.uploadImage(fd)
      .then((response) => {
        if (response.data) {
          this.setState(
            {
              fileUrl: response.data.data,
            },
            () => {
              this.setState({ isImageUpload: true });
            }
          );
        }
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          this.setState({ error: err.response.data.error });
        } else {
          this.setState({ error: "Something went wrong" });
        }
      });
  };

  componentDidMount(){
    console.trace("fefe")
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      challengename,
      description,
      amount,
      dateTimePickerto,
      dateTimePickerfrom,
      meetlink,
      howtoplay,
      fields,
      faqs,
      todos,
      tags,
      fileUrl,
      isImageUpload,
    } = this.state;

    let isRulesValidate = true;
    let RulesData = [];

    for (let i = 0; i < fields.length; i++) {
      if (fields.length > 1) {
        RulesData = fields;
        if (
          fields[i].value === "" ||
          fields[i].value === null ||
          fields[i].value === undefined
        ) {
          isRulesValidate = false;
        }
      } else {
        if (
          fields[i].value === "" ||
          fields[i].value === null ||
          fields[i].value === undefined
        ) {
          isRulesValidate = false;
          RulesData = [];
        } else {
          RulesData = fields;
        }
      }
    }

    const ReqBody = {
      challengename: challengename ? challengename : "",
      description: description ? description : "",
      priceamount: amount ? amount : "",
      schedulechallenge: {
        from: dateTimePickerfrom ? dateTimePickerfrom : "",
        to: dateTimePickerto ? dateTimePickerto : "",
      },
      meetlink: meetlink ? meetlink : "",
      howtoplay: howtoplay ? howtoplay : "",
      rules: RulesData ? RulesData : [],
      faqs: faqs ? faqs : [],
      todos: todos ? todos : [],
      tags: tags ? tags : [],
      avatar: fileUrl ? fileUrl : "",
    };

    // console.log(isRulesValidate);
    // console.log(RulesData);

    if (isImageUpload) {
      if (challengename) {
        if (description) {
          if (amount) {
            if (dateTimePickerfrom && dateTimePickerto) {
              if (dateTimePickerfrom < dateTimePickerto) {
                if (isRulesValidate) {
                  if (this.props.isForEdit) {
                    ApiCallIng.updateParticularChallenge(
                      this.props.dataChallenge && this.props.dataChallenge._id,
                      ReqBody
                    )
                      .then((response) => {
                        if (response.data) {
                          toast.success("Challenge updated successfully!");
                          this.handleCloseModal();
                        }
                      })
                      .catch((err) => {
                        if (err.response && err.response.data) {
                          this.setState({ error: err.response.data.error });
                        } else {
                          this.setState({ error: "Something went wrong" });
                        }
                      });
                  } else {
                    ApiCallIng.createParticularChallenge(ReqBody)
                      .then((response) => {
                        if (response.data) {
                          toast.success("Challenge added successfully!");
                          this.handleCloseModal();
                        }
                      })
                      .catch((err) => {
                        if (err.response && err.response.data) {
                          this.setState({ error: err.response.data.error });
                        } else {
                          this.setState({ error: "Something went wrong" });
                        }
                      });
                  }
                } else {
                  toast.error("Please fill all the rules!");
                }
              } else {
                toast.error("Please schedule time correctly!");
              }
            } else {
              toast.error("Please schedule time correctly!");
            }
          } else {
            toast.error("Please enter a price!");
          }
        } else {
          toast.error("Please enter a description!");
        }
      } else {
        toast.error("Please enter a challenge name!");
      }
    } else {
      toast.warn("Please wait until image gets uploaded!");
    }
  };

  handleChangetag = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    this.setState({ tags: value });
  };

  handleCloseModal = () => {
    this.props.toggle();
    this.setState({
      dateTimePickerfrom: new Date(),
      dateTimePickerto: new Date(),
      fields: [{ value: "" }],
      faqs: [{ que: "", ans: "" }],
      todos: [
        {
          todo: "",
          points: "",
          id: short.generate(),
          iscomplete: false,
          image: "",
          date: "",
        },
      ],
      challengename: "",
      description: "",
      amount: null,
      meetlink: "",
      howtoplay: "",
      tags: [],
      fileUrl: "",
      isImageUpload: true,
    });
  };

  render() {
    const {
      dateTimePickerfrom,
      dateTimePickerto,
      challengename,
      description,
      amount,
      meetlink,
      howtoplay,
      tags,
      fileUrl,
    } = this.state;
    // let {
    //     dateTimePicker
    //   } = this.state

    return (
      <div>
        <div>
          <Modal
            isOpen={this.props.modal}
            toggle={this.handleCloseModal}
            centered={true}
            // ="modal-xl"
            size="lg"
          >
            <ModalHeader
              style={{ justifyContent: "center", padding: "1.5rem 0" }}
            >
              {this.props.isForEdit ? "Edit Challenge" : "Create Challenge"}
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <Label for="exampleEmail">Challenge Name</Label>
                  <Input
                    type="text"
                    name="challengeName"
                    id="exampleEmail"
                    placeholder="Give your challenge a name"
                    value={challengename}
                    onChange={(e) => {
                      this.setState({ challengename: e.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input
                    type="textarea"
                    name="description"
                    id="description"
                    placeholder="Enter description of your Challenge"
                    value={description}
                    onChange={(e) => {
                      this.setState({ description: e.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="price">Prize Amount</Label>
                  <Input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price amount for your challenge"
                    value={amount}
                    onChange={(e) => {
                      this.setState({ amount: e.target.value });
                    }}
                  />
                </FormGroup>
                <label className="text-bold-500 mb-1">Schedule Challenge</label>
                <div className="row">
                  <div className="col">
                    <FormGroup>
                      <Label for="fromDate">From</Label>
                      <Flatpickr
                        className="form-control"
                        data-enable-time
                        id="fromDate"
                        value={dateTimePickerfrom}
                        onChange={(date) => {
                          this.setState({ dateTimePickerfrom: new Date(date) });
                        }}
                      />
                    </FormGroup>
                  </div>
                  <div className="col">
                    <FormGroup>
                      <Label for="toDate">To</Label>
                      <Flatpickr
                        className="form-control"
                        data-enable-time
                        id="toDate"
                        value={dateTimePickerto}
                        onChange={(date) => {
                          this.setState({ dateTimePickerto: new Date(date) });
                        }}
                      />
                    </FormGroup>
                  </div>
                </div>
                <FormGroup>
                  <Label for="meetlink">Meet Link</Label>
                  <Input
                    type="text"
                    name="meetlink"
                    id="meetlink"
                    placeholder="Enter meet link"
                    value={meetlink}
                    onChange={(e) => {
                      this.setState({ meetlink: e.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="howtoplay">How to play?</Label>
                  <Input
                    type="textarea"
                    name="howtoplay"
                    id="howtoplay"
                    placeholder="Enter How to play your challenge"
                    value={howtoplay}
                    onChange={(e) => {
                      this.setState({ howtoplay: e.target.value });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <Label for="rule">Rules</Label>
                    <div className="d-inline-block mr-1">
                      {" "}
                      <Button.Ripple
                        className="btn-icon rounded-circle bg_color_F2C94C"
                        onClick={() => this.handleAdd()}
                      >
                        <Plus size={5} />
                      </Button.Ripple>
                    </div>
                    {/* <Button type="button" onClick={() => this.handleAdd()}>
                      +
                    </Button> */}
                  </div>
                  <AddRules
                    rules={this.state.fields}
                    handleRemove={this.handleRemove}
                    handleChange={this.handleChange}
                  />
                  {/* <Input type="textarea" name="Rules" id="Rules" /> */}
                </FormGroup>
                <FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <Label for="faqs">FAQs</Label>
                    <div className="d-inline-block mr-1 mb-1">
                      {" "}
                      <Button.Ripple
                        className="btn-icon rounded-circle bg_color_F2C94C"
                        onClick={() => this.handleAddfaqs()}
                      >
                        <Plus size={5} />
                      </Button.Ripple>
                    </div>
                    {/* <Input type="textarea" name="faqs" id="faqs" /> */}
                  </div>
                  {this.state.faqs.map((field, idx) => {
                    return (
                      <div
                        key={`${field}-${idx}`}
                        className="d-flex mt-2 align-items-center"
                      >
                        <div className="w-75">
                          <Input
                            type="text"
                            placeholder="Enter new Question"
                            className="w-100"
                            value={field.que}
                            onChange={(e) => this.handleChangeque(idx, e)}
                          />

                          <Input
                            type="textarea"
                            placeholder="Enter new Answer"
                            value={field.ans}
                            className="w-100 mt-1 d-inline-block"
                            onChange={(e) => this.handleChangeans(idx, e)}
                          />
                        </div>

                        <div className="d-inline-block ml-2 mr-1">
                          {" "}
                          <Button.Ripple
                            className="btn-icon rounded-circle"
                            outline
                            color="danger"
                            onClick={() => this.handleRemovefaqs(idx)}
                          >
                            <X size={5} />
                          </Button.Ripple>
                        </div>
                      </div>
                    );
                  })}
                </FormGroup>
                <FormGroup>
                  <div className="d-flex justify-content-between align-items-center">
                    <Label for="faqs">To Dos</Label>
                    <div className="d-inline-block mr-1 mb-1">
                      {" "}
                      <Button.Ripple
                        className="btn-icon rounded-circle bg_color_F2C94C"
                        onClick={() => this.handleAddtodos()}
                      >
                        <Plus size={5} />
                      </Button.Ripple>
                    </div>
                    {/* <Input type="textarea" name="faqs" id="faqs" /> */}
                  </div>
                  {this.state &&
                    this.state.todos &&
                    this.state.todos.map((field, idx) => {
                      return (
                        <div
                          key={`${field}-${idx}`}
                          className="d-flex mt-2 align-items-center"
                        >
                          <div className="w-75">
                            <Input
                              type="text"
                              value={field.todo}
                              placeholder="Enter new To Do"
                              className="w-100"
                              onChange={(e) => this.handleChangetodo(idx, e)}
                            />
                            <Row xs={2}>
                              <Col>
                                <Input
                                  type="number"
                                  value={field.points}
                                  placeholder="Enter points"
                                  className="w-100 mt-1 d-inline-block"
                                  onChange={(e) =>
                                    this.handleChangepoint(idx, e)
                                  }
                                />
                              </Col>
                              <Col className="d-flex align-items-center">
                                <CustomInput
                                  inline
                                  type="checkbox"
                                  // defaultChecked={field?.isImage}
                                  checked={field?.isImage}
                                  id={`exampleCustomCheckbox${idx}`}
                                  label="Contain image"
                                  className="mt-1"
                                  onChange={(e) =>
                                    this.handleChangeImage(idx, e)
                                  }
                                />
                                {/* <Input
                                type="checkbox"
                                value={field.points}
                                placeholder="Enter checkbox"
                                className="w-100 mt-1 d-inline-block"
                                // onChange={(e) => this.handleChangepoint(idx, e)}
                              /> */}
                              </Col>
                            </Row>
                            {/* <Input
                            type="number"
                            value={field.points}
                            placeholder="Enter Points for To Do"
                            className="w-100 mt-1 d-inline-block"
                            onChange={(e) => this.handleChangepoint(idx, e)}
                          /> */}
                          </div>

                          <div className="d-inline-block ml-2 mr-1">
                            {" "}
                            <Button.Ripple
                              className="btn-icon rounded-circle"
                              outline
                              color="danger"
                              onClick={() => this.handleRemovetodos(idx)}
                            >
                              <X size={5} />
                            </Button.Ripple>
                          </div>
                        </div>
                      );
                    })}
                </FormGroup>
                <FormGroup>
                  <Label for="tags">Tags</Label>
                  {/* <h5 className="text-bold-600 my-1">Multi Select</h5> */}
                  <Select
                    defaultValue={tags}
                    isMulti
                    id="tags"
                    name="tags"
                    options={colourOptions}
                    onChange={(e) => {
                      this.setState({ tags: e });
                    }}
                    // className="React"
                    // classNamePrefix="select"
                  />
                </FormGroup>
                <Label for="customFile">Challenge Cover Image</Label>
                <div
                  className="center_content mb-2"
                  onClick={this.showOpenFileDlg}
                  style={{ border: "2px dashed lightgrey" }}
                >
                  {/* {console.log("fileUrl", fileUrl)} */}

                  {/* {fileUrl && (
                    <img
                      src={fileUrl}
                      className="image_preview_challenge"
                      alt="Preview"
                    />
                  )} */}
                  {typeof fileUrl === "string" && !fileUrl ? (
                    // <Avatar
                    //   className="mr-1"
                    //   color="#ffff"

                    //   icon={<Camera />}
                    //   // badgeText="7"
                    //   // badgeColor="danger"
                    //   // badgeUp
                    // />
                    <div>
                      <div
                        style={{
                          color: "lightgray",
                          justifyContent: "center",
                          display: "flex",
                        }}
                      >
                        <Camera size={100} color="lightgray" />
                      </div>
                      <h6
                        style={{
                          color: "lightgray",
                          justifyContent: "center",
                          display: "flex",
                        }}
                      >
                        Upload cover page
                      </h6>
                    </div>
                  ) : (
                    <img
                      src={fileUrl}
                      className="image_preview_challenge"
                      alt="Preview"
                    />
                  )}
                </div>
                <FormGroup>
                  <input
                    ref={this.inputOpenFileRef}
                    type="file"
                    style={{ display: "none" }}
                    id="exampleCustomFileBrowser"
                    name="customFile"
                    onChange={(e) => {
                      const [file] = e.target.files;
                      if (file) {
                        this.setState({ isImageUpload: false });
                        this.handleUploadFile(file);
                        const fileUrl = URL.createObjectURL(file);
                        // console.log(fileUrl);
                        this.setState({ fileUrl: fileUrl });
                      }
                    }}
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter>
              {/* <Button color="primary" type= "submit" onSubmit={this.handleSubmit()}>
                Save
              </Button>{" "}
              <Button color="secondary" onClick={this.props.toggle}>
                Cancel
              </Button> */}

              <Button
                className="button-cancel-class ml-2"
                onClick={this.handleCloseModal}
              >
                Cancel
              </Button>
              <Button
                //   style={{ backgroundColor: "#F2C94C !important" }}
                type="submit"
                className="button-save-class"
                onClick={this.handleSubmit}
              >
                {this.props.isForEdit ? "Update" : "Save"}
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    );
  }
}
