let busqueda = document.getElementById("inputBuscar");
let contenedor = document.getElementById("lista");
let btn = document.getElementById("btnBuscar");
let seriesLista = [];

const japflix = {
    render: () => {

        let url = "https://japceibal.github.io/japflix_api/movies-data.json";

        fetch(url)
        .then(response => response.json())
        .then((json)=>{
            console.log(json)
            seriesLista = json;
        })
    }
};

japflix.render(); 

btn.addEventListener("click", (e)=>{
    e.preventDefault();

    let seriesMostrar = seriesLista.filter(elem => 
        elem.title.toLowerCase().includes(busqueda.value.toLowerCase())|| 
        elem.tagline.toLowerCase().includes(busqueda.value.toLowerCase())||
        elem.overview.toLowerCase().includes(busqueda.value.toLowerCase())||
        elem.genres.some(elemento => ((elemento.name.toLowerCase().includes(busqueda.value.toLowerCase()))))
        );

    console.log(seriesMostrar);

    mostrarSeries(seriesMostrar);
});

function mostrarSeries(seriesMostrar){

    let htmlcontenttoAppend = "";
    console.log(seriesMostrar);
    for(i = 0; i < seriesMostrar.length; i++){



        htmlcontenttoAppend += `
        
        <li class="list-group-item list-group-item-action d-flex justify-content-between align-items-start bg-dark p-2 m-0" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" onclick="infoSerie(${seriesMostrar[i].id})">
            <div class="ms-2 me-auto text-white ">
                <div class="fw-bold">${seriesMostrar[i].title}</div>
                <span class="text-muted">${seriesMostrar[i].tagline}</span>
            </div>
            <span class="badge"> ${drawStars((seriesMostrar[i].vote_average)/2)} </span>
        </li>

        `;

    } 
    contenedor.innerHTML = htmlcontenttoAppend;
}

function drawStars(stars) {
    let number = parseInt(stars);
    let htmlContentToAppend = "";

    for (let i = 1; i <= number; i++) { /*Esta variable recorre desde el 1 hasta el número del puntaje marcado.*/
        htmlContentToAppend += `<span class="fa fa-star checked"></span>` /*Estrella pintada.*/
    }
    for (let j = number + 1; j <= 5; j++) { /*Esta variable recorre desde una posición más adelante del puntaje marcado hasta el 5.*/
        htmlContentToAppend += `<span class="fa fa-star"></span>` /*Estrella sin pintar.*/
    }

    return htmlContentToAppend;
}

function infoSerie(seriesMostrar){
    let serie = seriesLista.filter(elem => elem.id === seriesMostrar);
    let generos = serie[0].genres.map(a => a.name);
    let fecha = new Date(serie[0].release_date);

    console.log(fecha);

    let htmlContentToAppend = "";

    htmlContentToAppend += `
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasTopLabel">${serie[0].title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body overflow-visible">
            <p>${serie[0].overview}</p>
            <hr>
            <div class="row overflow-visible">
                <div class="dropdown d-flex col justify-content-between overflow-visible">
                    <p class="text-muted my-auto">${generos.join(" - ")}</p>  
                    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        More info
                    </button>
                    <ul class="dropdown-menu p-2">
                        <li>Year: ${fecha.getFullYear()}</li>
                        <li>Runtime:  ${serie[0].runtime} mins.</li>
                        <li>Budget: $ ${serie[0].budget}</li>
                        <li>Revenue: $ ${serie[0].revenue}</li>
                    </ul>
                </div>
            </div>
        </div>
        
    `;
    document.querySelector("#offcanvasTop").innerHTML = htmlContentToAppend;
}