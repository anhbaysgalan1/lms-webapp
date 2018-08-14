import React, { Component } from 'react';
import {
  Modal, ModalBody, ModalHeader, ModalFooter, Button,
} from 'reactstrap';
import { connect } from 'react-redux';
import { closePopup } from 'actions/popup';
import PropTypes from 'prop-types';

class Popup extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { popupReducer, closePopup: ClosePopup } = this.props;
    const header = popupReducer.header ? popupReducer.header : 'Delete';
    const prompt = popupReducer.prompt ? popupReducer.prompt : 'Do you want to delete?';
    const yesColor = popupReducer.yesColor ? popupReducer.yesColor : 'danger';
    const noColor = popupReducer.noColor ? popupReducer.noColor : 'secondary';
    const noCallBack = popupReducer.noCallBack ? popupReducer.noCallBack : ClosePopup;
    const { yesCallBack } = popupReducer;
    return (
      <Modal isOpen={popupReducer.isOpen} toggle={ClosePopup}>
        <ModalHeader>
          { header }
        </ModalHeader>
        <ModalBody>
          { prompt }
        </ModalBody>
        <ModalFooter>
          <Button color={noColor} onClick={noCallBack}>
No
          </Button>
          <Button
            color={yesColor}
            onClick={() => {
              yesCallBack();
              ClosePopup();
            }}
          >
                Yes
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

Popup.propTypes = {
  popupReducer: PropTypes.shape({
    header: PropTypes.string,
    isOpen: PropTypes.bool,
    noCallBack: PropTypes.bool,
    prompt: PropTypes.string,
  }).isRequired,
  closePopup: PropTypes.func.isRequired,
};


function mapReducerToState(state) {
  return { popupReducer: state.popupReducer };
}

const actions = {
  closePopup,
};

export default connect(mapReducerToState, actions)(Popup);
