import axios from 'axios';

const baseURL = import.meta.env.VITE_NEXT_PUBLIC_API_URL;

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

export class Unauthorized extends Error {
  constructor() {
    super('Unauthorized');
  }
}

export class NotFoundError extends Error {}

export class BadRequest extends Error {}

export interface ErrorResponse {
  message?: string;
 
}
