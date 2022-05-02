import React from "react"
import {
  TabContent, TabPane, Nav, NavItem,
  Col, FormGroup, Form, Row,
  NavLink, Card, CardBody, CardHeader, CardTitle,
  Input, Button,
} from "reactstrap"
import Select from "react-select"
import classnames from "classnames"
import { connect } from "react-redux"
import Checkbox from "../../components/@vuexy/checkbox/CheckboxesVuexy"
import { Check } from "react-feather"
import { getPollType, awsfileUpload, savePoll } from '../../redux/actions/poll/index';
import QuestionPollOption from "./component/questionPoll";
import AgreementPollOption from "./component/agreementPoll";
import NumberPollOption from './component/numberVotePoll';
import RankingPollOption from './component/rankingPoll';
import RatingPollOption from './component/ratingPoll';
import Flatpickr from "react-flatpickr";
import { toast } from "react-toastify";
import { history } from "../../history";
import "flatpickr/dist/themes/light.css";

const POLLTYPE = {
  QuestionPoll: "Question Poll",
  AgreementPoll: "Agreement Poll",
  RatingPoll: "Rating Poll",
  RankingPoll: "Ranking Poll",
  NumberVotePoll: "Number Vote Poll"
}

class CommanFieldPoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "1", questionImage: '',
      pollTypeOptions: [], isUserOptionEdit: false,
      polltype: null, limitPerOption: { value: false, limitValue: null }, singleVotePerUser: false,
      options: [], hiddenPoll: false, reminderAutomatic: false,
      lastIndex: 0, email: true, phone: true, address: true, date: new Date(),
      answer: null, pollArray: {}, question: ''
    }
    this.OptionChangeHandler = this.OptionChangeHandler.bind(this);
    this.optionAddMoreClick = this.optionAddMoreClick.bind(this);
    this.removeOption = this.removeOption.bind(this);
    this.fileChangeHandler = this.fileChangeHandler.bind(this);
    this.OptionFileChangeHandler = this.OptionFileChangeHandler.bind(this);
  }

   componentDidMount() {
     this.props.getPollType();
    this.pollType(this.props);
    if (this.props && this.props.history && this.props.history.location.state) {
      const { detail } = this.props && this.props.history && this.props.history.location.state;
      this.setOldData(detail,this.props);
    }
  }
  setOldData(detail,nextProps) {
    this.setState({
      question: detail.question,
      isUserOptionEdit: detail && detail.optionSettings && detail.optionSettings.isUserOptionEdit,
      limitPerOption: { value: detail && detail.optionSettings && detail.optionSettings.limitPerOption.value, limitValue: detail && detail.optionSettings && detail.optionSettings.limitPerOption.limitValue },
      hiddenPoll: detail && detail.optionSettings && detail.optionSettings.hiddenPoll,
      reminderAutomatic: detail && detail.optionSettings && detail.optionSettings.reminderAutomatic,
      singleVotePerUser: detail && detail.optionSettings && detail.optionSettings.singleVotePerUser,
      address: detail && detail.optionSettings && detail.optionSettings.contactInfo && detail.optionSettings.contactInfo.address,
      phone: detail && detail.optionSettings && detail.optionSettings.contactInfo && detail.optionSettings.contactInfo.phone,
      email: detail && detail.optionSettings && detail.optionSettings.contactInfo && detail.optionSettings.contactInfo.email,
      answer: detail && detail.rightAnswer,
      questionImage: detail && detail.questionImage,
      date:[detail.startDate,detail.endDate]
    });
    // console.log("this.props.poll.polltype",nextProps.poll.polltype);
    let objtype = nextProps.poll.polltype.find((poll) => poll.name === detail.pollName);
    this.setState({ polltype: { value: objtype && objtype.id, label: objtype && objtype.name } });
    let option = [];
    detail && detail.options.map((opt, i) => {
      let value = {
        key: Math.random(),
        index: i
      };
      option.push(value);
      if (objtype && objtype.name === POLLTYPE.QuestionPoll) {
        this.setState({
          [`option_name_${value.key}`]: opt.name,
          [`option_image_${value.key}`]: opt.optionImage,
          options: option
        })
      } else if (objtype && objtype.name === POLLTYPE.NumberVotePoll) {
        this.setState({
          [`option_name_${value.key}`]: opt.name,
          [`min_${value.key}`]: opt.minRange,
          [`max_${value.key}`]: opt.maxRange,
          options: option
        })
      } else {
        this.setState({
          [`option_name_${value.key}`]: opt.name,
          options: option
        })
      }
      return null
    });
    let answer = detail && detail.options.find((opt) => opt.name === detail.rightAnswer);
    this.setState({ answer: { value: answer && answer.name, label: answer && answer.name } })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.history && nextProps.history.location.state) {
      // nextProps.getPopollTypellType();
      const { detail } = nextProps && nextProps.history && nextProps.history.location.state;
      this.setOldData(detail,nextProps);
    }
    this.pollType(nextProps);
  }

  pollType(nextProps) {
    let pollTypeOptions = [];
    nextProps && nextProps.poll && nextProps.poll.polltype.map((poll) => pollTypeOptions.push({ value: poll.id, label: poll.name }))
    this.setState({ pollTypeOptions })

  }
  toggle = tab => {
    if (this.state.active !== tab) {
      this.setState({ active: tab })
    }
  }
  OptionChangeHandler(event) {
    this.setState({
      [`${event.target.name}`]: event.target.value,
    });
  }
  fileChangeHandler(event) {
    const formData = new FormData();
    formData.append('image', event.target.files[0]);
    this.props.awsfileUpload(formData).then(res => {
      this.setState({ questionImage: res.data.imageUrl })
      toast.success("File Upload Successfully ....");
    }).catch(err => {
      toast.error("err -*--*", err);
    })
  }
  OptionFileChangeHandler(event) {
    let self = this;
    const { name, files } = event.target;
    const formData = new FormData();
    formData.append('image', files[0]);
    this.props.awsfileUpload(formData).then(res => {
      self.setState({
        [`${name}`]: res.data.imageUrl,
      }, () => {
      });
      toast.success("File Upload Successfully ....");
    }).catch(err => {
      toast.error("err -*--*", err);
    })
  }
  optionAddMoreClick(e) {
    e.preventDefault();
    let { options, lastIndex } = this.state;
    let value = {
      key: Math.random(),
      index: (lastIndex + 1)
    };
    options.push(value);
    var lastIndex1 = this.state.lastIndex;
    this.setState({
      lastIndex: lastIndex1++
    })
    this.setState({
      lastIndex: lastIndex1,
      options: options
    })

  }
  removeOption(event, i) {
    event.preventDefault();
    let options = [...this.state.options];
    options.splice(i, 1);
    this.setState({ options });
  }
  handleNextPoll(event) {
    event.preventDefault();
    if (this.state.question === '') {
      toast.error('Please Enter Question');
    } else if (this.state.polltype === null) {
      toast.error('Please Select Poll Type');
    }
    else {
      this.toggle('2');
    }
  }

  finishInsertHandlePoll(event) {
    const { isUserOptionEdit, limitPerOption,
      singleVotePerUser, hiddenPoll, reminderAutomatic, email, phone, address,
      date } = this.state;

    const pollData = {
      "question": this.state.question,
      "pollType": this.state.polltype.value,
      "isactive": true,
    };
    pollData.questionImage = this.state.questionImage;
    if (this.state.polltype.label === POLLTYPE.QuestionPoll) {
      pollData.options = this.state && this.state.options && this.state.options.reduce((total, value) => {
        return [...total, {
          name: this.state && this.state[`option_name_${value.key}`],
          optionImage: this.state && this.state[`option_image_${value.key}`]
        }]
      }, []);
      pollData.rightAnswer =this.state && this.state.answer && this.state.answer.value;
    } else if (this.state.polltype.label === POLLTYPE.NumberVotePoll) {
      pollData.options = this.state && this.state.options && this.state.options.reduce((total, value) => {
        return [...total, {
          name: this.state[`option_name_${value.key}`]
          , maxRange: parseInt(this.state[`max_${value.key}`]), minRange: parseInt(this.state[`min_${value.key}`])
        }]
      }, []);
    } else {
      pollData.options = this.state && this.state.options && this.state.options.reduce((total, value) => {
        return [...total, { name: this.state[`option_name_${value.key}`] }]
      }, []);
    }
    pollData.endDate = date && date[1];
    pollData.startDate =date && date[0];
    pollData.optionSettings = {
      isUserOptionEdit: isUserOptionEdit,
      limitPerOption: limitPerOption,
      singleVotePerUser: singleVotePerUser,
      hiddenPoll: hiddenPoll,
      reminderAutomatic: reminderAutomatic,
      contactInfo: {
        email: email,
        phone: phone,
        address: address
      }
    }
    if (this.props && this.props.history && this.props.history.location.state) {
      const { detail } = this.props && this.props.history && this.props.history.location.state;
      pollData.pollId = detail._id;
      this.props.savePoll(pollData).then(res => {
        history.push('/poll');
        toast.success("Update Poll SuccessFully ....")
      }).catch(err => {
        toast.error(err.data.message)
      })
    } else {
      this.props.savePoll(pollData).then(res => {
        history.push('/poll');
        toast.success("Create Poll SuccessFully ....")
      }).catch(err => {
        toast.error(err.data.message)
      })
    }
    // console.log("pollData-*-*", pollData);

  }
  render() {
    const { pollTypeOptions } = this.state;
    return (
      <Card>
        <CardHeader>
          <CardTitle>Create Poll</CardTitle>
        </CardHeader>
        <CardBody className="rdt_Wrapper">

          <Nav pills className="nav-fill">
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.active === "1"
                })}
                onClick={() => {
                  this.toggle("1")
                }}
              >    Add Poll </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.active === "2"
                })}
                onClick={() => {
                  this.toggle("2")
                }}
              > Poll settings </NavLink>
            </NavItem>

          </Nav>
          <TabContent activeTab={this.state.active}>
            <TabPane tabId="1">
              <Form encType="multipart/form-data">
                <Col md="6" sm="12">
                  <h5 className="my-1 text-bold-600">PollType</h5>
                  <Select
                    required
                    className="React"
                    classNamePrefix="select"
                    defaultValue={pollTypeOptions && pollTypeOptions[1]}
                    name="clear"
                    options={pollTypeOptions && pollTypeOptions}
                    isClearable={true}
                    value={this.state.polltype}
                    onChange={(text) => this.setState({
                      polltype: text, options: [{
                        key: Math.random(),
                        index: 0,
                      }], lastIndex: 0
                    })}
                  />
                </Col>
                <Col md="12" sm="12">
                  <h5 className="my-1 text-bold-600">Questions</h5>
                  <Input
                    value={this.state.question}
                    type="textarea"
                    name="question"
                    rows="3"
                    placeholder="Write Question"
                    onChange={(event) => this.setState({ question: event.target.value })}
                  />
                </Col>
                <Col md="12" sm="12">
                  <h5 className="my-1 text-bold-600">Question Image</h5>
                  <FormGroup>
                    <Input
                      required
                      type="file"
                      name="filename"
                      onChange={this.fileChangeHandler}
                      multiple
                      placeholder="question image" />
                  </FormGroup>
                </Col>
                <Col md="12" sm="12">
                  <h5 className="my-1 text-bold-600">Options</h5>
                  {this.state.polltype && this.state.polltype.label === POLLTYPE.QuestionPoll &&
                    this.state.options.map((poll, i) => {
                      return (
                        <QuestionPollOption
                          rowData={poll}
                          id={i}
                          removeOption={this.removeOption}
                          OptionChangeHandler={this.OptionChangeHandler}
                          optionAddMoreClick={this.optionAddMoreClick}
                          OptionFileChangeHandler={this.OptionFileChangeHandler}
                          optionName={this.state[`option_name_${poll.key}`]}
                        />
                      )
                    })
                  }
                  {this.state.polltype && this.state.polltype.label === POLLTYPE.AgreementPoll &&
                    this.state.options.map((poll, i) => {
                      return (
                        <AgreementPollOption
                          rowData={poll}
                          id={i}
                          removeOption={this.removeOption}
                          OptionChangeHandler={this.OptionChangeHandler}
                          optionAddMoreClick={this.optionAddMoreClick}
                          optionName={this.state[`option_name_${poll.key}`]}
                        />
                      )
                    })
                  }
                  {this.state.polltype && this.state.polltype.label === POLLTYPE.NumberVotePoll &&
                    this.state.options.map((poll, i) => {
                      return (
                        <NumberPollOption
                          rowData={poll}
                          id={i}
                          removeOption={this.removeOption}
                          OptionChangeHandler={this.OptionChangeHandler}
                          optionAddMoreClick={this.optionAddMoreClick}
                          optionName={this.state[`option_name_${poll.key}`]}
                          min={this.state[`min_${poll.key}`]}
                          max={this.state[`max_${poll.key}`]}
                        />
                      )
                    })
                  }
                  {this.state.polltype && this.state.polltype.label === POLLTYPE.RatingPoll &&
                    this.state.options.map((poll, i) => {
                      return (
                        <RatingPollOption
                          rowData={poll}
                          id={i}
                          removeOption={this.removeOption}
                          OptionChangeHandler={this.OptionChangeHandler}
                          optionAddMoreClick={this.optionAddMoreClick}
                          optionName={this.state[`option_name_${poll.key}`]}
                        />
                      )
                    })
                  }
                  {this.state.polltype && this.state.polltype.label === POLLTYPE.RankingPoll &&
                    this.state.options.map((poll, i) => {
                      return (
                        <RankingPollOption
                          rowData={poll}
                          id={i}
                          removeOption={this.removeOption}
                          OptionChangeHandler={this.OptionChangeHandler}
                          optionAddMoreClick={this.optionAddMoreClick}
                          optionName={this.state[`option_name_${poll.key}`]}
                        />
                      )
                    })
                  }
                </Col>

                {this.state.polltype && this.state.polltype.label === POLLTYPE.QuestionPoll &&
                  <Col md="12" sm="12">
                    <h5 className="my-1 text-bold-600">Answer</h5>
                    <Select
                      value={this.state.answer}
                      className="React"
                      classNamePrefix="select"
                      name="clear"
                      options={this.state && this.state.options && this.state.options.reduce((total, value) => {
                        return [...total, { label: this.state[`option_name_${value.key}`], value: this.state[`option_name_${value.key}`] }]
                      }, [])}
                      isClearable={true}
                      onChange={(text) =>
                        this.setState({ answer: text })}
                    />
                  </Col>

                }
                <Row>
                  <Col >
                  </Col>
                  <Button.Ripple className="mr-1 mb-1" color="relief-info" onClick={(e) => {
                    this.handleNextPoll(e)
                  }}>Next</Button.Ripple>
                </Row>
              </Form>
            </TabPane>
            <TabPane tabId="2">
              <Col md='12' style={{ marginTop: 10 }}>

                <Col md="6" style={{ position: 'absolute' }}>
                  <div style={{ position: 'absolute', marginTop: '5px' }}>
                    <i class="round fa fa-check" style={{ backgroundColor: 'gray', color: 'white', padding: '7px' }} height="40" width="40" alt="avatar"></i>
                  </div>
                  <div style={{ marginLeft: '45px', marginRight: '4px' }}>
                    <h5><b>Yes, no. if need be</b></h5>
                    <h6>Participants can indicate if an option i not ideal for them.</h6>
                  </div>
                  <Checkbox
                    checked={this.state.isUserOptionEdit}
                    color="primary"
                    icon={<Check className="vx-icon" size={16} />}
                    defaultChecked={false}
                    onChange={(event) => this.setState({ isUserOptionEdit: event.target.checked })}
                  />
                  <hr />
                  <div style={{ position: 'absolute', marginTop: '5px' }}>
                    <i class="round fa fa-users" style={{ backgroundColor: 'gray', color: 'white', padding: '7px' }} height="40" width="40" alt="avatar"></i>
                  </div>
                  <div style={{ marginLeft: '45px', marginRight: '4px' }}>
                    <h5><b>Limit the number of votes per option</b></h5>
                    <h6>First come first served. If true, Enter number of votes per option.</h6>
                  </div>
                  <Checkbox
                    checked={this.state.limitPerOption.value}
                    color="primary"
                    icon={<Check className="vx-icon" size={16} />}
                    defaultChecked={false}
                    onChange={(event) => {
                      const limit = {
                        value: event.target.checked,
                      }
                      this.setState({ limitPerOption: limit });
                    }}
                  />
                  {this.state.limitPerOption.value === true &&

                    <Input
                      value={this.state.limitPerOption.limitValue}
                      type="number"
                      name="limitvalue"
                      required
                      onChange={(event) => {
                        let limitvalue = {
                          limitValue: event.target.value,
                          value: true
                        }
                        this.setState({ limitPerOption: limitvalue })
                      }}
                    />

                  }
                  <hr />

                  <div style={{ position: 'absolute', marginTop: '5px' }}>
                    <i class="round fa fa-file" style={{ backgroundColor: 'gray', color: 'white', padding: '7px' }} height="40" width="40" alt="avatar"></i>
                  </div>
                  <div style={{ marginLeft: '45px', marginRight: '4px' }}>
                    <h5><b>Limit participants to a single vote</b></h5>
                    <h6>Participants can only select one option.</h6>
                  </div>
                  <Checkbox
                    checked={this.state.singleVotePerUser}
                    color="primary"
                    icon={<Check className="vx-icon" size={16} />}
                    defaultChecked={false}
                    onChange={(event) => this.setState({ singleVotePerUser: event.target.checked })}
                  />
                  <hr />

                  <div style={{ position: 'absolute', marginTop: '5px' }}>
                    <i class="round fa fa-eye-slash" style={{ backgroundColor: 'gray', color: 'white', padding: '7px' }} height="40" width="40" alt="avatar"></i>
                  </div>
                  <div style={{ marginLeft: '45px', marginRight: '4px' }}>
                    <h5><b>Hidden poll</b></h5>
                    <h6>Participants comments and votes are corfidencial. Only you can see the response.</h6>
                  </div>
                  <Checkbox
                    checked={this.state.hiddenPoll}
                    color="primary"
                    icon={<Check className="vx-icon" size={16} />}
                    defaultChecked={false}
                    onChange={(event) => this.setState({ hiddenPoll: event.target.checked })}
                  />
                  <hr />

                </Col>
                <Col md='6' style={{ marginLeft: '500px' }}>
                  <table style={{ border: '2px solid #ffae01', width: 400, backgroundColor: '#f9f7c1' }}>
                    <tr style={{ paddingTop: '15px', paddingBottom: '15px', border: '2px solid #ffae01' }}>
                      <td style={{ paddingTop: '15px', paddingBottom: '15px', paddingLeft: '25px' }}>
                        <div style={{ position: 'absolute' }}>
                          <i class="round fa fa-hourglass" style={{ backgroundColor: '#ffae01', color: 'white', padding: '7px', marginRight: '10px' }} height="40" width="40" alt="avatar"></i>
                        </div>
                        <div style={{ marginLeft: '50px', marginRight: '100px' }}>
                          <h5><b>Set deadline</b></h5>
                          <h6>Set a date range to receive votes in time. After the deadline, no more votes is allowed.</h6>
                        </div>
                        <div style={{ marginLeft: '15px', marginTop: '15px', position: 'absolute' }}>

                        </div>
                        <div style={{ marginLeft: '50px', marginTop: '17px', marginRight: '100px' }}>
                          <Flatpickr
                            value={this.state.date}
                            className="form-control"
                            options={{ mode: "range" }}
                            onChange={(dates) => {
                              this.setState({ date:dates })
                            }}
                          />
                        </div>
                      </td>
                    </tr>

                    <tr style={{ paddingTop: '15px', paddingBottom: '15px', border: '2px solid #ffae01' }}>
                      <td style={{ paddingTop: '15px', paddingBottom: '15px', paddingLeft: '25px' }}>
                        <div style={{ position: 'absolute' }}>
                          <i class="round fa fa-envelope" style={{ backgroundColor: '#ffae01', color: 'white', padding: '7px', marginRight: '10px' }} height="40" width="40" alt="avatar"></i>
                        </div>
                        <div style={{ marginLeft: '50px', marginRight: '100px' }}>
                          <h5><b>Set automatic reminders</b></h5>
                        </div>
                        <div style={{ position: 'absolute', marginLeft: '15px', marginTop: '15px' }}>
                          <Checkbox
                            checked={this.state.reminderAutomatic}
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            defaultChecked={false}
                            onChange={(event) => this.setState({ reminderAutomatic: event.target.checked })}
                          />
                        </div>
                        <div style={{ marginLeft: '50px', marginTop: '30px' }}>
                          <h6>Remind your invitees to vote.</h6>
                        </div>
                      </td>
                    </tr>

                    <tr style={{ paddingTop: '15px', paddingBottom: '15px', border: '2px solid #ffae01' }}>
                      <td style={{ paddingTop: '15px', paddingBottom: '15px', paddingLeft: '25px' }}>
                        <div style={{ position: 'absolute' }}>
                          <i class="round fa fa-question-circle-o" style={{ backgroundColor: '#ffae01', color: 'white', padding: '7px', marginRight: '10px' }} height="40" width="40" alt="avatar"></i>
                        </div>
                        <div style={{ marginLeft: '50px', marginRight: '100px' }}>
                          <h5><b>Ask for contact information</b></h5>
                          <h6>Ask for your participants emails, phone numbers, or address.</h6>
                        </div>
                        <div style={{ position: 'absolute', marginLeft: '15px', marginTop: '8px' }}>
                          <Checkbox
                            checked={this.state.email}
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            defaultChecked={false}
                            onChange={(e) => {
                              this.setState({ email: e.target.checked });
                            }}
                          />
                        </div>
                        <div style={{ marginLeft: '50px', marginTop: '20px' }}>
                          <h6>Email</h6>
                        </div>
                        <div style={{ position: 'absolute', marginLeft: '15px', marginTop: '8px' }}>
                          <Checkbox
                            checked={this.state.phone}
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            defaultChecked={false}
                            onChange={(e) => {
                              this.setState({ phone: e.target.checked });
                            }}
                          />
                        </div>
                        <div style={{ marginLeft: '50px', marginTop: '20px' }}>
                          <h6>Phone number</h6>
                        </div>
                        <div style={{ position: 'absolute', marginLeft: '15px', marginTop: '8px' }}>
                          <Checkbox
                            checked={this.state.address}
                            color="primary"
                            icon={<Check className="vx-icon" size={16} />}
                            defaultChecked={false}
                            onChange={(e) => {
                              this.setState({ address: e.target.checked });
                            }}
                          />
                        </div>
                        <div style={{ marginLeft: '50px', marginTop: '20px' }}>
                          <h6>Address</h6>
                        </div>
                      </td>
                    </tr>
                  </table>
                  <div style={{ marginTop: 50, marginLeft: 360 }}>
                    <Button.Ripple color="success" onClick={(e) => this.finishInsertHandlePoll(e)}>Finish</Button.Ripple>
                  </div>
                </Col>
              </Col>
            </TabPane>
          </TabContent>
        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    poll: state.pollApp.poll
  }
}
export default connect(mapStateToProps, {
  getPollType,
  awsfileUpload,
  savePoll
})(CommanFieldPoll)