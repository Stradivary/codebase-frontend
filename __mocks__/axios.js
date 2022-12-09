export default {
  ...jest.requireActual('axios'),
  get: jest.fn(async () => ({ data: 'tes' })),
  post: jest.fn(async () => ({ data: 'tes' })),
  put: jest.fn(async () => ({ data: 'tes' })),
};
