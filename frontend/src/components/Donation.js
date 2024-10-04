import React, { useState } from 'react';
import { donate } from '../services/api';

const Donations = ({ project }) => {
  const [amount, setAmount] = useState('');

  const handleDonation = async () => {
    try {
      await donate({ projectId: project._id, amount: parseFloat(amount) });
      alert(`Donation of $${amount} successful!`);
    } catch (error) {
      console.error(error);
      alert('Error donating, please try again.');
    }
  };

  return (
    <div>
      <h3>Donate to {project.name}</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={handleDonation}>Donate</button>
    </div>
  );
};

export default Donations;
