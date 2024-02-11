import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

jest.mock('lodash', () => ({
  throttle: (func: () => unknown) => func,
}));

describe('throttledGetDataFromApi', () => {
  const relativePath = '/posts/1';
  const responseData = { id: 1, title: 'Post Title' };

  beforeEach(() => {
    jest.useFakeTimers();
    (axios.create as jest.Mock).mockReturnValue(axios);
    (axios.get as jest.Mock).mockResolvedValue({ data: responseData });
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(axios.create).toHaveBeenCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);

    expect(axios.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(relativePath);

    expect(result).toEqual(responseData);
  });
});
