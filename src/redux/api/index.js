const baseUrl =
  "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices";

export default (url, method, body, headers) =>
  fetch(baseUrl + url, {
    method,
    ...body,
    headers: {
      "x-rapidapi-host":
        "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com",
      "x-rapidapi-key": "c3e14d75a3msh2a179812f3c3fb8p1d23b4jsn88ced071135a",
      ...headers
    }
  })
  .then(response => response.json())
  .then(results => results)
  .catch(error => error);
