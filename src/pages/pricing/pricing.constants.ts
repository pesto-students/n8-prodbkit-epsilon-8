import { IPricingData, IPricingDataObject } from './pricing.interface';

export const pricingDataObject: IPricingDataObject = {
  title: 'Deliver the apps your team needs now',
  subtitle: 'Pro DB kit scales for any organization — from startups to Fortune 500s.',
};

export const pricingData: IPricingData[] = [
  {
    type: 'Free',
    pricePerMonth: '0',
    buttonText: 'Get started',
    summary: 'For developers building apps, with no creator restrictions',
    listTitle: 'Features',
    features: [
      'Build unlimited apps (creator view only)',
      'Build apps on top of any database or API',
      'Write, share, and reuse queries with Query Library',
      'Reuse up to 5 modules (groups of components) across apps',
    ],
  },
  {
    type: 'Team',
    pricePerMonth: '1000',
    buttonText: 'Try for free',
    summary: 'For developers building apps, with no creator restrictions',
    listTitle: 'Features',
    features: [
      'Build unlimited apps (creator view only)',
      'Build apps on top of any database or API',
      'Write, share, and reuse queries with Query Library',
      'Reuse up to 5 modules (groups of components) across apps',
    ],
  },
  {
    type: 'Business',
    pricePerMonth: '3000',
    buttonText: 'Try for free',
    summary: 'For developers building apps, with no creator restrictions',
    listTitle: 'Features',
    features: [
      'Build unlimited apps (creator view only)',
      'Build apps on top of any database or API',
      'Write, share, and reuse queries with Query Library',
      'Reuse up to 5 modules (groups of components) across apps',
    ],
  },
];
