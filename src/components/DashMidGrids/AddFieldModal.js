import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Header, Icon, Modal } from "semantic-ui-react";
import AddEditFarmModal from "../Page/AddEditFarmModal/AddEditFarmModal";
import { MdEdit } from "react-icons/md";
export default function AddFieldModal(props) {
  const [modalOpen, setModalOpen] = useState(false);

  const { name, color, icon } = props;
  const linkStyle = {
    color: color ? color : "white",
    textDecoration: "none",
  };
  const iconStyles = { height: "18px", marginRight: "10px" };
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);
  return (
    <Modal
      trigger={
        <Link
          style={linkStyle}
          onClick={() => {
            handleOpen();
          }}
        >
          {icon && <MdEdit style={iconStyles} />}
          {name}
        </Link>
      }
      open={modalOpen}
      onClose={handleClose}
      closeIcon
    >
      <Header>
        <Header.Content>Field Info</Header.Content>
        <Link
          onClick={() => {
            // setModalOpen(false);
            handleClose();
          }}
        >
          <Icon name="close" />
        </Link>
      </Header>

      {/* <Modal.Content scrolling> */}
      <AddEditFarmModal {...props} handleClose={handleClose} />

      {/* </Modal.Content> */}
    </Modal>
  );
}
