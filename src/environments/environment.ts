// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDChSgYhnAkbptwwDtxZ-MjyI1qQs5TtQ4',
    authDomain: 'acmeco-ece05.firebaseapp.com',
    databaseURL: 'https://acmeco-ece05.firebaseio.com',
    projectId: 'acmeco-ece05',
    storageBucket: 'acmeco-ece05.appspot.com',
    messagingSenderId: '133529170703'
  }
};
