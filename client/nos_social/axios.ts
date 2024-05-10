import axios from "axios";

export const makeRequest = axios.create({
    baseURL: 'http://nos-social.cb6uawesoga1.sa-east-1.rds.amazonaws.com',
    auth: {
        username: 'admin',
        password: 'e9Pd4ixme48JRv'
    },
    withCredentials: true
});
