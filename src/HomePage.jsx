import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    state: "",
    city: "",
    country: "",
  });

  const [locationData, setLocationData] = useState({
    country: "",
    city: "",
    state: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  const apiToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJtdWhhbW1hZHJpendhbnRhaGlyMjNAZ21haWwuY29tIiwiYXBpX3Rva2VuIjoiQ2lER3I2czBDZHdnVWxGMEVNcjMydDQtV2tIRjNHZ0Y0RGJaa2wyZ3Q0RmhzRDFwaENyN1VUZDBRUEdVbXRyUVRVMCJ9LCJleHAiOjE3Mjc4MDg4NTN9._I4XYSfI8fsBvcitej1kVmwtdLxe7ArhYkkTyn_-Wyk";

  useEffect(() => {
    fetch("https://get.geojs.io/v1/ip/geo.json")
      .then((response) => response.json())
      .then((data) => {
        setLocationData({
          country: data.country,
          city: data.city,
          state: data.region,
        });
        fetchStates(data.country);
        fetchCities(data.region);
      })
      .catch((error) => console.error("Error fetching location data:", error));
  }, []);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      country: locationData.country,
      city: locationData.city,
      state: locationData.state,
    }));
  }, [locationData]);

  const fetchCountries = async () => {
    try {
      const response = await axios.get(
        `https://www.universal-tutorial.com/api/countries/`,
        {
          headers: { Authorization: `Bearer ${apiToken}` },
        }
      );
      setCountries(response.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (country) => {
    try {
      const response = await axios.get(
        `https://www.universal-tutorial.com/api/states/${country}`,
        {
          headers: { Authorization: `Bearer ${apiToken}` },
        }
      );
      setStates(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (state) => {
    try {
      const response = await axios.get(
        `https://www.universal-tutorial.com/api/cities/${state}`,
        {
          headers: { Authorization: `Bearer ${apiToken}` },
        }
      );
      setCities(response.data);
      // console.log(response.data);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleChange = (name, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "country") {
      const selectedCountry = countries.find(
        (country) => country.country_name === value
      );
      if (selectedCountry) {
        setFormData((prevState) => ({
          ...prevState,
          state: "",
          city: "",
        }));
        fetchStates(selectedCountry.country_name);
      }
    } else if (name === "state") {
      fetchCities(value);
      setFormData((prevState) => ({
        ...prevState,
        city: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isCountryValid = countries.some(
      (country) => country.country_name == formData.country
    );
    const isStateValid = states.some(
      (state) => state.state_name == formData.state
    );
    // console.log(states);
    const isCityValid = cities.some((city) => city.city_name == formData.city);
    if (!isCountryValid) {
      alert("Please select a valid country from the list.");
      return;
    }
    if (!isStateValid) {
      alert("Please select a valid state from the list.");
      return;
    }
    if (!isCityValid) {
      alert("Please select a valid city from the list.");
      return;
    }

    // navigate(`/universities?country=${formData.country}`);
    navigate(`/schools/${formData.country}`);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
      <ToastContainer />
      <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-lg my-5">
        <h1 className="text-3xl font-bold mb-5 text-center text-gray-800">
          School Finder
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-600">Country</label>
            <input
              list="country-list"
              name="country"
              value={formData.country}
              onChange={(e) => handleChange("country", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <datalist id="country-list">
              {countries.map((country) => (
                <option
                  key={country.country_name}
                  value={country.country_name}
                />
              ))}
            </datalist>
          </div>
          <div>
            <label className="block mb-1 text-gray-600">State/Province</label>
            <input
              list="state-list"
              name="state"
              value={formData.state}
              onChange={(e) => handleChange("state", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <datalist id="state-list">
              {states.map((state) => (
                <option key={state.state_name} value={state.state_name} />
              ))}
            </datalist>
          </div>
          <div>
            <label className="block mb-1 text-gray-600">City</label>
            <input
              list="city-list"
              name="city"
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <datalist id="city-list">
              {cities.map((city) => (
                <option key={city.city_name} value={city.city_name} />
              ))}
            </datalist>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
