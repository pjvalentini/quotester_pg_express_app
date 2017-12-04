/* global $ */

// Setting un an on.sumit function for the quotester form
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
			console.log(resAddQuote);
			if (resAddQuote == "null_message") {  // eslint-disable-line
				alert("Please Enter Quote");
			}
			// appendQuotester();
		});
		$('#name-input').val("");
		$('#message-input').val("");
	});
});

// Create an object that takes in the values for name and quote.
