function saveReview() {
  title = document.getElementById('title').value;
  review = document.getElementById('review').value;
  ratings = document.getElementById('ratings').value;

  try {
    fetch(
      `/form_submit?location=${location}&title=${title}&text=${review}&rating=${ratings}`,
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
  document.getElementById('ratings').value = '1';
}
