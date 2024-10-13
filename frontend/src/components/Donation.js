import React, { useState } from 'react';
import { donate } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Donation = ({ project, token }) => {
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  const handleDonation = async () => {
    const donationAmount = parseFloat(amount);
    if (isNaN(donationAmount) || donationAmount < 1) {
      alert('Please enter a valid donation amount of at least $1.');
      return;
    }

    try {
      await donate({ projectId: project._id, amount: donationAmount }, token);
      alert(`Donation of $${amount} successful!`);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Error donating, please try again.');
    }
  };

  return (
    <div>
      <h1>Donate to {project.name}</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
      />
      <button onClick={handleDonation}>Donate</button>
    </div>
  );
};

export default Donation;
