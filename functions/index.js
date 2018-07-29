const functions = require('firebase-functions');
const admin = require('firebase-admin');
const bitcoin = require('./bitcoin');
const status = require('./const').verificationStatus;

admin.initializeApp();

exports.initializeUser = functions.auth.user().onCreate((user) => {
  const userId = user.uid;
  const { passphrase, public, private } = bitcoin.createWallet();

  return admin.database().ref(`users/${userId}`).set({
    public: {
      addresses: {
        btc: public
      },
      verificationStatus: status.new
    },
    private: {
      addresses: {
        btc: {
          passphrase,
          private
        }
      }
    }
  }).then(() => {
    console.log('Successfull');
  });
});
