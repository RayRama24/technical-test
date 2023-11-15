import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PersonForm from './PersonForm';
import DetailPerson from './DetailPerson';
import UpdatePersonForm from './UpdatePersonForm'
import './PersonList.css';
import Modal from './Modal';

function formatDate(dateString) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function PersonList() {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchNik, setSearchNik] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [detailNik, setDetailNik] = useState(null);
  const [updateNik, setUpdateNik] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/persons').then((response) => {
      setPersons(response.data);
    });
  }, []);

  const handleAddClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleAddPersonToList = (newPerson) => {
    setPersons((prevPersons) => [...prevPersons, newPerson]);
  };

  const toggleForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  const handleDetail = (nik) => {
    console.log(`Detail clicked for NIK: ${nik}`);
    setDetailNik(nik);
    setShowDetailModal(true);
  };

  const toggleDetailModal = () => {
    setShowDetailModal((prevShowDetailModal) => !prevShowDetailModal);
  };

  const handleEdit = (nik) => {
    console.log(`Edit clicked for NIK: ${nik}`);
    setDetailNik(null); 
    setShowForm(false);
    setShowDetailModal(false);
    setUpdateNik(nik);
    setShowUpdateForm(true);
  };

  const handleUpdate = (updatedPerson) => {
    setPersons((prevPersons) =>
      prevPersons.map((person) =>
        person.nik === updatedPerson.nik ? updatedPerson : person
      )
    );
  };

  const handleDelete = async (nik) => {
    try {
      await axios.delete(`http://localhost:8080/api/persons/${nik}`);
      setPersons((prevPersons) => prevPersons.filter(person => person.nik !== nik));
      
      console.log(`Delete successful for NIK: ${nik}`);
    } catch (error) {
      console.error(`Error deleting for NIK: ${nik}`, error);
    }
  };

  const handleSearch = () => {
    axios.get('http://localhost:8080/api/persons', {
    params: {
      namaLengkap: searchName,
      nik: searchNik,
    },
  })
    .then((response) => {
      setPersons(response.data);
    })
    .catch((error) => {
      console.error('Error searching persons:', error);
    });
  };

  return (
    <div className="person-container">
         <h1>Aplikasi Data Pribadi</h1>
      <div className="header-section">
        <div className="input-group">
          <label htmlFor="searchName">Nama</label><br/>
          <input
            type="text"
            id="searchName"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label htmlFor="searchNik">NIK</label><br/>
          <input
            type="text"
            id="searchNik"
            value={searchNik}
            onChange={(e) => setSearchNik(e.target.value)}
          />
        </div>
      </div>
      <div className="input-button">
        <button className="search-btn" onClick={handleSearch}>Search</button>
        <button className="add-btn" onClick={handleAddClick}>Add</button>
      </div>

      {showForm && <PersonForm onClose={handleCloseForm} onAdd={handleAddPersonToList} />}

      <table className="person-table">
        <thead>
          <tr>
            <th>NIK</th>
            <th>Nama Lengkap</th>
            <th>Jenis Kelamin</th>
            <th>Tanggal Lahir</th>
            <th>Alamat</th>
            <th>Negara</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person) => (
            <tr key={person.nik}>
              <td>{person.nik}</td>
              <td>{person.namaLengkap}</td>
              <td>{person.jenisKelamin}</td>
              <td>{formatDate(person.tanggalLahir)}</td>
              <td>{person.alamat}</td>
              <td>{person.negara}</td>
              <td>
                <button className="detail-btn" onClick={() => handleDetail(person.nik)}>Detail</button>
                <button className="edit-btn" onClick={() => handleEdit(person.nik)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(person.nik)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    
      <Modal isOpen={showForm || showDetailModal || showUpdateForm} onClose={() => { setShowForm(false); setShowDetailModal(false); setShowUpdateForm(false); }}>
        {showForm && <PersonForm onClose={handleCloseForm} onAdd={handleAddPersonToList} />}
        {showDetailModal && <DetailPerson nik={detailNik} onClose={toggleDetailModal} />}
        {showUpdateForm && (
          <UpdatePersonForm
            onClose={() => setShowUpdateForm(false)}
            onUpdate={handleUpdate}
            nik={updateNik}
          />
        )}
      </Modal>

    </div>
  );
}

export default PersonList;
