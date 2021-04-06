import React, { useState } from "react";
import ConfirmCancelModal from "./ConfirmCancelModal";

export default {
  title: "Confirm or Cancel modal",
  component: ConfirmCancelModal,
};

export const Default = () => {
  const [show, setShow] = useState(true);
  return (
    <ConfirmCancelModal
      show={show}
      handleClose={() => setShow(false)}
      handleSubmit={() => setShow(false)}
      body="Modal body text"
      label="modal label text"
    />
  );
};
