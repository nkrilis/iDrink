var drinkName = $("#drink-search");
var searchGenre = $("option");
var searchButton = $("#searchButton");
var nameDrink = $("#nameDrink");
var ul = $("#ingredientList");
var instruction = $("#instructions");
var drinkPic = $("#drinkPic");
var drinkLink = $("#drinkLink");
var movieTitle = $("#movie-title");
var movieLink = $("#movie-link");
var moviePic = $("#movie-pic");
var movieArea = $("#resultMovie");

function fetchDrink(event) {
    console.log(drinkName.val());

    var apiUrl =
        "https://thecocktaildb.com/api/json/v1/1/search.php?s=" +
        drinkName.val();

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    // When the user enters nothing hide the display areas
                    if (data.drinks === null || drinkName.val() === "") {
                        $("#resultDrink").attr("hidden", true);
                        $("#resultMovie").attr("hidden", true);

                        //if fetch drink is empty show modal
                        modal.style.display = "block";
                    }
                    // When the user enters valid search display the info areas
                    // and call display function
                    else {
                        $("#resultDrink").attr("hidden", false);
                        $("#resultMovie").attr("hidden", false);

                        modal.style.display = "none";
                        //data contains object
                        $([document.documentElement, document.body]).animate(
                            {
                                scrollTop: $("#resultDrink").offset().top,
                            },
                            1000
                        );
                        displayDrink(data);
                    }
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect to Drink API");
        });
}

function displayDrink(data) {
    //the drink response data doesnt return ingredient pics but main pic yes

    nameDrink.text("");
    nameDrink.text(data.drinks[0].strDrink);

    //deleting any previous ingredient list with this while loop

    //add the instructions
    instruction.text("");
    instruction.text(data.drinks[0].strInstructions);

    // We add the ingredients as elements to html page here

    // Remove list elements before populating new list
    $("#ingredientList").empty();

    for (i = 1; i < 15; i++) {
        var ingredientNum = "strIngredient" + i;
        console.log(ingredientNum);

        //cant get it to get the ingredient from data object!
        var ingredient = data.drinks[0]["strIngredient" + i];
        var ingredientQuantity = data.drinks[0]["strMeasure" + i];

        if (ingredientQuantity === null || ingredientQuantity === "") {
            ingredientQuantity = "";
        }

        console.log(ingredient);
        if (!(ingredient == null || ingredient === "")) {
            ul.append($("<li>").append(ingredientQuantity + ingredient));
        } else {
            //last ingredient reached
            break;
        }
        console.log(ingredient);
    }

    //add the picture of the drink
    var urlPic = data.drinks[0].strDrinkThumb;
    console.log(urlPic);
    drinkPic.attr("src", urlPic);

    //add the link to button for youtube video
    var urlLink = data.drinks[0].strVideo;
    drinkLink.attr("href", urlLink);

    // Remove the link button if there is no link available
    if (urlLink != null) {
        drinkLink.removeAttr("style");
    }
}

function fetchMovie(event) {
    event.preventDefault();

    var genre = $("#genres option:selected").val();
    //here we got var genre with the drop down selection for genre
    //If user leaves on No Thanks wont find a random movie
    //check here if genre == no thanks

    fetch(
        "https://streaming-availability.p.rapidapi.com/search/basic?country=us&service=netflix&type=movie&genre=" +
            genre +
            "&page=1&output_language=en&language=en",
        {
            method: "GET",
            headers: {
                "x-rapidapi-host": "streaming-availability.p.rapidapi.com",
                "x-rapidapi-key":
                    "0bd12cf723mshf8adbb7d5152ad0p1ad045jsn4c9157f2f695",
            },
        }
    )
        .then(function (response) {
            if (response.ok) {
                console.log("-----------------" + response);
                response.json().then(function (data) {
                    console.log(data);
                    pickMovie(data);
                    //data contains object response
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        .catch(function (error) {
            alert("Unable to connect");
        });
}

function pickMovie(data) {
    //randomly pick a movie from the 8 movies in data
    var randomPick = Math.floor(Math.random() * 8);
    // we grab the random movie via data.results[randomPick].title
    var movieName = data.results[randomPick].title;
    var movieL = data.results[randomPick].streamingInfo.netflix.us.link;
    var moviePosterURL = data.results[randomPick].posterURLs.original;

    movieLink.attr("href", movieL);
    movieTitle.text(movieName);
    moviePic.attr("src", moviePosterURL);

    console.log(movieName);
    console.log(movieLink);
    console.log(moviePosterURL);
}

searchButton.on("click", function (event) {
    // What to do when no movie genre is selected
    if ($("#genres option:selected").val() === "0") {
        console.log($("#genres option:selected").val());
        $("#resultMovie").css("display", "none");
        $("#randomMovieLink").attr(
            "style",
            "display: none; visibility: hidden;"
        );
        fetchDrink(event);
    }
    // What to do if a movie genre is selected
    else {
        $("#resultMovie").css("display", "block");
        $("#randomMovieLink").removeAttr("style");
        fetchDrink(event);
        fetchMovie(event);
    }

    //add fetchMovie but exceeded api calls so blocked me out
});

$("#randomMovieLink").on("click", function (event) {
    $([document.documentElement, document.body]).animate(
        {
            scrollTop: $("#resultMovie").offset().top,
        },
        1000
    );
});

// Get the modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("searchButton");
var span = document.getElementsByClassName("close")[0];
//stop modal from popping up on page load
// btn.onclick = function () {

// When the user clicks on <span> (x), close the modal

span.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
