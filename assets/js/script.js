var drinkName = $("#drink-search");
var searchGenre = $("option");
var searchButton = $("#searchButton");
var nameDrink = $("#nameDrink");
var ul = $("#ingredientList");
var instruction = $("#instructions");
var drinkPic = $("#drinkPic");
var drinkLink = $("#drinkLink");

function fetchDrink(event) {
	console.log(drinkName.val());

	var apiUrl = "https://thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkName.val();

	fetch(apiUrl)
		.then(function (response) {
			if (response.ok) {
				console.log(response);
				response.json().then(function (data) {
					console.log(data);
					//data contains object
					displayDrink(data);
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
	while (nameDrink.firstChild) {
		nameDrink.firstChild.remove();
	}
	//add the instructions
	instruction.text("");
	instruction.text(data.drinks[0].strInstructions);

	//we add the ingredients as elements to html page here
	while (ul.firstChild) {
		ul.firstChild.remove();
	}
	for (i = 1; i < 8; i++) {
		var ingredientNum = "strIngredient" + i;
		console.log(ingredientNum);

		//cant get it to get the ingredient from data object!
		var ingredient = data.drinks[0]["strIngredient" + i];
		var ingredientQuantity = data.drinks[0]["strMeasure" + i];
		console.log(ingredient);
		if (!(ingredient == null)) {
			ul.append($("<li>").append(ingredientQuantity + ingredient));
		} else {
			//last ingredient reached
			i = 8;
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

	//drinks: Array(2)
	// 0:
	// dateModified: "2017-09-02 12:36:47"
	// idDrink: "12162"
	// strAlcoholic: "Alcoholic"
	// strCategory: "Ordinary Drink"
	// strCreativeCommonsConfirmed: "No"
	// strDrink: "Screwdriver"
	// strDrinkAlternate: null
	// strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/8xnyke1504352207.jpg"
	// strGlass: "Highball glass"
	// strIBA: "Unforgettables"
	// strImageAttribution: null
	// strImageSource: null
	// strIngredient1: "Vodka"
	// strIngredient2: "Orange juice"
	// strIngredient3: null
	// strIngredient4: null
	// strIngredient5: null
	// strIngredient6: null
	// strIngredient7: null
	// strIngredient8: null
	// strIngredient9: null
	// strIngredient10: null
	// strIngredient11: null
	// strIngredient12: null
	// strIngredient13: null
	// strIngredient14: null
	// strIngredient15: null
	// strInstructions: "Mix in a highball glass with ice. Garnish and serve."
	// strInstructionsDE: "In einem Highball-Glas mit Eis mischen. Garnieren und servieren."
	// strInstructionsES: null
	// strInstructionsFR: null
	// strInstructionsIT: "Mescolare in un bicchiere highball con ghiaccio. Guarnire e servire."
	// strInstructionsZH-HANS: null
	// strInstructionsZH-HANT: null
	// strMeasure1: "2 oz "
	// strMeasure2: null
	// strMeasure3: null
	// strMeasure4: null
	// strMeasure5: null
	// strMeasure6: null
	// strMeasure7: null
	// strMeasure8: null
	// strMeasure9: null
	// strMeasure10: null
	// strMeasure11: null
	// strMeasure12: null
	// strMeasure13: null
	// strMeasure14: null
	// strMeasure15: null
	// strTags: "IBA"
	// strVideo: "https://www.youtube.com/watch?v=ce_YOgaEo3Q"
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
				"x-rapidapi-key": "d92410c74amsh2c46b80ad014673p1e0368jsn745f5bd543a0",
			},
		}
	)
		.then(function (response) {
			if (response.ok) {
				console.log(response);
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
	var movieLink = data.results[randomPick].streamingInfo.netflix.us.link;
	var moviePosterURL = data.results[randomPick].posterURLs.original;
	console.log(movieName);
	console.log(movieLink);
	console.log(moviePosterURL);

	//this is the object for a given movie and its possible parameters
	// results: Array(8)
	// 0:
	// age: 13
	// backdropPath: "/lRCAcwJeh93YHO3ghFBDf0Pj3w3.jpg"
	// backdropURLs: {300: 'https://image.tmdb.org/t/p/w300/lRCAcwJeh93YHO3ghFBDf0Pj3w3.jpg', 780: 'https://image.tmdb.org/t/p/w780/lRCAcwJeh93YHO3ghFBDf0Pj3w3.jpg', 1280: 'https://image.tmdb.org/t/p/w1280/lRCAcwJeh93YHO3ghFBDf0Pj3w3.jpg', original: 'https://image.tmdb.org/t/p/original/lRCAcwJeh93YHO3ghFBDf0Pj3w3.jpg'}
	// cast: (5) ['Nirmal Purja', 'Jimmy Chin', 'Reinhold Messner', 'Klára Kolouchová', 'Conrad Anker']
	// countries: ['US']
	// genres: (3) [99, 12, 5]
	// imdbID: "tt14079374"
	// imdbRating: 79
	// imdbVoteCount: 19369
	// originalLanguage: "en"
	// originalTitle: "14 Peaks: Nothing Is Impossible"
	// overview: "In 2019, Nepalese mountain climber Nirmal “Nims” Purja set out to do the unthinkable by climbing the world’s fourteen highest summits in less than seven months. (The previous record was eight years). He called the effort “Project Possible 14/7” and saw it as a way to inspire others to strive for greater heights in any pursuit. The film follows his team as they seek to defy naysayers and push the limits of human endurance."
	// posterPath: "/saGMNCD6ayFqmOb9mX2MkkMmW7w.jpg"
	// posterURLs: {92: 'https://image.tmdb.org/t/p/w92/saGMNCD6ayFqmOb9mX2MkkMmW7w.jpg', 154: 'https://image.tmdb.org/t/p/w154/saGMNCD6ayFqmOb9mX2MkkMmW7w.jpg', 185: 'https://image.tmdb.org/t/p/w185/saGMNCD6ayFqmOb9mX2MkkMmW7w.jpg', 342: 'https://image.tmdb.org/t/p/w342/saGMNCD6ayFqmOb9mX2MkkMmW7w.jpg', 500: 'https://image.tmdb.org/t/p/w500/saGMNCD6ayFqmOb9mX2MkkMmW7w.jpg', 780: 'https://image.tmdb.org/t/p/w780/saGMNCD6ayFqmOb9mX2MkkMmW7w.jpg', original: 'https://image.tmdb.org/t/p/original/saGMNCD6ayFqmOb9mX2MkkMmW7w.jpg'}
	// runtime: 101
	// significants: ['Torquil Jones']
	// streamingInfo: {netflix: {…}}
	// tagline: ""
	// title: "14 Peaks: Nothing Is Impossible"
	// tmdbID: "890825"
	// tmdbRating: 76
	// video: "8QH5hBOoz08"
	// year: 2021
}

searchButton.on("click", function (event) {
	$("#resultDrink").attr("hidden", false);
	$("#resultMovie").attr("hidden", false);
	fetchDrink(event);
	//add fetchMovie but exceeded api calls so blocked me out
});
//need to call two functions here fetch drink and fetch movie

// Get the modal
var modal = document.getElementById("myModal");
var btn = document.getElementById("searchButton");
var span = document.getElementsByClassName("close")[0];

//add modal to search butt
btn.onclick = function () {
	//if fetch drink is empty show modal
	if (document.getElementById("drink-search").value.length == 0) {
		modal.style.display = "block";
	}
};

span.onclick = function () {
	modal.style.display = "none";
};

window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};
