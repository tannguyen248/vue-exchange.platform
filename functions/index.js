const functions = require('firebase-functions');
const admin = require('firebase-admin');
const createBitcoinWallet = require('./bitcoin');

admin.initializeApp();

exports.generateAddresses = functions.auth.user().onCreate((user) => {
  const userId = user.uid;
  const btc = createBitcoinWallet();
  const { mnemonic, address, private } = btc;

  return admin.database().ref(`users/${userId}`).set({
    public: {
      addresses: {
        btc: {
          main: address,
        }
      }
    },
    private: {
      addresses: {
        btc: {
          mnemonic,
          main: private
        }
      }
    }
  }).then(() => {
    console.log('Successfull');
  });
});
