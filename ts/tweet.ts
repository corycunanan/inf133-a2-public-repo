class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        if ((this.text.startsWith('Just completed')) || (this.text.startsWith('Just posted'))) {
            return 'completed_event';
        }

        else if (this.text.includes('#RKLive')) {
            return 'live_event';
        }

        else if ((this.text.startsWith('Achieved')) || (this.text.startsWith('I just set a goal on #Runkeeper!'))) {
            return 'achievement';
        }
        return "miscellaneous";
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        if ((this.text.includes('Check it out!'))) {
            return false;
        }
        return true;
        //TODO: identify whether the tweet is written
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        return "";
    }

    get activityType():string {
        if (this.source == 'completed_event') {
            var text_array = this.text.split(" ");
            if (text_array.includes("km")) {
                return text_array[text_array.indexOf('km') + 1];
            }
            else if (text_array.includes("mi")) {
                return text_array[text_array.indexOf('mi') + 1];
            }
        }
        //TODO: parse the activity type from the text of the tweet
        return "";
    }

    get distance():number {
        if(this.source == 'completed_event') {
            var text_array = this.text.split(" ");
            if (text_array.includes("km")) {
                return 0.621371 * Number(text_array[text_array.indexOf('km') - 1]);
            }
            else {
                return Number(text_array[text_array.indexOf('km') - 1]);
            }
        }
        return 0;
    }

    getHTMLTableRow(rowNumber:number):string {
        return "<tr><th scope='col'>#</th><th scope='col'>Activity type</th><th scope='col'>Tweet</th></tr>";
    }
}