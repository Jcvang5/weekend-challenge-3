$(document).ready(function(){
    $("#search").click(function(){
        var baseURL = "https://api.openweathermap.org/data/2.5/weather?";
        var apiKey= config.MY_KEY;
        // console.log(apiKey);
        var location = $("#location").val();
        let isNumber = /\d/;
        const isSearchNum = isNumber.test(location);
        var searchKey= ' ';
        if(isSearchNum){
            searchKey = "zip";
        }else{
            searchKey="q";
        }
        apiURL = `${baseURL}${searchKey}=${location}&APPID=${apiKey}&units=imperial`;
        // console.log(apiURL);
        $.ajax({
            url: apiURL,
            method: "GET",
            success: function(data){
                // console.log(data);
                if(data.cod===200){
                    var weatherInfo = "<h2>Weather in " + data.name + ", "
                    + data.sys.country + "</h2>";
                    weatherInfo += "<p> Temperature: "+ data.main.temp.toFixed(2)+ " F </p>";
                    weatherInfo+= "<p>Weather: " + data.weather[0].description + "</p>";
                    weatherInfo += "<p> Humidity: "+ data.main.humidity + "%</p>";
                    weatherInfo += "<p> Wind Speed: " + data.wind.speed + " mph</p>";
                    $("#weather-info").html(weatherInfo);
                    $("#error-message").empty();
                }else{
                    $("#weather-info").empty();
                    $("#error-message").text("Location not found. Please check the name or zip code.")
                }
            },
            error: function(xhr,message,error){
                // console.log(xhr.responseJSON);
                // console.log(xhr);
                // console.log(error);
                let err = xhr.responseJSON;
                let errCode= err.cod;
                let errMessage = err.message;
                $("#weather-info").empty();
                $("#error-message").text(`${errCode}: Network error. ${errMessage}`)
                console.log(errCode+ errMessage);
            }
        })
    })
});