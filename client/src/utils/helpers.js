import { MB_TO_BYTE, VerificationStatus } from './const';
import { verificationStatus } from '../../../functions/const';
import axios from 'axios';

export const isValidFileSize = (file) => {
  if (!file || (file.size / MB_TO_BYTE) > 5) {
    return false;
  }

  return true;
};

export const getExtension = (filename) => {
  var parts = filename.split('.');
  return parts[parts.length - 1];
};

export const isImage = (filename) => {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'jpg':
    case 'jpeg':
    case 'png':
      return true;
  }

  return false;
};

export const isValidatedVerificationStatus = (current, next) => {
  console.log(current);
  console.log(next);
  switch (current) {
    case VerificationStatus.new:
      if (next === VerificationStatus.submitted) {
        console.log('vo 1');
        return true;
      }
      break;
    case VerificationStatus.submitted:
      if (next === VerificationStatus.rejected || next === verificationStatus.verified) {
        console.log('vo 2');
        return true;
      }
      break;
    case VerificationStatus.rejected:
      if (next === VerificationStatus.submitted) {
        console.log('vo 3');
        return true;
      }
      break;
    default:
      console.log('vo 4');
      return false;
  }

  console.log('ko vo');
  return false;
};

export const getBankInfo = (accountNumber) => {
  return axios({
    method: 'GET',
    url: `https://remitano.com/api/v1/fiat_bank_accounts?country_code=vn&bank_account_number=${accountNumber}`
  });
};
