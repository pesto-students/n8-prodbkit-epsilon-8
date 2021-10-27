import React from 'react';
import { Helmet } from 'react-helmet';

const PAGE_TITLE = 'Home';

const LandingPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <meta name="Pro-DB Kit" content="Ninja 8 demo app" charSet="utf-8" />
        <title>{PAGE_TITLE}</title>
      </Helmet>
      <h3>{PAGE_TITLE}</h3>
    </>
  );
};

export default LandingPage;
