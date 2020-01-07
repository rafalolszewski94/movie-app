import apisauce from "apisauce";

const TOKEN = process.env.VUE_APP_API_KEY;

const request = apisauce.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${TOKEN}`
  }
});

export { request };
