// SubjectDetail.jsx
import React from 'react';

const ClientSubjectDetail = ({ ct_id, subject_name }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold">Subject Details</h2>
      <p className="mt-4">
        <strong>Subject Name: </strong> {subject_name}
      </p>
      <p className="mt-2">
        <strong>Subject ID (ct_id): </strong> {ct_id}
      </p>
    </div>
  );
};

export default ClientSubjectDetail;
