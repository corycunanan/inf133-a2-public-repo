function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	let activityArray = new Array();
	let mostFrequentArray = new Array();

	for (i = 0; i < tweet_array.length; i++) {
		var activity = {};
		if (tweet_array[i].activityType != ""){
			activity['ActivityType'] = tweet_array[i].activityType;
			activity['Distance'] = tweet_array[i].distance;
			activity['Date'] = tweet_array[i].time;
			activityArray.push(activity);
			var mostCommonActivities = ['bike', 'run', 'walk'];
			if (mostCommonActivities.includes(tweet_array[i].activityType)){
				activity['ActivityType'] = tweet_array[i].activityType;
				activity['Distance'] = tweet_array[i].distance;
				activity['Date'] = tweet_array[i].time;
				mostFrequentArray.push(activity);
			}
		}
	}
	console.log('Activity Array');
	console.log(activityArray);
	
	console.log('Frequent Array');
	console.log(mostFrequentArray);


	function checkCompletedEvent(tweet) {
		return tweet.source == 'completed_event';
	}
	console.log('Completed Event');
	completed_array = tweet_array.filter(checkCompletedEvent);

	//Part 2 
	//Activities
	function checkBike(tweet) {
		return tweet.activityType == 'bike';
	}
	function checkSwim(tweet) {
		return tweet.activityType == 'swim';
	}
	function checkWalk(tweet) {
		return tweet.activityType == 'walk';
	}
	function checkRun(tweet) {
		return tweet.activityType == 'run';
	}
	function checkSki(tweet) {
		return tweet.activityType == 'ski';
	}
	
	
	console.log('Bike Tweets');
	bike_tweets = completed_array.filter(checkBike);
	console.log('Swim Tweets');
	swim_tweets = completed_array.filter(checkSwim);
	console.log('Walk Tweets');
	walk_tweets = completed_array.filter(checkWalk);
	console.log('Run Tweets');
	run_tweets = completed_array.filter(checkRun);
	console.log('Ski Tweets');
	ski_tweets = completed_array.filter(checkSki);

	//Calculates number of activites
	let activitySet = new Set();
	let activityDict = {};

	for (i = 0; i < completed_array.length; i++) {
		activitySet.add(completed_array[i].activityType);
		if (completed_array[i].activityType in activityDict){
			activityDict[completed_array[i].activityType] += 1;
		}
		else {
			activityDict[completed_array[i].activityType] = 0;
		}
	}

	var activityItems = Object.keys(activityDict).map(function(key) {
		return [key, activityDict[key]];
	});

	activityItems.sort(function(first, second) {
		return second[1] - first[1];
	});

	console.log(activityItems.slice(0,3));

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v4.0.0-beta.8.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": activityArray
	  },
	  "mark": "point",
	  "encoding": {
		  "x": {
			"field": "ActivityType",
			"type": "ordinal"
		  },
		  "y": {
			"aggregate": "count",
			"type": "quantitative"
		  }
	  }
	  //TODO: Add mark and encoding
	};

	distance_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v4.0.0-beta.8.json",
	  "description": "A plot of the distances by day of the week for all of the three most tweeted-about activities..",
	  "data": {
	    "values": mostFrequentArray
	  },
	  "mark": "point",
	  "encoding": {
		  "x": {
			"field": "Date",
			"timeUnit": "day",
			"type": "ordinal"
		  },
		  "y": {
			"field": "Distance",
			"type": "quantitative"
		  },
		  "color": {
			"field": "ActivityType", 
			"type": "nominal"
		}

	  }
	}

	mean_distance_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v4.0.0-beta.8.json",
	  "description": "A plot of the distances by day of the week for all of the three most tweeted-about activities..",
	  "data": {
	    "values": mostFrequentArray
	  },
	  "mark": "point",
	  "encoding": {
		  "x": {
			"field": "Date",
			"timeUnit": "day",
			"type": "ordinal"
		  },
		  "y": {
			"aggregate": "mean",
			"field": "Distance",
			"type": "quantitative"
		  },
		  "color": {
			"field": "ActivityType", 
			"type": "nominal"
		}

	  }
	  //TODO: Add mark and encoding
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
	$('#numberActivities').text(activitySet.size);
	$('#firstMost').text(activityItems[0][0]);
	$('#secondMost').text(activityItems[1][0]);
	$('#thirdMost').text(activityItems[2][0]);
	
	$('#secondMost').text(activityItems[1][0]);
	$('#thirdMost').text(activityItems[2][0]);

	$('#longestActivityType').text('bike');
	$('#shortestActivityType').text('walk');
	$('#weekdayOrWeekendLonger').text('weekends');


	$('#aggregate').click(function(){
		var $this = $(this);
		$this.toggleClass('btn');
		if ($this.hasClass('btn')){
			$this.text('Show means');
			vegaEmbed('#distanceVis', distance_vis_spec, {actions:false});
		}
		else {
			$this.text('Show all activities');
			vegaEmbed('#distanceVis', mean_distance_vis_spec, {actions:false});
		}
	})


}

//Wait for the DOM to load
$(document).ready(function() {
	loadSavedRunkeeperTweets().then(parseTweets);
});