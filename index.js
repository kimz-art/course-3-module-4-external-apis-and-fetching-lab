// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";

// Your code here!

function fetchWeatherAlerts(state){
    fetch (`https://api.weather.gov/alerts/active?area=${state}`)
    .then(function(response){
       return response.json()
    })
    .then(function(data){
        displayAlerts(data)
    })
    .catch(function(error){
        console.log(error.message);
        document.getElementById("error-message").textContent = error.message;
        document.getElementById("error-message").classList.remove("hidden");
    })
}
function displayAlerts(data){
     const alertsDisplay = document.getElementById("alerts-display");
     const errorDiv = document.getElementById("error-message");

     errorDiv.classList.add("hidden");
     errorDiv.textContent = "";
     alertsDisplay.innerHTML="";

     const summary = document.createElement("p");
     summary.textContent = `${data.title}: ${data.features.length}`;
     alertsDisplay.appendChild(summary);

     data.features.forEach((feature) => {
     const item = document.createElement("p");
     item.textContent = feature.properties.headline;
     alertsDisplay.appendChild(item);
  });
}
document.getElementById("fetch-alerts").addEventListener("click", () => {
  const state = document.getElementById("state-input").value;
  document.getElementById("state-input").value = "";
  fetchWeatherAlerts(state);
});