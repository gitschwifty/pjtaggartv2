import React from 'react';
import Modal from '@material-ui/core/Modal';

interface ModalCodeDisplayProps {
  open: boolean;
  closeModal: () => void;
}

class ModalCodeDisplay extends React.Component<ModalCodeDisplayProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Modal
        aria-labelledby='Code Display'
        aria-describedby='Modal Display of Code'
        open={this.props.open}
        onClose={this.props.closeModal}
        style={{
          overflow: 'scroll'
        }}
      >
        <div
          style={{
            width: '80%',
            margin: '80px auto',
            backgroundColor: '#f4f4f4',
            color: '#373737',
            overflow: 'scroll'
          }}
        >
          {this.props.children}
        </div>
      </Modal>
    );
  }
}

export default ModalCodeDisplay;
