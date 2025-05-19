import React from 'react';
import PatientSidebar from './PatientSidebar';

const PatientDashboard = () => (
  <div style={{ display: 'flex' }}>
    <PatientSidebar activeKey="dashboard" />
    <div style={{ flex: 1, padding: 24 }}>
      {/* Add dashboard widgets/components here */}
      <h2>Welcome to your dashboard!</h2>
    </div>
  </div>
);

export default PatientDashboard;