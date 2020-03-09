import React from 'react';
import { CookieBanner } from '@palmabit/react-cookie-law';
import './cookie.scss';

const CookieConsent = () => {
  return (
    <>
      <CookieBanner
        className="cookie-banner"
        privacyPolicyLinkText="Confidentialitate"
        message="This site or third party tools used by this site makes use of cookies necessary for the operation and are useful for the purposes outlined in the privacy policy. To learn more, see the privacy policy. By accepting you consent to the use of cookies."
        onAccept = {() => {}}
        onAcceptPreferences = {() => {}}
        onAcceptStatistics = {() => {}}
        onAcceptMarketing = {() => {}}
      />
    </>
  );
};

export default CookieConsent;