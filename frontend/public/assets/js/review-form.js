function saveReview() {
    //get user's changes
    title = document.getElementById("title").value;
    review = document.getElementById("review").value;
    ratings = document.getElementById("ratings").value;

    //console.log(title + review + ratings);
    try {
        db.collection("review")
            .add({
                reviewTitle: title,
                reviewContent: review,
                reviewRatings: ratings,
            })
            .catch((error) => {
                console.log(error.message);
            });
    } catch (error) {
        console.log(error.message);
    }
}
