const BASE_URL = 'http://127.0.0.1:8000/form_submit?';

const title = document.getElementById('title').value;
const ratings = document.getElementById('rating').value;
const location = document.getElementById('location').value;
const review = document.getElementById('review').value;

const data = {
  title: title,
  ratings: ratings,
  location: location,
  review: review,
};

async function submitToilet(url = BASE_URL, data = {}) {
  const response = await fetch(
    url +
      `location=${location}&title=${title}&text=${review}&rating=${ratings}`,
    {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    }
  );
  return response.json(); // parses JSON response into native JavaScript objects
}

submitToilet(BASE_URL, data).then((data) => {
  alert(data);
  document.getElementById('title').value = '';
  document.getElementById('review').value = '';
  document.getElementById('ratings').value = '';
  document.getElementById('location').value = '';
});
