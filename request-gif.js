$(document).ready(function() {
    // register our function as the "callback" to be triggered by the form's submission event    
    $("#form-gif-request").submit(fetchAndDisplayGif) // in other words, when the form is submitted, fetchAndDisplayGif() will be executed
    
});

/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the 
 * user's search term (along with "jackson 5")
 * 
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */
function fetchAndDisplayGif(event) {
    
    // This prevents the form submission from doing what it normally does: send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a normal request and we definitely don't want the page to refresh.
    
    
    // get the user's input text from the DOM
    var search =  $("[name='tag']").val();
    var total = $("[name='answer']").val();

    if (search == "" || total != sum){
        $("#well0").attr("class", "alert alert-danger");
        $("#well1").attr("class", "alert alert-danger");
        $("#error").text("Sorry, Try again!");
        setGifLoadedStatus(false);
    }
    
    else{
    event.preventDefault();
    var searchQuery = search // TODO should be e.g. "dance"
    search = "bbc";
    }
    // configure a few parameters to attach to our request
    var params = { 
        api_key: "56Ttq3kacK7M67W2XodkyqYcJFnBpk0N", 
        tag : "jackson 5 dance" // TODO should be e.g. "jackson 5 dance"
    };
    
    // make an ajax request for a random GIF
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/random", // TODO where should this request be sent?
        data: params, // attach those extra parameters onto the request
        success: function(response) {
            // if the response comes back successfully, the code in here will execute.
            
            // jQuery passes us the `response` variable, a regular javascript object created from the JSON the server gave us
            console.log("we received a response!");
            console.log(response);
            
            // TODO
            // 1. set the source attribute of our image to the image_url of the GIF
            $("#gif").attr("src", response.data.image_url);
            // 2. hide the feedback message and display the image
            setGifLoadedStatus(true);
        },
        error: function() {
            // if something went wrong, the code in here will execute instead of the success function
            
            // give the user an error message
            $("#feedback").attr("class", "alert alert-danger");
            $("#feedback").text("Sorry, could not load GIF. Try again!");
            setGifLoadedStatus(false);
        }
    });
    
    // TODO
    // give the user a "Loading..." message while they wait
    $("#feedback").text("Loading...");
}


/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
    $("#error").attr("hidden", isCurrentlyLoaded);
}