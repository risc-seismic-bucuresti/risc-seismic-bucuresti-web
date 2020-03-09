import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import Terms from '../components/static/Terms';
import Privacy from '../components/static/Privacy';

const Footer = () => {

  const [termsModal, settermsModal] = useState(false);
  const [privacyModal, setprivacyModal] = useState(false);

  const toggleTerms = () => settermsModal(!termsModal);
  const togglePrivacy = () => setprivacyModal(!privacyModal);

  return (
    <footer className="footer">
      <div className="container clearfix">
        <div className="float-left">
          <span className="text-muted">&copy; Risc Seismic Bucuresti, All rights reserved</span>
        </div>
        <div className="float-right">
          <Button color="link" onClick={toggleTerms}>Termeni si Conditii</Button>
          <Button color="link" onClick={togglePrivacy}>Confidentialitate</Button>
        </div>
      </div>
      {/* TODO: Terms and Policy need to have their own static pages */}
      <Modal isOpen={termsModal} toggle={toggleTerms} size="lg">
        <ModalHeader toggle={toggleTerms}>Termeni si Conditii</ModalHeader>
        <ModalBody>
          <Terms />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleTerms}>Close</Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={privacyModal} toggle={togglePrivacy} size="lg">
        <ModalHeader toggle={togglePrivacy}>Confidentialitate</ModalHeader>
        <ModalBody>
          <Privacy />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={togglePrivacy}>Close</Button>
        </ModalFooter>
      </Modal>
    </footer>
  );
};

export default Footer;