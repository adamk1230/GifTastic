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

		//div to hold the gif
		dTag = $("<div>");

		//Create div to hold and display the rating
		dRating = $("<div>");
		dRating.html("Rating: " + response.data[1].rating);

		//Create div to hold and display the gif
		dGif = $("<div>");
		dGif.html("<img src='" + response.data[1].images.fixed_height_still.url + "'>");

		//put the div dTag together
		dTag.append(dRating);
		dTag.append(dGif);
		dAll.append(dTag)


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

renderButtons();