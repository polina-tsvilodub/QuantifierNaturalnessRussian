var intro = {
    name: 'intro',
    // introduction title
    "title": "Welcome!",
    // introduction text
    "text": "Thank you for participating in our study. We are interested in your judgements of the naturalness of English descriptions of abstract pictures (e.g. descriptions a computer may have generated). In this study, you will see 10 trials, each with a picture of geometric shapes and a sentence. ",
    // introduction's slide proceeding button text
    "buttonText": "Begin experiment",
    // render function renders the view
    render: function() {
		var specific = exp.responseType == "slider" ? 
				"<strong> Your task is to rate how well the sentence describes the picture using an adjustable slider.</strong>" : 
			exp.responseType == "forced" ?
				"<strong> Your task is to indicate whether the sentence is an adequate description of the picture by clicking on buttons labelled 'inadequate' and 'adequate'.</strong>" :
			exp.responseType == "rating" ?
				"<strong> Your task is to indicate whether the sentence is an adequate description of the picture by choosing a value on a rating scale from 1 (inadequate) to 7 (adequate).</strong>" : 
				"<strong> Your task is to judge the adequacy of sentences given a picture.</strong>";
        viewTemplate = $('#intro-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text + specific,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        });

    },
    // for how many trials should this view be repeated?
    trials: 1
};


var mainForcedChoice = {
    // render function renders the view
    render : function(CT) {

        var trialInfo = generateTrial()
		var question = "Is the following sentence an adqueate description of this picture?"
        // fill variables in view-template
        var viewTemplate = $('#trial-view-buttons-response').html();
        $('#main').html(Mustache.render(viewTemplate, {
            question: question,
			sentence: trialInfo.sentence,
            option1:  trialInfo.option1,
            option2:  trialInfo.option2,
        }));

        // update the progress bar based on how many trials there are in this round
        var filled = exp.currentTrialInViewCounter * (exp.progress_bar_width / exp.views_seq[exp.currentViewCounter].trials);

        $('#filled').css('width', filled);
        // draw the canvas
        drawOnCanvas(document.getElementById('canvas'), trialInfo)
        // event listener for buttons; when an input is selected, the response
        // and additional information are stored in exp.trial_info
        $('input[name=answer]').on('change', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "binary",
                trial_number: CT + 1,
                question: question,
				quantifier: trialInfo.quantifier,
				total_set_size: trialInfo.total_set_size,
				focal_set_size: trialInfo.focal_set_size,
				focal_color: trialInfo.focal_color,
				other_color: trialInfo.other_color,
				shape: trialInfo.shape,
                response: $('input[name=answer]:checked').val(),
                RT: RT
            };
            exp.trial_data.push(trial_data);
            exp.findNextView();
        });

        // record trial starting time
        startingTime = Date.now();

    },
	trials : 10
};

var mainRatingScale = {
    // render function renders the view
    render : function(CT) {

        var trialInfo = generateTrial()
		var question = "Is the following sentence an adqueate description of this picture?"
        // fill variables in view-template
        var viewTemplate = $('#trial-view-rating-response').html();
        $('#main').html(Mustache.render(viewTemplate, {
            question: question,
			sentence: trialInfo.sentence,
            option1:  trialInfo.option1,
            option2:  trialInfo.option2,
        }));

        // update the progress bar based on how many trials there are in this round
        var filled = exp.currentTrialInViewCounter * (exp.progress_bar_width / exp.views_seq[exp.currentViewCounter].trials);

        $('#filled').css('width', filled);
        // draw the canvas
        drawOnCanvas(document.getElementById('canvas'), trialInfo)
        // event listener for buttons; when an input is selected, the response
        // and additional information are stored in exp.trial_info
        $('input[name=answer]').on('change', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "binary",
                trial_number: CT + 1,
                question: question,
				quantifier: trialInfo.quantifier,
				total_set_size: trialInfo.total_set_size,
				focal_set_size: trialInfo.focal_set_size,
				focal_color: trialInfo.focal_color,
				other_color: trialInfo.other_color,
				shape: trialInfo.shape,
                response: $('input[name=answer]:checked').val(),
                RT: RT
            };
            exp.trial_data.push(trial_data);
            exp.findNextView();
        });

        // record trial starting time
        startingTime = Date.now();

    },
	trials : 10
};


var mainSliderRating = {
    render : function(CT) {
        var view = {};
        var trialInfo = generateTrial();
		var question = "Is the following sentence an adequate description of this picture?"
        // what part of the progress bar is filled
        var filled = exp.currentTrialInViewCounter * (exp.progress_bar_width / exp.views_seq[exp.currentViewCounter].trials);
        view.name = 'trial',
        view.template = $('#trial-view-slider-response').html();
        view.response = $('#response').html();
        var response;
        $('#main').html(Mustache.render(view.template, {
            question: question,
			sentence: trialInfo.sentence,
            option1: trialInfo.option1,
            option2: trialInfo.option2,
        }));
        startingTime = Date.now();
        drawOnCanvas(document.getElementById('canvas'), trialInfo)
        response = $('#response');
        // updates the progress bar
        $('#filled').css('width', filled);

        // checks if the slider has been changed
        response.on('change', function() {
            $('#next').removeClass('nodisplay');
        });
        response.on('click', function() {
            $('#next').removeClass('nodisplay');
        });

        $('#next').on('click', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "slider",
                trial_number: CT+1,
                question: question,
				quantifier: trialInfo.quantifier,
				total_set_size: trialInfo.total_set_size,
				focal_set_size: trialInfo.focal_set_size,
				focal_color: trialInfo.focal_color,
				other_color: trialInfo.other_color,
				shape: trialInfo.shape,
                response: response.val(),
                RT: RT
            };
            exp.trial_data.push(trial_data);
            exp.findNextView();
        });

        return view;
    },
    trials: 10
};


var postTest = {
    name: 'postTest',
    "title": "Additional Info",
    "text": "Answering the following questions is optional, but will help us understand your answers.",
    "buttonText": "Continue",
    // render function renders the view
    render : function() {

        viewTemplate = $('#post-test-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            buttonText: this.buttonText
        }));

        $('#next').on('click', function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // records the post test info
            exp.global_data.age = $('#age').val();
            exp.global_data.gender = $('#gender').val();
            exp.global_data.education = $('#education').val();
            exp.global_data.languages = $('#languages').val();
            exp.global_data.comments = $('#comments').val().trim();
            exp.global_data.endTime = Date.now();
            exp.global_data.timeSpent = (exp.global_data.endTime - exp.global_data.startTime) / 60000;

            // moves to the next view
            exp.findNextView();
        })

    },
    trials: 1
};

var thanks = {
    name: 'thanks',
    "message": "Thank you for taking part in this experiment!",
    render: function() {

        viewTemplate = $('#thanks-view').html();

        // what is seen on the screen depends on the used deploy method
		//    normally, you do not need to modify this
        if ((config_deploy.is_MTurk) || (config_deploy.deployMethod === 'directLink')) {
            // updates the fields in the hidden form with info for the MTurk's server
            $('#main').html(Mustache.render(viewTemplate, {
                thanksMessage: this.message,
            }));
        } else if (config_deploy.deployMethod === 'Prolific') {
            var prolificURL = 'https://prolific.ac/submissions/complete?cc=' + config_deploy.prolificCode;

            $('main').html(Mustache.render(viewTemplate, {
                thanksMessage: this.message,
                extraMessage: "Please press the button below<br />" + '<a href=' + prolificURL +  ' class="prolific-url">Finished!</a>'
            }));
        } else if (config_deploy.deployMethod === 'debug') {
            $('main').html(Mustache.render(viewTemplate, {}));
        } else {
            console.log('no such config_deploy.deployMethod');
        }

        exp.submit();

    },
    trials: 1
};
