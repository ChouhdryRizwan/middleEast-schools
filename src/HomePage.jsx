import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const HomePage = () => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("");

  const middleEastCountries = [
    "All",
    "United Arab Emirates",
    "Qatar",
    "Saudi Arabia",
    "Kuwait",
    "Oman",
    "Bahrain",
    "Jordan",
    "Lebanon",
    "Iraq",
    "Israel",
    "Iran",
    "Palestinian",
    "Yemen",
  ];

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const countryExists = middleEastCountries.some(
      (country) => country.toLowerCase() == selectedCountry.toLowerCase()
    );

    if (countryExists || selectedCountry === "All") {
      navigate(`/schools/${selectedCountry}`);
    } else {
      alert(
        "Error: The selected country is not in the Middle East list. Please choose a valid country."
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-blue-500 p-4">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
        Schools in Middle East
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 md:p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">
          Select Country
        </h2>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="region-select"
          >
            Region
          </label>
          <input
            id="region-select"
            className="w-full py-2 px-3 border rounded"
            value="Middle East"
            disabled
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="country-input"
          >
            Country
          </label>
          <Select
            options={middleEastCountries.map((country) => ({
              value: country,
              label: country,
            }))}
            isClearable
            onChange={handleCountryChange}
          />

          {/* <input
            list="countries"
            id="country-input"
            className="w-full py-2 px-3 border rounded"
            placeholder="Select or type a country"
            onChange={handleCountryChange}
          />
          <datalist id="countries">
            {middleEastCountries.map((country, index) => (
              <option key={index} value={country} />
            ))}
          </datalist> */}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full hover:bg-blue-700"
        >
          View Schools
        </button>
      </form>
    </div>
  );
};

export default HomePage;
