import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import jest from 'jest-mock';

import Autocomplete from 'components/Autocomplete';

const countries = [
  { id: 'us', name: 'United States', },
  { id: 'ca', name: 'Canada', },
  { id: 'co', name: 'Colombia', },
  { id: 'ar', name: 'Argentina', },
  { id: 'uk', name: 'United Kingdom', },
  { id: 'sp', name: 'Spain', },
  { id: 'jp', name: 'Japan', },
  { id: 'ko', name: 'South Korea', },
  { id: 'eg', name: 'Egypt', },
  { id: 'ni', name: 'Nigeria', },
  { id: 'az', name: 'Australia', },
  { id: 'nz', name: 'New Zealand', },
];

describe('<Autocomplete />', () => {
  beforeEach(() => {
    act(() => {
      const mockFn = jest.fn((data) => { });
      render(<Autocomplete
        label="Mock Autocomplete"
        placeholder="Mock placeholder"
        suggestions={countries}
        setValue={mockFn}
      />);
    });
  });

  it('renders', async () => {
    const input = await screen.findByPlaceholderText(/Mock placeholder/i);
    expect(input).toBeInTheDocument();
  });

  it('typing existing countries should show suggestions', async () => {
    const input = await screen.findByPlaceholderText(/Mock placeholder/i);
    act(() => {
      userEvent.type(
        input,
        "Uni"
      );
    });

    const items = await screen.findAllByText(/ted States/i);
    expect(items.length).toBeGreaterThan(0);
  });

  it('typing non existing countries should show no suggestions', async () => {
    const input = await screen.findByPlaceholderText(/Mock placeholder/i);
    act(() => {
      userEvent.type(
        input,
        "Per"
      );
    });

    const noItems = await screen.findAllByText(/No suggestions/i);
    expect(noItems.length).toBeGreaterThan(0);
  });

  // it('typing up and down the suggestions should switch the active element', async () => {
  //   let item, item2;

  //   act(async () => {
  //     const mockFn = jest.fn((data) => { });
  //     const { container } = render(<Autocomplete
  //       label="Mock Autocomplete"
  //       placeholder="Mock placeholder"
  //       suggestions={countries}
  //       setValue={mockFn}
  //     />);
  //     const input = await screen.findByPlaceholderText(/Mock placeholder/i);

  //     userEvent.type(
  //       input,
  //       "Uni"
  //     );

  //     item = await container.getElementsByClassName('suggestions--list');
  //     userEvent.type(input, '{ArrowDown}');
  //     item2 = await container.getElementsByClassName('suggestion-active');
  //   });


  //   expect(0).toBeGreaterThan(0);
  // });
});
