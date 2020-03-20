import React from 'react';
import { CookieBanner } from '@palmabit/react-cookie-law';
import './cookie.scss';

const CookieConsent = () => {
  return (
    <>
      <CookieBanner
        className="cookie-banner"
        privacyPolicyLinkText="Confidentialitate"
        message="Folosim Tehnologii de tip Cookie ce permit stocarea de informații și/sau obținerea accesului la informația stocată în dispozitivul dumneavoastră pentru a permite website-ului să funcționeze, pentru a personaliza conținutul și anunțurile publicitare, pentru a vă oferi funcționalități aferente rețelelor de socializare și pentru a analiza traficul. Prin click pe ACCEPT, acceptați folosirea tuturor Tehnologiilor de tip Cookie."
        onAccept = {() => {}}
        onAcceptPreferences = {() => {}}
        onAcceptStatistics = {() => {}}
        onAcceptMarketing = {() => {}}
      />
    </>
  );
};

export default CookieConsent;