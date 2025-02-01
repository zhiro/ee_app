import { render, screen, fireEvent } from '@testing-library/react';
import Consumption from '../Consumption'; // Adjust the import path as needed

test('renders year navigation when logged in', () => {
    // Mock the localStorage to simulate being logged in
    Storage.prototype.getItem = jest.fn(() => 'some-token'); // Simulate token being in localStorage

    render(<Consumption />);

    expect(screen.getByText(/current year/i)).toBeInTheDocument();
});

test('shows "please log in" message when not logged in', () => {
    Storage.prototype.getItem = jest.fn(() => null); // Simulate not being logged in

    render(<Consumption />);

    expect(screen.getByText(/please log in to the portal first/i)).toBeInTheDocument();
});
