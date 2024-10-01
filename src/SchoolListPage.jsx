import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SchoolListPage = () => {
  const { country } = useParams();
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch('/schools_data.json')
      .then((response) => response.json())
      .then((data) => {
        if (country == 'All') {
          setSchools(data);
        } else {
          const filteredSchools = data.filter(
            (school) => school.country == country
          );
          setSchools(filteredSchools);
        }
      });
  }, [country]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">
        International Schools in {country === 'All' ? 'Middle East' : country.replace('-', ' ').toUpperCase()}
      </h1>
      <p className="text-xl mb-4">Schools Found: {schools.length}</p>
      {schools.length ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schools.map((school, index) => (
          <li key={index} className="bg-white p-4 rounded shadow flex justify-between items-center">
            {/* Left side: Text content */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{school.name}</h3>
              <p className="text-gray-700">Country: {school.country}</p>
              <p className="text-blue-500">City: {school.city}</p>
            </div>
      
            {/* Right side: Image */}
            <div className="ml-4">
              <img src={school.logo} alt={school.name} className="w-24 h-24 object-contain" />
            </div>
          </li>
        ))}
      </ul>
      
      ) : (
        <p className="text-red-500">No schools found for the selected country.</p>
      )}
    </div>
  );
};

export default SchoolListPage;