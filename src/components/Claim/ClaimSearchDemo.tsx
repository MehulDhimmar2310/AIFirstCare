import React from 'react';
import ClaimSearchInterface from './ClaimSearchInterface';
import { Hospital } from '../../types/claim.types';

const ClaimSearchDemo: React.FC = () => {
  // Mock hospital data
  const mockHospitals: Hospital[] = [
    { id: '1', name: 'Apollo Hospital', code: 'APL001' },
    { id: '2', name: 'Fortis Hospital', code: 'FRT002' },
    { id: '3', name: 'Manipal Hospital', code: 'MNL003' },
    { id: '4', name: 'Narayana Health', code: 'NRY004' },
    { id: '5', name: 'Max Healthcare', code: 'MAX005' },
    { id: '6', name: 'Medanta Hospital', code: 'MDT006' },
    { id: '7', name: 'Artemis Hospital', code: 'ART007' },
    { id: '8', name: 'BLK Hospital', code: 'BLK008' },
  ];

  return (
    <ClaimSearchInterface 
      hospitals={mockHospitals}
    />
  );
};

export default ClaimSearchDemo; 