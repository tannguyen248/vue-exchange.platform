const bitcoin = require('bitcoinjs-lib');
const bigi = require('bigi');
const bip39 = require('bip39');

const network = bitcoin.networks.bitcoin;

function generateAddressFromSHA256Hash(passphrase) {
  let hash = bitcoin.crypto.sha256(passphrase);
  let d = bigi.fromBuffer(hash);
  let keyPair = new bitcoin.ECPair(d, null, { network: network });

  return {
    private: keyPair.toWIF(),
    public: keyPair.getAddress(),
    mnemonic
  };
}

exports.createBitcoinWallet = () => {
  var mnemonic = bip39.generateMnemonic() + ' ' + Date.now();
  return generateAddressFromSHA256Hash(mnemonic);
}
