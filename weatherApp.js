const Api = `https://api.weatherapi.com/v1/current.json?key=761645b969da4d43a6225603230405&q=kolkata`;
const searchApi = `https://api.weatherapi.com/v1/current.json?key=761645b969da4d43a6225603230405&q=`;

// Day
const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const today = day[new Date().getDay()];

// Selector's section's

const city_location = document.querySelector("#city");
const region_location = document.querySelector("#region");
const country_location = document.querySelector("#country");
const temp_celsis = document.querySelector("#temp_c");
const temp_fahrehnit = document.querySelector("#temp_f");
const Humidity_data = document.querySelector("#Humidity_data");
const wind_speed_data = document.querySelector("#wind_speed");
const date_time_data = document.querySelector("#date_time");
const day_data = document.querySelector("#day");
const cloud_img_data = document.querySelector("#cloud_img");
const search_input = document.querySelector("#search_input");
const card_loading_display = document.querySelector("#card_loading_display");
const dark_btn = document.querySelector("#dark_btn");

// Internet Gone alert.
window.addEventListener("offline", function () {
    alert("Internet Connection Gone");
})

// fetching data function.
const apiData = async (apis) => {
    try {
        let response = await fetch(apis);
        search_input.value = "";// to remove input after searching/enterPressing. 
        let data = await response.json();
        if (response.ok) {
            city_location.innerHTML = `${data.location.name}`;
            region_location.innerHTML = `${data.location.region} , `;
            country_location.innerHTML = `(${data.location.country})`;
            temp_celsis.innerHTML = `${data.current.temp_c}°C`;
            temp_fahrehnit.innerHTML = `${data.current.temp_f}°F`;
            Humidity_data.innerHTML = `Humidity: ${data.current.humidity}`;
            wind_speed_data.innerHTML = `Wind Speed: ${data.current.wind_kph}Km/h`;
            date_time_data.innerHTML = `${today} |`;
            day_data.innerHTML = `${data.location.localtime}`;
            cloud_img_data.innerHTML = `<img id="cloud_img" src="${data.current.condition.icon}" class="card-img-top m-auto" alt="image" style="width:100px; ">`;
        }
        else {
            alert("City/Country data not exist");
        }
    }
    catch (error) {
        error = "Error:Internet connection does not exist";
        alert(error);
    }
    // apis.preventDefault();//no reload when tab is change.
}
apiData(Api);

// By searching in input tag and pressing enter/btn for display result.
const search_btn_fun = () => {
    apiData(searchApi + search_input.value.toLowerCase());
}

search_input.addEventListener("keypress", function (input) {
    console.log(input.key);
    if (input.key === 'Enter') {
        search_btn_fun();
    }
})

// dark mode feature.
const dark_mode_fun = () => {

    dark_btn.classList.toggle("fa-moon");// this class already exist so it will remove.
    dark_btn.classList.toggle("fa-sun");

    card_loading_display.classList.toggle("dark_mode")
    // dark_btn.classList.toggle("fa-lg");// don't add already exist classes in dark_mode_btn(html).
}