import SignUpForm from "./SignUpForm";
import { useState } from "react";
import { Modal } from "../../context/modal";

const SignUpModal = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div onClick={() => setShowModal(true)} className="button">
        Sign Up
      </div>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm />
        </Modal>
      )}
    </>
  );
};

export default SignUpModal;
