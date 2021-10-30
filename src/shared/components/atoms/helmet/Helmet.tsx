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
    </Helmet>
  );
};

export default CommonHelmet;
