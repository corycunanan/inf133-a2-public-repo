function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	// console.log(runkeeper_tweets)

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	function checkWritten(tweet) {
		return tweet.written;
	}
	written_tweets = tweet_array.filter(checkWritten);

	console.log(written_tweets)
	var inputVal = document.getElementById("textFilter").value;
	console.log(inputVal)
	$('#searchText').text(inputVal);
	$(document).ready(function(){
		$("#myInput").on("keyup", function() {
		  var value = $(this).val().toLowerCase();
		  $("#tweetTable").filter(function() {
			$(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
		  });
		});
	  });

}

function addEventHandlerForSearch() {
	

	//TODO: Search the written tweets as text is entered into the search box, and add them to the table
}

//Wait for the DOM to load
$(document).ready(function() {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});