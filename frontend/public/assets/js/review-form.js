function saveReview() {
    title = document.getElementById("title").value;
    review = document.getElementById("review").value;
    ratings = document.getElementById("ratings").value;

    const data = {
        title: title,
        ratings: ratings,
        review: review,
    };

    try {
        fetch(
            `http://127.0.0.1:8000/form_submit?location=${location}&title=${title}&text=${review}&rating=${ratings}`,
            {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "no-cors", // no-cors, *cors, same-origin
                cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data), // body data type must match "Content-Type" header
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

    document.getElementById("title").value = "";
    document.getElementById("review").value = "";
    document.getElementById("ratings").value = "1";
}

function displayCards(collection) {
    db.collection(collection)
        .get()
        .then((snap) => {
            //iterate through each doc
            snap.forEach((doc) => {
                if (doc.exists) {
                    let CardTemplate = document.getElementById("CardTemplate");
                    let newcard = CardTemplate.cloneNode(true);
                    newcard.querySelector(".card-title").innerHTML =
                        doc.data().reviewTitle;
                    newcard.querySelector(".card-location").innerHTML =
                        doc.data().location;
                    newcard.querySelector(".card-rating").innerHTML =
                        doc.data().rating;
                    newcard.querySelector(".card-content").innerHTML =
                        doc.data().reviewContent;
                    newcard.querySelector(".card-sentiment").innerHTML =
                        doc.data().sentiment[1] + " " + doc.data().sentiment[0];
                    document
                        .getElementById("review_container")
                        .appendChild(newcard);
                }
            });
        });
}
displayCards("reviews");
