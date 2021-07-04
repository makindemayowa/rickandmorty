import { render, waitFor } from '@testing-library/react';
import { IResponse, IRickAndMorty } from '../../types';
import RickAndMorty from '../RickAndMorty';

// https://github.com/jsdom/jsdom/issues/1695
window.HTMLElement.prototype.scrollIntoView = function() {};
const mockRick = {
    id: 'string',
    name: 'ricks mock name',
    status: 'string',
    species: 'string',
    type: 'string',
    gender: 'string',
    origin: {
        name: 'string',
        url: 'string',
    },
    location: {
        name: 'string',
        url: 'string',
    },
    image: 'string',
    episode: ['string'],
    url: 'string',
    created: 'string',
};

const setupSpy = (mockricks: IRickAndMorty[]) => {
    jest.spyOn(global, 'fetch').mockImplementation(() => Promise.resolve({json: jest.fn().mockReturnValue({
        results: mockricks,
        info: {
            count: 1,
            pages: 1,
            next: 'nexturl',
            prev: 'prevurl',
        }
    } as IResponse)} as any));
}

test('renders single card', async () => {
  setupSpy([mockRick])
  let tree: any;
  await waitFor(() => tree = render(<RickAndMorty />))
  const mockRickName = await tree.findAllByText(mockRick.name)
  expect(mockRickName.length).toBe(1)
});

test('renders multiple cards', async () => {
    setupSpy([mockRick, mockRick, mockRick])
    let tree: any;
    await waitFor(() => tree = render(<RickAndMorty />))
    const mockRickName = await tree.findAllByText(mockRick.name)
    expect(mockRickName.length).toBe(3)
});
