import axios from 'axios';

const APIKit = axios.create({
  baseURL: 'https://todo.api.devcode.gethired.id',
});

export default APIKit;
