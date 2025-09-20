
import axios from 'axios';

// export const api_key = 'af82df531cae137175012d5908d26289'
export const api_key='dc95bb550645e2b99fa09c6bb09e9682'
export const access_token ='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzk1YmI1NTA2NDVlMmI5OWZhMDljNmJiMDllOTY4MiIsIm5iZiI6MTc1ODM3NDgzNS4wMDQ5OTk5LCJzdWIiOiI2OGNlYWJiMzQ4MTNkYjEwY2ZmZThkNzEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.gFhCaKyu_nGNyCVlph6bexdl-IukT1AJdL3YESXS9ks'
export const ApiInstance = axios.create({
	baseURL: 'https://api.themoviedb.org/3',
	timeout: 15000,
	headers: {
		Accept: 'application/json',
		Authorization: access_token
	},
});