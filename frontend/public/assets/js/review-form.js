function displayCards(collection) {
    db.collection(collection)
        .get()
        .then((snap) => {
            //iterate through each doc
            snap.forEach((doc) => {
                if (doc.exists) {
                    let CardTemplate = document.getElementById("CardTemplate");
                    let newcard = CardTemplate.cloneNode(true);
                    newcard.id = "preview";
                    newcard.querySelector(".card-title").innerHTML =
                        doc.data().reviewTitle;
                    newcard.querySelector(".card-location").innerHTML =
                        "<b>Location: </b> " + doc.data().location;
                    newcard.querySelector(".card-rating").innerHTML =
                        "<b>Ratings: </b>" + doc.data().rating;
                    newcard.querySelector(".card-content").innerHTML =
                        "<b>Content: </b> " + doc.data().reviewContent;
                    newcard.querySelector(".card-sentiment").innerHTML =
                        "<b>Sentiment Analysis:</b> " +
                        doc.data().sentiment[1] +
                        " " +
                        doc.data().sentiment[0];
                    document
                        .getElementById("review_container")
                        .appendChild(newcard);
                }
            });
        });
}
displayCards("reviews");
