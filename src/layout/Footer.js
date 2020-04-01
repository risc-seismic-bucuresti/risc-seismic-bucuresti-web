// npm
import React from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function FooterComponent() {
  return (
    <footer className="footer">
      <div className="container clearfix">
        <div className="float-left">
          <span className="text-muted">&copy; Risc Seismic Bucuresti, All rights reserved</span>
        </div>
        <div className="float-right">
          <Link to="/terms">
            <Button color="link">Termeni si Conditii</Button>
          </Link>
          <Link to="/privacy-policy">
            <Button color="link">Confidentialitate</Button>
          </Link>
        </div>
      </div>
    </footer>
  );
}