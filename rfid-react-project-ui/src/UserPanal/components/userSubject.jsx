import React from 'react';
import { Outlet, useParams, useOutlet } from 'react-router-dom';
import UserSubjectDetail from './userSubjectDetails';

const UserSubject = () => {
  const { subjectId, subjectName } = useParams();
  const outlet = useOutlet(); // Check if an Outlet is present

  return (
    <div>
      {!outlet && (
        <UserSubjectDetail 
          ct_id={subjectId} 
          subject_name={decodeURIComponent(subjectName)} 
        />
      )}
      <Outlet />
    </div>
  );
};

export default UserSubject;
