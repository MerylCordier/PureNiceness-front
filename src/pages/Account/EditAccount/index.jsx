/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import './index.css';
import { useState } from 'react';
import CrudModal from '../../../components/Common/Modal/CrudModal';
import EditAccountForm from '../../../components/Common/Forms/EditAccountForm';

function EditAccount({
  accountDetails, setAccountDetails, userId, handleClose,
}) {
  const [modalTitle] = useState('METTRE A JOUR LE COMPTE');
  // apply specific css to the modal
  const [modalMode] = useState('update-user');
  // Function to handle keyboard events
  // const handleKeyDown = (e) => {
  //   if (e.key === 'Enter' || e.key === ' ') {
  //     handleOpenModal();
  //   }
  // };
  // pas de rerender si la modal a déjà été ouverte puis fermée

  // if no userId or userId = main administrator, don't show the edit-account div
  if ((!userId) || parseInt(userId, 10) === 1) {
    return null;
  }

  return (
    <CrudModal handleClose={handleClose} title={modalTitle} mode={modalMode}>
      <EditAccountForm
        accountDetails={accountDetails}
        setAccountDetails={setAccountDetails}
        userId={userId}
      />
    </CrudModal>
  );
}

export default EditAccount;
