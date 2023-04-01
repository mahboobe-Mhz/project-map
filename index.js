import axios from "axios";

const select = document.querySelector(`.z-index`)


let config = {
  minZoom: 7,
  maxZoom: 18,
  // transform3DLimit: 2^50,
  // animation:true
  _animatingZoom: true,

};
// magnification with which the map will start
const zoom = 17;
// co-ordinates
const lat = 35.7219;
const lng = 51.3347;

// calling map
let map = L.map("map", config).setView([lat, lng], zoom);

console.log(map);

// Used to load and display tile layers on the map
// Most tile servers require attribution, which you can set under `Layer`
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// map.addEventListener('click', function(e) {
//   let latlong=e.latlng;
//   L.marker([latlong.lat, latlong.lng], {draggable:true}).addTo(map);
// });

// map.on(`mouseup`, (e)=>{
//   let latlong=e.latlng;
//   console.log(latlong);
// })
let states;
axios.get(`https://iran-locations-api.vercel.app/api/v1/states`).then((res)=>{
   states = res.data;
   console.log(states);
   states.forEach(element => {
    
      select.innerHTML+=`
      <option value="${element.name}">${element.name}</option>
      `
   });
})

select.addEventListener(`change`, ()=>{
  const selectedState = states.find(element=>element.name==select.value);
  console.log(selectedState);
  map.move;
  map.flyTo([+selectedState.latitude, +selectedState.longitude], 9, {
    animate: true,
    duration: 10,
  });

  // let map=L.map("map", config).setView([+selectedState.latitude, +selectedState.longitude
  // ], zoom);
  console.log(map);
})
console.log();