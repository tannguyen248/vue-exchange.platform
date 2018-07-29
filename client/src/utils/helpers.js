import { MB_TO_BYTE } from './const';
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
