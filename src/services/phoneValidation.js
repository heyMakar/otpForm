import axios from 'axios';

export default class NexmoValidation {
  async makeRequest(number) {
    const url = `http://localhost:5000/auth/?number=${number}`;
    const res = await axios.get(url)
      .then(res => res.data);
    return res;
  }

  async checkRequest(id, code) {
    const url = `http://localhost:5000/validate/?id=${id}&code=${code}`;
    const res = await axios.get(url)
      .then(res => res.data);
    return res;
  }
};