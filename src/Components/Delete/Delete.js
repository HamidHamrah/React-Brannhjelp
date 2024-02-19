import React from 'react';
import axios from 'axios';
import styles from './Delete.module.css';


const DeletePublication = ({ publicationId, onSuccess}) => {
    const handleDelete = async () => {
        try{
            await axios.delete(`http://localhost:5041/api/publications/${publicationId}`);
            console.log("Publication Deleted");
            alert("Publication Deleted");

            if (onSuccess){
                onSuccess();
            }
        }
        catch (error){
            console.log("Delete Failed");
            alert("Delete Failed")
        }
       
    };

    return (
         
            <button onClick={handleDelete} className={styles.deleteButton}>
                Delete
            </button>
    
        
    );


};
export default DeletePublication;