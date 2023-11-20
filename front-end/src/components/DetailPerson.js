// DetailPerson.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './Modal';
import './PersonForm.css';  

const DetailPerson = ({ nik, onClose }) => {
  const [person, setPerson] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/persons/${nik}`).then((response) => {
      setPerson(response.data);
    });
  }, [nik]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const containerStyle = {
    width: '400px',
  };

  return (
    <div className="form-container " style={containerStyle}>
      <h2>Aplikasi Data Pribadi</h2>
      <h5>Detail Data Pribadi</h5>
      {person ? (
        <form>
          <div className="form-group">
            <label>NIK:</label>
            <input type="text" value={person.nik} readOnly />
          </div>
          <div className="form-group">
            <label>Nama Lengkap:</label>
            <input type="text" value={person.namaLengkap} readOnly />
          </div>
          <div className="form-group">
            <label>Jenis Kelamin:</label>
            <div className="gender">
              <label>
                <input
                  type="radio"
                  name="jenisKelamin"
                  value="Laki-laki"
                  checked={person.jenisKelamin === 'Laki-laki'}
                  readOnly
                />
                Laki-laki
              </label>
              <label>
                <input
                  type="radio"
                  name="jenisKelamin"
                  value="Perempuan"
                  checked={person.jenisKelamin === 'Perempuan'}
                  readOnly
                />
                Perempuan
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>Tanggal Lahir:</label>
            <input type="text" value={formatDate(person.tanggalLahir)} readOnly />
          </div>
          <div className="form-group">
            <label>Alamat:</label>
            <input type="text" value={person.alamat} readOnly />
          </div>
          <div className="form-group">
            <label>Negara:</label>
            <input type="text" value={person.negara} readOnly />
          </div>
        </form>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default DetailPerson;
