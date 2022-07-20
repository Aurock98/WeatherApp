let button = document.querySelector('button')
let input = document.querySelector('input')

//animation

AOS.init();

anime.timeline({loop: false})
  .add({
    targets: '.ml5 .line',
    opacity: [0.5,1],
    scaleX: [0, 1],
    easing: "easeInExpo",
    duration: 700
  }).add({
    targets: '.ml5 .line',
    duration: 600,
    easing: "easeOutExpo",
    translateY: (el, i) => (-0.625 + 0.625*2*i) + "em"
  }).add({
    targets: '.ml5 .ampersand',
    opacity: [0,1],
    scaleY: [0.5, 1],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=600'
  }).add({
    targets: '.ml5 .letters-left',
    opacity: [0,1],
    translateX: ["0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=300'
  }).add({
    targets: '.ml5 .letters-right',
    opacity: [0,1],
    translateX: ["-0.5em", 0],
    easing: "easeOutExpo",
    duration: 600,
    offset: '-=600'
  })


//weather app logic

function cargarCiudad(ciudad) {
    $.getJSON(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&APPID=faeb9fd4d7a74a5189839dc22df4d59e&units=metric&lang=es`, function (data) {
        document.querySelector("#ciudad").textContent = data.name
        document.querySelector("#temperatura").textContent = Math.floor(data.main.temp);
        document.querySelector('#grados').innerHTML = '<sup>°C</sup>'
        console.log(data.main.temp)
        document.querySelector('#wicon').src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
        document.querySelector('#descripcion').textContent = data.weather[0].description;
        document.querySelector(".container").style.visibility = "visible"

    })
    .fail(function() {
        alert("City not found");
    })
}


button.addEventListener('click', function () {
    if (!input.value){
        alert('Debe ingresar una ciudad')
    }else {
        //console.log(input.value.split(' ').join('%20'))
        let ciudad = input.value.split(' ').join('%20');
        input.value= ''; 
        cargarCiudad(ciudad)
    }
})

input.addEventListener('keypress', function(e){
    if (e.key === 'Enter') {
        if (!input.value){
            alert('Debe ingresar una ciudad')
        }else {
            let ciudad = input.value.split(' ').join('%20');
            input.value= ''; 
            cargarCiudad(ciudad)
        }
    }
})
