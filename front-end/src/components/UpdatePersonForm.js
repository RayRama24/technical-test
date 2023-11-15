import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import './PersonForm.css';

const countries = ['Indonesia', 'Malaysia', 'Singapore'];

const UpdatePersonForm = ({ onClose, onUpdate, nik }) => {
  const [formData, setFormData] = useState({
    nik: '',
    namaLengkap: '',
    jenisKelamin: '',
    tanggalLahir: '',
    alamat: '',
    negara: countries[0],
  });

  useEffect(() => {
    axios.get(`http://localhost:8080/api/persons/${nik}`)
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching person data:', error);
      });
  }, [nik]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    axios.put(`http://localhost:8080/api/persons/${nik}`, formData)
      .then(() => {
        onUpdate(formData);
        onClose();
      })
      .catch((error) => {
        console.error('Error updating person:', error);
      });
  };

  return (
    <div className="form-container">
      <h2>Aplikasi Data Pribadi</h2>
      <h5>Edit Data Pribadi</h5>
      <form>
        <label>
          NIK:
          <input
            type="text"
            name="nik"
            value={formData.nik}
            onChange={handleChange}
            readOnly
          />
        </label>
        <label>
          Nama Lengkap:
          <input
            type="text"
            name="namaLengkap"
            value={formData.namaLengkap}
            onChange={handleChange}
          />
        </label>
        <label>
          Jenis Kelamin:
          <div className="gender">
            <label>
              <input
                type="radio"
                name="jenisKelamin"
                value="Laki-laki"
                checked={formData.jenisKelamin === 'Laki-laki'}
                onChange={handleChange}
              />
              Laki-laki
            </label>
            <label>
              <input
                type="radio"
                name="jenisKelamin"
                value="Perempuan"
                checked={formData.jenisKelamin === 'Perempuan'}
                onChange={handleChange}
              />
              Perempuan
            </label>
          </div>
        </label>
        <label>
          Tanggal Lahir:
          <input
            type="date"
            name="tanggalLahir"
            value={formData.tanggalLahir}
            onChange={handleChange}
          />
        </label>
        <label>
          Alamat:
          <textarea
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            style={{ display: 'block', width: '100%', height: '100px' }}
          />
        </label>
        <label>
          Negara:
          <select
            name="negara"
            value={formData.negara}
            onChange={handleChange}
          >
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </label>
      </form>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default UpdatePersonForm;
