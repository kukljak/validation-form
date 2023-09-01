import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import reducer from '../../redux/reducer';
import FormComponent from '../../components/Form';

const store = configureStore({
  reducer
});

const mockDispatch = jest.fn();
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

// Mock Alert
global.alert = jest.fn();

describe('FormComponent', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <FormComponent />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders form inputs correctly', () => {
    expect(screen.getByPlaceholderText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Message/i)).toBeInTheDocument();
  });

  test('should disable the submit button if form is invalid', () => {
    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).toBeDisabled();
  });

  test('should enable the submit button if form is valid', () => {
    const lastNameInput = screen.getByPlaceholderText(/Last Name/i);
    const firstNameInput = screen.getByPlaceholderText(/First Name/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const messageInput = screen.getByPlaceholderText(/Message/i);
    
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@gmail.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello, World!' } });
    
    const submitButton = screen.getByRole('button', { name: /Submit/i });

    expect(submitButton).not.toBeDisabled();
  });


  test('check form submission', () => {
    const lastNameInput = screen.getByPlaceholderText(/Last Name/i);
    const firstNameInput = screen.getByPlaceholderText(/First Name/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const messageInput = screen.getByPlaceholderText(/Message/i);

    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@gmail.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello, World!' } });

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    expect(submitButton).not.toBeDisabled();
    fireEvent.click(submitButton);

    expect(alert).toHaveBeenCalledWith('Data is send to the Redux store');
    // Check if the alert is called and other expectations like Redux store updates
  });

  test('check form submission and alert', async () => {
    const lastNameInput = screen.getByPlaceholderText(/Last Name/i);
    const firstNameInput = screen.getByPlaceholderText(/First Name/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const messageInput = screen.getByPlaceholderText(/Message/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i });

    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@gmail.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello, World!' } });

    fireEvent.click(submitButton);

    expect(mockDispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'SET_FORM_DATA',
        payload: {
          lastName: 'Doe',
          firstName: 'John',
          email: 'john.doe@gmail.com',
          message: 'Hello, World!',
        },
      })
    );

    expect(alert).toHaveBeenCalledWith('Data is send to the Redux store');
  });
});
