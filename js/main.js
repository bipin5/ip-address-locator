const my_api ='at_I9n5RrNDwdRp8b1p4DtRrUDvmm1MJ'
const bypass_cors_url = 'https://cors-anywhere.herokuapp.com/'
const api_uri = 'https://geo.ipify.org/api/'
let version = 'v1'

const entered_ip = document.getElementById('ip_address') 
const search_btn = document.getElementById('search-btn')


let output_ip = document.getElementById('input_ip')
let output_location = document.getElementById('input_location')
let output_timezone = document.getElementById('input_timezone')
let output_isp = document.getElementById('input_isp')


const headers_option = {
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
}

const map = L.map('display-map', {   
    'center': [34.04915, -118.09462],
    'zoom': 0,
})

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

    

updateMarker = (update_marker = [37.40599,-122.078514]) => {
    map.setView(update_marker, 13)
    L.marker(update_marker).addTo(map)
    .bindPopup('Hello Mr. Dahal')
    .openPopup();
}

getIPDetails = (default_ip) =>{
    if(default_ip == undefined){
        var ip_url = `${bypass_cors_url}${api_uri}${version}?apiKey=${my_api}`
    }else{
        var ip_url = `${bypass_cors_url}${api_uri}${version}?apiKey=${my_api}&ipAddress=${default_ip}`

    }

    fetch(ip_url,headers_option).then(results => results.json())
    .then(data => {
        console.log(data)
      output_ip.innerHTML = data.ip  
      output_location.innerHTML = `${data.location.region} ${data.location.country} ${data.location.postalCode}`
      output_timezone.innerHTML = data.location.timezone
      output_isp.innerHTML = data.isp

      updateMarker([data.location.lat, data.location.lng])
    })
    .catch(error =>{
        console.log(error)
     alert("Something's Wrong, I can feel It.")
    })
}

// getIPDetails()

document.addEventListener('load', updateMarker())

search_btn.addEventListener('click', e => {
    e.preventDefault()
    if(entered_ip.value != '' && entered_ip.value != null){
        getIPDetails(entered_ip.value)
        return 
    }
    alert("Enter a Valid IP !!!")

})