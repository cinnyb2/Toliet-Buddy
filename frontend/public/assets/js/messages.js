function contactMe() {
  const BASE_URL = 'http://127.0.0.1:8000/send_mes?';
  phone_num = document.getElementById('phone_num').value;
  user_name = document.getElementById('user_name').value;
  loc = document.getElementById('loc').value;

  try {
    fetch(BASE_URL + `to_phone=${phone_num}&name=${user_name}&loc=${loc}`, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'no-cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      headers: {
        'Content-Type': 'application/json',
      },
      body: { phone_num, user_name, loc }, // body data type must match "Content-Type" header
    }).then(function (res) {
      alert("thanks for submitting! You'll get a message soon");
    });
  } catch (error) {
    console.log(error.message);
  }

  document.getElementById('phone_num').value = '';
  document.getElementById('user_name').value = '';
  document.getElementById('loc').value = '';
}
