import { IPricingData, IPricingDataObject } from './pricing.interface';

export const pricingDataObject: IPricingDataObject = {
  title: 'Deliver the experiences that your team needs now',
  subtitle: 'Pro DB kit scales for any organization — from startups to Fortune 500s.',
};

export const pricingData: IPricingData[] = [
  {
    type: 'Forever Free',
    pricePerMonth: '0',
    buttonText: 'Get started',
    summary: 'For small teams of people 1-5',
    listTitle: 'Features',
    features: [
      'Create upto 3 teams',
      'Manage upto 3 databases',
      'Add upto 3 members / team',
      'Create upto 30 database credentials for your users',
    ],
  },
  {
    type: 'Premium',
    pricePerMonth: '1000',
    buttonText: 'Try for free',
    summary: 'For business',
    listTitle: 'Features',
    features: [
      'Create upto 10 teams',
      'Manage upto 20 databases',
      'Add upto 10 members / team',
      'Create upto 200 database credentials for your users',
    ],
  },
  {
    type: 'Enterprise',
    pricePerMonth: '3000',
    buttonText: 'Try for free',
    summary: 'For businesses who have dedicated infrastructure teams',
    listTitle: 'Features',
    features: [
      'Create upto 30 teams',
      'Manage upto 100 databases',
      'Add upto 30 members / team',
      'Create upto 2000 database credentials for your users',
    ],
  },
];
