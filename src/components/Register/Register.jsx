import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useLogged } from '../../context/Logged';
import {useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate=useNavigate();
  const { logged, setLogged } = useLogged();
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      addresses: [{ value: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses',
  });


  const onSubmit = (data) => {
  console.log('Registration Data:', data);
  alert('Form submitted successfully!');
  console.log('email', data.email);

  const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

  const newUser = {
    email: data.email,
    password: data.password
  };

  existingUsers.push(newUser);

  localStorage.setItem('users', JSON.stringify(existingUsers));

  setLogged(true);
  navigate('/products');
};

  const password = watch('password');

  return (
    <div className="container mt-4">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="p-3 border rounded">

        {/* User Name */}
        <div className="mb-3">
          <label className="form-label">User Name</label>
          <input
            type="text"
            className="form-control"
            {...register('username', {
              required: 'User Name is required',
              validate: (value) => !/\s/.test(value) || 'User Name must not contain spaces',
            })}
          />
          {errors.username && <small className="text-danger">{errors.username.message}</small>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email format',
              },
            })}
          />
          {errors.email && <small className="text-danger">{errors.email.message}</small>}
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            {...register('password', {
              required: 'Password is required',
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/,
                message: 'Must include 1 Uppercase, 1 Number, 1 Special character',
              },
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && <small className="text-danger">{errors.password.message}</small>}
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            {...register('confirmPassword', {
              required: 'Confirm Password is required',
              validate: (value) => value === password || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword.message}</small>}
        </div>

        {/* Dynamic Address Fields (Optional) */}
        <div className="mb-3">
          <label className="form-label">Address(es) (Optional)</label>
          {fields.map((field, index) => (
            <div key={field.id} className="d-flex align-items-center mb-2">
              <input
                type="text"
                className="form-control me-2"
                placeholder={`Address ${index + 1}`}
                {...register(`addresses.${index}.value`)}
              />
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => remove(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-secondary btn-sm mt-2"
            onClick={() => append({ value: '' })}
          >
            Add Address
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">Register</button>

        {/* Dirty check */}
        {isDirty && (
          <p className="mt-3 text-warning">You have unsaved changes!</p>
        )}
      </form>
    </div>
  );
}
