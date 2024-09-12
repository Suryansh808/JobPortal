import { useEffect, useState } from 'react';

const HrProfile = () => {
  const [hrData, setHrData] = useState(null);
  const [error, setError] = useState(''); 

  useEffect(() => {
    // Fetch HR data when component mounts
    const fetchHrData = async () => {
      // Retrieve HRUser ID from local storage
      const hrUserId = localStorage.getItem('HRUser');
      if (!hrUserId) {
        setError('User not logged in');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/api/hr/profile/${hrUserId}`);
        const data = await response.json();

        if (response.ok) {
          setHrData(data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('An error occurred. Please try again.');
      }
    };

    fetchHrData();
  }, []);

  return (
    <div>
      <h1>Welcome to your profile</h1>
      {error && <p className="text-red-500">{error}</p>}
      {hrData ? (
        <div>
          <h2>Hello, {hrData.name}!</h2>
          <p>Email: {hrData.email}</p>
          {/* Add more fields as necessary */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HrProfile;
