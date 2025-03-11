import React from 'react';
import { useParams } from 'react-router-dom';
const SubjectUserList = () => {
    const { ct_id } = useParams(); // Access ct_id from URL params

    // Decode the ct_id if it was encoded
    const decodedCtId = decodeURIComponent(ct_id);
  
    console.log(decodedCtId); // You can use the decoded ct_id here
    return (
      <div>
       <h1>{decodedCtId}</h1>
      </div>
    );
};

export default SubjectUserList;
