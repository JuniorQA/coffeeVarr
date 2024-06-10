import React, { useState } from 'react';

const RegistrationForm: React.FC = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(0);
  const [experience, setExperience] = useState('');

  const handleRegistration = () => {
    // Обработка отправки формы
  };

  return (
    <form className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex flex-col">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-4 p-3 border border-gray-300 rounded-md"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 p-3 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        className="mb-4 p-3 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        className="mb-4 p-3 border border-gray-300 rounded-md"
      />
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="mb-4 p-3 border border-gray-300 rounded-md"
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(parseInt(e.target.value))}
        className="mb-4 p-3 border border-gray-300 rounded-md"
      />
      <input
        type="text"
        placeholder="Experience"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        className="mb-4 p-3 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        onClick={handleRegistration}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
