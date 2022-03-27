function submitToilet() {
  title = document.getElementById('title').value;
  ratings = document.getElementById('ratings').value;
  location = document.getElementById('location').value;
  review = document.getElementById('review').value;

  try {
    fetch(
      `http://127.0.0.1:8000/form_submit?location=${location}&title=${title}&text=${review}&rating=${ratings}`,
      {
        method: 'POST',
        body: data,
      }
    )
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        alert(JSON.stringify(data));
      });
  } catch (error) {
    console.log(error.message);
  }

  document.getElementById('title').value = '';
  document.getElementById('review').value = '';
  document.getElementById('ratings').value = '';
  document.getElementById('location').value = '';
}
