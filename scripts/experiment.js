// customize the experiment by specifying a view order and a trial structure
exp.customize = function() {

    // record current date and time in global_data
    this.global_data.startDate = Date();
    this.global_data.startTime = Date.now();

    // choose randomly between slider and forced response type
    this.responseType = _.sample(["slider", "forced", "rating"])
    if (this.responseType === "slider") {
        // specify view order for slider type response
        this.views_seq = [intro,
                          mainSliderRating,
                          postTest,
                          thanks];
    } else if (this.responseType == "rating") {
        // specify view order for rating type response
		console.log("here")
        this.views_seq = [intro,
                          mainRatingScale,
                          postTest,
                          thanks];
    } else {
		// specify view order for binary type response
        this.views_seq = [intro,
                          mainForcedChoice,
                          postTest,
                          thanks];
	}

    // adds progress bars to the views listed
    // view's name coincides with object's name
    this.progress_bar_in = ['mainForcedChoice', 'mainSliderRating', 'mainRatingScale'];
    // styles: chunks, separate or default
    this.progress_bar_style = 'default';
    // the width of the progress bar or a single chunk
    this.progress_bar_width = 60;
};
