import axios from 'axios';

export const BASIC_AUTH = () => ({
  'Authorization': `Basic ${getUrl([
    'prod-key',
    'bXlpaHgtc3RhZ2U6MDgzMDc4ZTAtMzI3Yy0xMWViLWJiMjYtZTdjMTVlMTg0OWM2',
    'dGVsa29tOmRhMWMyNWQ4LTM3YzgtNDFiMS1hZmUyLTQyZGQ0ODI1YmZlYQ==',
  ])}`,
  'Accept-Language': 'id',
});

export default function fetch(url, method, param1, param2) {
  return new Promise((resolve, reject) => {
    axios[method](url, param1, param2)
      .then(res => resolve(res.data))
      .catch(err => {
        const defaultError = {
          code: 500,
          status: 'error',
          message: 'Failed to fetch data. Please contact developer.'
        };

        if (!err.response) {
          reject(defaultError);
        } else if (!err.response.data) {
          reject(defaultError);
        } else {
          reject(err.response.data);
        }
      });
  });
}

export function getUrl(urls) {
  const mode = process.env.MODE;

  if (mode === 'production') {
    return urls[0];
  }

  if (mode === 'staging') {
    return urls[1];
  }

  return urls[2];
}
