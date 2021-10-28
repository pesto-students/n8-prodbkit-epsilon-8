import favIcon from 'assets/logo.png';
import React from 'react';
import { Helmet } from 'react-helmet';
interface ICommonHelmet {
  title: string;
}
const CommonHelmet: React.FC<ICommonHelmet> = ({ title }: { title: string }) => {
  return (
    <Helmet>
      <meta name="Pro-DB Kit" content="Ninja 8 demo app" charSet="utf-8" />
      <title>{title}</title>
      <link rel="icon" type="image/png" href={favIcon} sizes="16*16" />
    </Helmet>
  );
};

export default CommonHelmet;
