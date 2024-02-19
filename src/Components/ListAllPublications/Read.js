import React, { useState, useEffect,} from 'react';
import axios from 'axios';
import styles from './Read.module.css';
import DeletePublication from '../Delete/Delete';
import Modal from '../Update/Update.Modal';
import UpdatePublication from '../Update/UpdatePublication';




const ReadPublications = () => {
    const [Publications, setPublications] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPublication, setCurrentPublication] = useState(null);
    const [modalIsOpen, setIsModalOpen] = useState(false);




useEffect(() => {
  fetchPublications();
}, []);

    const fetchPublications = async () => {
        try {
            const response = await axios.get("http://localhost:5041/api/publications");
            setPublications(response.data);
        }
        catch (error) {
            console.error("feil i hentinh av data");
        }

    };
    

const handleSuccess = () => {
  fetchPublications ();
}

const openModal = (publication) => {
  setCurrentPublication(publication);
  setIsModalOpen(true);
};

const closeModal = () => {
  setIsModalOpen(false);
  setCurrentPublication(null); // Reset current publication
};

const filterPublications = Publications.filter(publication =>
  publication.tittle.includes(searchQuery) || publication.contetn.includes(searchQuery));



return (

  <>
  <table className={styles.table}>
    <thead>
    <tr>
      <th>ID</th>
      <th>Title</th>
      <th>Discription</th>
      <th>Action</th>
    </tr>
    </thead>
    <tbody>
    {filterPublications.map((publication) => (
      <tr key={publication.id}>
        <td>{publication.id}</td>
        <td>{publication.tittle}</td>
        <td>{publication.contetn}</td>
        <td>
        <button className={styles.button}>Read</button>
        <button onClick={() => openModal(publication)}>Update</button>
          <DeletePublication
          publicationId={publication.id}
          onSuccess={handleSuccess}/>
        </td>
      </tr>
    ))
    }
    </tbody>
    </table> 

<Modal
isOpen={modalIsOpen}
onRequestClose={closeModal}
contentLabel="Update Publication"
>

{currentPublication && (
  <UpdatePublication
    publicationId={currentPublication.id}
    existingTitle={currentPublication.title}
    existingContent={currentPublication.content}
    onSuccess={closeModal} 
  />
)}
</Modal></>

  );
};

export default ReadPublications;