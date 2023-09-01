import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setForm } from '../redux/actions';
import validator from 'validator';
import '../styles/Form.css';
import store from '../redux/store';

const FormComponent = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    email: '',
    message: '',
  });

  const [validity, setValidity] = useState({
    lastName: false,
    firstName: false,
    email: false,
    message: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validation logic
    let isValid = true;
    if (name === 'email') {
      isValid = validator.isEmail(value);
    } else {
      isValid = value.trim() !== '';
    }

    setValidity({
      ...validity,
      [name]: isValid,
    });
  };

  const allValid = Object.values(validity).every((v) => v);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setForm(formData));
    alert("Data is send to the Redux store");
    console.log(store.getState());
  }

  return (
    <form>
      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={formData.lastName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={formData.firstName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <textarea
        name="message"
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
      ></textarea>
      <button type="submit" disabled={!allValid} onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

export default FormComponent;