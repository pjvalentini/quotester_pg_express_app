/* global $ */

// Setting un an on.sumit function for the Quotester form
$(document).ready(function() {
	$('#quotester-form').on('submit', function(e) {
		e.preventDefault();

// Create an object that takes in the values for name and quote.
		var quotesObj = {
			name: $('#name-input').val(),
			quote: $('#quote-input').val(),
		};
		// console.log(quotesObj); // shows me the user input in the console.
		// console.log(JSON.stringify(quotesObj));

		// POST
		$.ajax({
			method: 'POST',
			url: '/api/quote',
			dataType: 'json',
			data: JSON.stringify(quotesObj),
			contentType: 'application/json',
		}).then(function(resAddQuote) {
			// console.log(resAddQuote);
			if (resAddQuote == "null_quote") {  // eslint-disable-line
				alert("Please Enter Quote");
			}
			appendQuotester();
		});
		$('#name-input').val("");
		$('#quote-input').val("");
	});

// GET
// This function stores the quotes set up.  Best to store in a function that can be reused.
// Represents everythig that is going to the DOM and content that will be diplayed.
	function appendQuotester() {
		$('#main-div').remove();
		$.ajax({
			method: 'GET',
			url: '/api/quotes',
		}).then(function(quotes) {
			// console.log(quotes);
			var mainDiv = $('<div id="main-div">');
			var userDiv, nameP, quoteP, xButton;
			quotes.rows.sort(function(a, b) {
// this sets the order and sorts id's from from the db (id's in this case).
// sorting and object by id's and the placement of the post will stay where is was originally.
				return a.id - b.id;
			});
// looping through the array.
			for (var i = 0 ; i < quotes.rows.length; i++) {
				userDiv = $('<div class="well user-div">');
				userDiv.css({ display: 'inline-block', margin: '10px', overflow: 'hidden' });
// sets up the xbutton to the wells that hold the quotes.
				xButton = $('<button class="btn btn-danger x-button" data-id=' + quotes.rows[i].id + '>');
				xButton.css({ padding: "0px 4px 0px 4px", float: 'right' });
				xButton.text("X");
// stores name and meesage in <p> tags.
				nameP = $('<p class="name">');
				quoteP = $('<p class="quote" data-id=' + quotes.rows[i].id + '>');

				nameP.text("Name: " + quotes.rows[i].name);
				nameP.css({ fontWeight: 'bold' });
				quoteP.text("Quote: " + quotes.rows[i].quote);
				userDiv.append(xButton).append(nameP).append(quoteP);
// mainDiv gets appened to userDiv.
				mainDiv.append(userDiv);
			}
			$('#main-container').append(mainDiv);
		});
	}
	appendQuotester();

	// DELETE
	$(document).on('click', '.x-button', function() {
		$.ajax({
			method: 'DELETE',
			url: '/api/delete-quote/' + $(this).data('id'),
		});
		appendQuotester(); // this re-appends after the DELETE with out a refresh.
	});

// this for the modal set up.
	$(document).on('click', '.quote', function() {
		$('#modal-input-div').remove(); // removes the modal div
		var quoteId = $(this).data('id');
		$('#update-quote-modal').modal(); // pops modal up back up when modal() is called

		var inputDiv = $('<div id="modal-input-div">');

		$.ajax({
			method: 'GET', // getting quotes from DB
			url: '/api/quotes',
		}).then(function(quotes) {
			// console.log(quotes);
// looping through the quotes.
			for (var i = 0; i < quotes.rows.length; i++) {
				if (quotes.rows[i].id === quoteId) { // comparing id is and quote match.
// provides better UI.
					var textInput = $("<textarea id='quote-update-input'>"); // keeps the value of the last quote when modal pops up.
					textInput.val(quotes.rows[i].quote); //
					inputDiv.append(textInput);
				}
			}
// modal body submit button.
			var submitButton = $('<button>');
			submitButton.addClass('btn btn-info enter-button');
			submitButton.attr('data-id', quoteId);
			submitButton.text("Enter");
			inputDiv.append("<br>").append(submitButton);
		});
		$('.modal-body').append(inputDiv);
	});

// This is the PUT or UPDATE of the quotes.
	$(document).on('click', '.enter-button', function() {
		var updatedquote = $("#quote-update-input").val();
// if updatedquote does !== a blank string, then update the messaage.
		if (updatedquote !== "") {
			$.ajax({
				method: 'PUT',
				url: '/api/update-quote/' + $(this).data('id'),
				data: { quote: updatedquote },
			}).then(function(quoteUpdate) {
				// console.log(quoteUpdate);
				appendQuotester();
				$('#update-quote-modal').modal('toggle'); // modal is removed ater the update.
			});
		} else {
			alert ('Please Enter Text');
		}
	});
});

// when posting to heroku make sure the start script is set to node and not nodemon in the pkg.json file.
