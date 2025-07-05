import axios from 'axios';

export const API_BASE_URL = 'http://localhost:8088/api';


export const loginUser = (email: string, password: string) => {
  return axios.post(`${API_BASE_URL}/login`, { email, password });
};

export const fetchHotels = () => {
  return axios.get(`${API_BASE_URL}/hotels/all`);
};

export const searchHotels = (location: string) => {
  return axios.get(`${API_BASE_URL}/hotels/search/${location}`);
};

export const bookHotel = (bookingData: any) => {
  return axios.post(`${API_BASE_URL}/bookings/add`, bookingData);
};

export const fetchBookings = () => {
  return axios.get(`${API_BASE_URL}/booking/all`);
};