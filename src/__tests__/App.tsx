import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import jest from 'jest-mock';

import App from 'App';

jest.spyOn(global, 'fetch').mockImplementationOnce(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ data: 'Mock function' }),
  }) as Promise<Response>
);

describe('<App />', () => {
  beforeEach(async () => {
    window.history.pushState({}, 'Home', '/');
    await act(async () => {
      render(<App />);
    });
  });

  it('renders', async () => {
    await expect(screen.findByText(/To test an error case/i)).resolves.toBeInTheDocument();
  });

  it('shouldnt submit an empty form', async () => {
    await waitFor(() => userEvent.click(screen.getByText('Submit')));

    await expect(
      screen.findByText(/User name is required/i)
    ).resolves.toBeInTheDocument();
  });

  it('should change the username', async () => {
    const input = screen.getByPlaceholderText('User name') as HTMLInputElement;

    await act(async () => {
      userEvent.type(input, 'Sterling Archer');
    });

    await waitFor(() => {
      expect(input.value).toBe('Sterling Archer');
    });
  });

  it('should change the Tax ID', async () => {
    const input = screen.getByPlaceholderText('Tax Identifier') as HTMLInputElement;
    userEvent.type(input, '1234-GGG-XD');

    await waitFor(() => {
      expect(input.value).toBe('1234-GGG-XD');
    });
  });

  it('should have the is-invalid class when no username is provided', async () => {
    const input = screen.getByPlaceholderText('User name');
    userEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(input).toHaveClass('is-invalid');
    });
  });
});
