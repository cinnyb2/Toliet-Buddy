function saveReview() {
    title = document.getElementById("title").value;
    review = document.getElementById("review").value;
    ratings = document.getElementById("ratings").value;

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

    document.getElementById("title").value = "";
    document.getElementById("review").value = "";
    document.getElementById("ratings").value = "1";
}
