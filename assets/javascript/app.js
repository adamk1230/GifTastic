//  Initial array of teams
var teams = ["New York Giants", "San Antonio Spurs", "New York Knicks", "Cincinnati Bengals"];

// display displayTeamGif fucntion re-renders the HTML to display the appropriate content
function displayTeamGif() {
	var team = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + team + "&limit=10&api_key=dc6zaTOxFJmzC";
	console.log("Team: " + team);
	console.log("queryURL: " + queryURL);

	//  AJAX Call for the specific button being clicked
	$.ajax({
		url: queryURL,
		method: "GET"
	}).done(function(response) {

		
		//div to hold all the gifs
		dAll = $("<div>");

		for (var i = 0; i < 10; i++) {

			//div to hold the gif
			dTag = $("<div class='gifs'>");

			//Create div to hold and display the rating
			dRating = $("<div>");
			dRating.append("Rating: " + response.data[i].rating);

			//Create div to hold and display the gif
			dGif = $("<div>");

			var image = $("<img class='gif' data-state='still'>");
			image.attr("src", response.data[i].images.fixed_height_still.url);
			image.attr("data-still", response.data[i].images.fixed_height_still.url);
			image.attr("data-animate", response.data[i].images.fixed_height.url)



			dGif.append(image)


			// dGif.append("<img src='" + response.data[i].images.fixed_height_still.url + "'>");
			
			//put the div dTag together
			dTag.append(dRating);
			dTag.append(dGif);
			dAll.append(dTag);

		}


		$("#gifDiv").html(dAll);


	}); // ends AJAX call


} // ends displayTeamGif function


//Function to render buttons
function renderButtons() {
	//Empties the div
	$("#buttons-view").empty();

	//Loops through the array of teams
	for (var i = 0; i < teams.length; i++) {
		var a = $("<button class='team'>");
		a.attr("data-name", teams[i]);
		a.text(teams[i]);
		$("#buttons-view").append(a);
	}


} //end of renderButtons function


//Function for add team button
$("#add-team").on("click", function(event) {

	event.preventDefault();
	var team = $("#team-input").val().trim();
	teams.push(team);
	renderButtons();

}); // ends add team button

//  click event listener 
$(document).on("click", ".team", displayTeamGif);



//animate on click
$(document).on("click", ".gif", function() {

	var state = $(this).attr("data-state");
	var animateUrl = $(this).attr("data-animate");
	var stillUrl = $(this).attr("data-still");

	if (state === "still") {
		$(this).attr("src", animateUrl);
		$(this).attr("data-state", "animate");
	}

	if (state === "animate") {
		$(this).attr("src", stillUrl);
		$(this).attr("data-state", "still")
	}

}); // ends animate on click



//renders buttons on load
renderButtons();