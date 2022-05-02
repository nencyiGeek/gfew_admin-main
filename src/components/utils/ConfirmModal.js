import React, { Component } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap"

export default class ConfirmModal extends Component {

  toggleModal = () => {
    this.props.toggleModal();
  }

  render() {
    return (
      <React.Fragment>
        <Modal
          toggle={this.toggleModal}
          isOpen={this.props.modal}
          className="modal-dialog-centered"
        >
          <ModalHeader >
            {this.props.title}
          </ModalHeader>
          <ModalBody>
            {this.props.body}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleModal}>
              Close
            </Button>
            <Button color={this.props.buttonColor} onClick={this.props.onConfirm}>
              {this.props.buttonText}
            </Button>
          </ModalFooter>
        </Modal>
      </React.Fragment>
    )
  }
}
