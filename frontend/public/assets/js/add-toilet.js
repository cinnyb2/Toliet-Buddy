function addToilet() {
  const BASE_URL = 'http://127.0.0.1:8000/form_submit?';

  const title = document.getElementById('title').value;
  const ratings = document.getElementById('ratings').value;
  const location = document.getElementById('location').value;
  const review = document.getElementById('review').value;

  try {
    fetch(
      BASE_URL +
        `location=${location}&title=${title}&text=${review}&rating=${ratings}`,
      {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'no-cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        headers: {
          'Content-Type': 'application/json',
        },
        body: { location, title, review, ratings }, // body data type must match "Content-Type" header
      }
    ).then(function (res) {
      alert('Thanks for submitting!');
    });
  } catch (error) {
    console.log(error.message);
  }

  document.getElementById('title').value = '';
  document.getElementById('review').value = '';
  document.getElementById('ratings').value = '1';
  document.getElementById('location').value = '';
}
// async function addToilet(url = BASE_URL, data = {}) {
//   const response = await fetch(
//     url +
//       `location=${location}&title=${title}&text=${review}&rating=${ratings}`,
//     {
//       method: 'POST', // *GET, POST, PUT, DELETE, etc.
//       mode: 'cors', // no-cors, *cors, same-origin
//       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data), // body data type must match "Content-Type" header
//     }
//   );
//   return response.json(); // parses JSON response into native JavaScript objects
// }

// addToilet(BASE_URL, data).then((data) => {
//   alert(data);
//   document.getElementById('title').value = '';
//   document.getElementById('review').value = '';
//   document.getElementById('ratings').value = '';
//   document.getElementById('location').value = '';
// });
