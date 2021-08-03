import jest from "jest-mock";

export default {
  get: jest.fn().mockImplementation(() => Promise.resolve({data: { photos: { photo: ["data por default de __mocks__/axios.js"],} }})), //esta data se puede modificar en cada ejecucion luego con axios.get.mockImplementation() por ej;
  post: jest.fn().mockImplementation(() => Promise.reject("error papu")),
  put: jest.fn(),
};