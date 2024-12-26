import axios from 'axios';

const API_URL = 'http://localhost:5000/api/posts'; // URL API lokal

// Fungsi untuk mengambil data
export const fetchData = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Fungsi untuk menambahkan data
export const addData = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

// Fungsi untuk mengedit data
export const updateData = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

// Fungsi untuk menghapus data
export const deleteData = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
