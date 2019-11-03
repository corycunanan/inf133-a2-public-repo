function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	function tweet_sort() { 
		tweet_array.sort(function(a, b){ 
			return new Date(a.time) - new Date(b.time); 
		}); 
	  
	}

	//sort tweet_array by date, calling previous function.
	tweet_sort()

	var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	
	//categories

	function checkCompletedEvent(tweet) {
		return tweet.source == 'completed_event';
	}
	
	function checkLiveEvent(tweet) {
		return tweet.source == 'live_event';
	}
	
	function checkAchievement(tweet) {
		return tweet.source == 'achievement';
	}
	
	function checkMiscellaneous(tweet) {
		return tweet.source == 'miscellaneous';
	}

	function checkWritten(tweet) {
		return tweet.written;
	}

	console.log('Completed Event');
	completed_array = tweet_array.filter(checkCompletedEvent);
	
	console.log('Live Event');
	live_event_array = tweet_array.filter(checkLiveEvent);
	
	console.log('Achievement Event');
	achievement_array = tweet_array.filter(checkAchievement);
	
	console.log('Miscellaneous Event');
	miscellaneous_array = tweet_array.filter(checkMiscellaneous);

	console.log('Written Tweets');
	written_tweets = completed_array.filter(checkWritten);
	
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	$('#numberTweets').text(tweet_array.length);
	$('#firstDate').text(tweet_array[0].time.toLocaleDateString('en-US', options));
	$('#lastDate').text(tweet_array[tweet_array.length - 1].time.toLocaleDateString('en-US', options));
	
	$('.completedEvents').text(completed_array.length);
	var completedPct = (( completed_array.length/tweet_array.length ) * 100).toFixed(2);
	$('.completedEventsPct').text( completedPct + '%');
	
	$('.liveEvents').text(live_event_array.length);
	var liveEventsPct = (( live_event_array.length/tweet_array.length ) * 100).toFixed(2);
	$('.liveEventsPct').text( liveEventsPct + '%');
	
	$('.achievements').text(achievement_array.length);
	var achievementsPct = (( achievement_array.length/tweet_array.length ) * 100).toFixed(2);
	$('.achievementsPct').text( achievementsPct + '%');
	
	$('.miscellaneous').text(miscellaneous_array.length);
	var miscellaneousPct = (( miscellaneous_array.length/tweet_array.length ) * 100).toFixed(2);
	$('.miscellaneousPct').text( miscellaneousPct + '%');
	
	$('.written').text(written_tweets.length);
	var writtenPct = (( written_tweets.length/tweet_array.length ) * 100).toFixed(2);

	$('.writtenPct').text(writtenPct + '%');
	
}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});