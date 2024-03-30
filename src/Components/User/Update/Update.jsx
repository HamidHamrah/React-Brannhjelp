import React, { useState, useEffect } from 'react';

function UserUpdateForm() {
  const [userData, setUserData] = useState({
    userName: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://localhost:7207/Auth/aboutme?email=hamidhamrah19%40gmail.com', {
          method: 'GET',
          // Add Authorization header if needed
          // headers: {
          //   Authorization: `Bearer ${yourAuthTokenHere}`,
          // },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData({ userName: data.userName, email: data.email });
      } catch (error) {
        setError('Failed to load user data');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://localhost:7207/Auth/update-user/${encodeURIComponent(userData.email)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // Add Authorization header if needed
          // Authorization: `Bearer ${yourAuthTokenHere}`,
        },
        body: JSON.stringify({
          userName: userData.userName,
          email: userData.email
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user');
      }

      alert('User updated successfully');
    } catch (error) {
      setError('Failed to update user');
      console.error('Error:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="userName">Name:</label>
        <input
          id="userName"
          name="userName"
          type="text"
          value={userData.userName}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={userData.email}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Update User</button>
    </form>
  );
}

export default UserUpdateForm;
