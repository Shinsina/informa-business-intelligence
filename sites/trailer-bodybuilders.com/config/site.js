const navigation = require('./navigation');
const dragonForms = require('./dragon-forms');

module.exports = {
  company: 'Endeavor Business Media, LLC',
  navigation,
  dragonForms,
  identityX: {
    enabled: true,
    appId: '5df0e9d605aa5635d243fc3f',
  },
  homePageSections: [
    { alias: 'trailers', name: 'Trailers' },
    { alias: 'truck-bodies', name: 'Truck Bodies' },
    { alias: 'trailer-output', name: 'Trailer Output' },
  ],
  logos: {
    navbar: {
      src: 'https://img.trailer-bodybuilders.com/files/base/ebm/trailer-bodybuilders/image/static/trailer-bodybuilders-logo.png?h=30',
      srcset: [
        'https://img.trailer-bodybuilders.com/files/base/ebm/trailer-bodybuilders/image/static/trailer-bodybuilders-logo.png?h=60 2x',
      ],
    },
    footer: {
      src: 'https://img.trailer-bodybuilders.com/files/base/ebm/trailer-bodybuilders/image/static/trailer-bodybuilders-logo.png?h=45',
      srcset: [
        'https://img.trailer-bodybuilders.com/files/base/ebm/trailer-bodybuilders/image/static/trailer-bodybuilders-logo.png?h=90 2x',
      ],
    },
  },
  socialMediaLinks: [
    { provider: 'facebook', href: 'https://www.facebook.com/trailerbodybuilders/', target: '_blank' },
    { provider: 'twitter', href: 'https://twitter.com/trailerbb', target: '_blank' },
  ],
  gam: {
    accountId: process.env.GAM_ACCCOUNT_ID || '3834',
    basePath: 'trailerbody.home',
    lazyLoad: {
      enabled: true, // set to true to enable lazy loading
      fetchMarginPercent: 100, // fetch ad when one viewport away
      renderMarginPercent: 50, // render ad when half viewport away
      mobileScaling: 2, // double these on mobile
    },
  },
  gtm: {
    containerId: 'GTM-NM9N92D',
  },
  algolia: {
    applicationId: '80YJALCHBD',
    searchApiKey: '54e907df9d8e8e66dbaf63ac1938c740',
  },
  wufoo: {
    userName: 'cygnuscorporate',
  },
  newsletterSubscribeLink: dragonForms.getFormUrl('newsletterSubscribe'),
};
