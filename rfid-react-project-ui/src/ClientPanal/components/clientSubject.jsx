import React from 'react';
import { useParams } from 'react-router-dom';
import ClientSubjectDetail from './clientSubjectDetails'; // Import the ClientSubjectDetail component

const ClientSubject = () => {
  const { subjectId, subjectName } = useParams(); // Access both subjectId and subjectName from the URL

  return (
    <div>
      {/* Pass subjectId and subjectName as props to ClientSubjectDetail */}
      <ClientSubjectDetail ct_id={subjectId} subject_name={decodeURIComponent(subjectName)} />
    </div>
  );
};

export default ClientSubject;
