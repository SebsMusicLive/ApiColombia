const informacionColombia = async () => {
    try {
        const respuesta = await fetch('https://api-colombia.com/api/v1/Country/Colombia');
        console.log(respuesta);

        if (respuesta.status == 200) {
            const datos = await respuesta.json();
            for (let i = 0; i < datos.flags.length; i++) {
                document.getElementById("logo").innerHTML = `<img src = "` + datos.flags[i] + `" class="logo-img">`;

            }

            document.getElementById('container-information').innerHTML =
                `<h1 class=name-country>${datos.name}</h1>`
                + `<p class=description>${datos.description}</p>`
                + `<p class=date> <i class="bi bi-arrow-right"></i> Capital: ${datos.stateCapital}</p>`
                + `<p class=date> <i class="bi bi-arrow-right"></i> Superficie: ${datos.surface}</p>`
                + `<p class=date> <i class="bi bi-arrow-right"></i> Población: ${datos.population}</p>`
                + `<p class=date> <i class="bi bi-arrow-right"></i> Lenguajes: ${datos.languages}</p>`
                + `<p class=date> <i class="bi bi-arrow-right"></i> Zona horaria: ${datos.timeZone}</p>`
                + `<p class=date> <i class="bi bi-arrow-right"></i> Moneda: ${datos.currency}</p>`
                + `<p class=date> <i class="bi bi-arrow-right"></i> Código moneda: ${datos.currencyCode}</p>`
                + `<p class=date> <i class="bi bi-arrow-right"></i> Símbolo moneda: ${datos.currencySymbol}</p>`
                + `<p class=date> <i class="bi bi-arrow-right"></i> Dominio de internet: ${datos.internetDomain}</p>`
                + `<p class=date> <i class="bi bi-arrow-right"></i> Prefijo de teléfono: ${datos.phonePrefix}</p>`
                + `<p class=date> <i class="bi bi-arrow-right"></i> Prefijo de radio: ${datos.radioPrefix}</p>`
                + `<p class=date> <i class="bi bi-arrow-right"></i> Prefijo de señal: ${datos.aircraftPrefix}</p>`
                + `<p class=date> <i class="bi bi-arrow-right"></i> Subcontinente: ${datos.subRegion}</p>`
                + `<p class=date> <i class="bi bi-arrow-right"></i> Continente: ${datos.region}</p>`
                + `<p class=date> <i class="bi bi-arrow-right"></i> Fronteras: ${datos.borders}</p>`;
        } else if (respuesta.status == 401) {
            console.log('No se puede obtener información');
        } else if (respuesta.status == 404) {
            console.log('La información que buscas no existe');
        } else {
            console.log('Hubo un error');
        }
    }
    catch (error) {
        console.log(error);
    }
}

informacionColombia();

function obtenerRegion() {
    var region = frmDatos.regiones.value;
    if (region == "caribe")
        url = "https://api-colombia.com/api/v1/Region/1";
    if (region == "pacifico")
        url = "https://api-colombia.com/api/v1/Region/2";
    if (region == "orinoquia")
        url = "https://api-colombia.com/api/v1/Region/3";
    if (region == "amazonia")
        url = "https://api-colombia.com/api/v1/Region/4";
    if (region == "andina")
        url = "https://api-colombia.com/api/v1/Region/5";
    if (region == "insular")
        url = "https://api-colombia.com/api/v1/Region/6";


    ejecutarRegion(url);
}

function obtenerDepartamentos() {
    var departamento = frmDatos.regiones.value;
    if (departamento == "caribe")
        urlD = "https://api-colombia.com/api/v1/Region/1/departments";
    if (departamento == "pacifico")
        urlD = "https://api-colombia.com/api/v1/Region/2/departments";
    if (departamento == "orinoquia")
        urlD = "https://api-colombia.com/api/v1/Region/3/departments";
    if (departamento == "amazonia")
        urlD = "https://api-colombia.com/api/v1/Region/4/departments";
    if (departamento == "andina")
        urlD = "https://api-colombia.com/api/v1/Region/5/departments";
    if (departamento == "insular")
        urlD = "https://api-colombia.com/api/v1/Region/6/departments";


    ejecutarDepartamentos(urlD);
}

function obtenerDepartamentosID(){

}

function ejecutarRegion(url) {
    fetch(url)
        .then(response => response.json())
        .then(datos => mostrarDatos(datos))
        .catch(error => console.log(error))

    const mostrarDatos = (datos) => {
        console.log(datos.name);

        document.getElementById('divRta').innerHTML =
            `<h1 class=tittle-region>${datos.name}</h1>`
            + `<p class=description-region>${datos.description}</p>`
            + `<input type="button" value="Ver departamentos" onclick="obtenerDepartamentos()" />`;
    }


}

function ejecutarDepartamentos(url) {
    fetch(url)
        .then(response => response.json())
        .then(datos => mostrarDatos(datos))
        .catch(error => console.log(error))

    const mostrarDatos = (datos) => {
        console.log(datos.departments.length);
        var rta ="";
        var strU = url+="/";
        var id = 1;
        
        for (let i = 0; i < datos.departments.length; i++) {
            
            if (datos.departments[i] != undefined) {
                strU += id;
                id++;
                console.log(strU);
                rta += `<h1 class=tittle-departments>${datos.departments[i].name}</h1>`
                +`<p class=description-departments>${datos.departments[i].description}</p>`
                +`<p class=cityCapitalId-departments>${datos.departments[i].cityCapitalId}</p>`
                +`<p class=municipalities-departments>${datos.departments[i].municipalities}</p>`
                +`<p class=surface-departments>${datos.departments[i].surface}</p>`
                +`<p class=phonePrefix-departments>${datos.departments[i].phonePrefix}</p>`
                +`<p class=countryId-departments>${datos.departments[i].countryId}</p>`
                +`<p class=cityCapital-departments>${datos.departments[i].cityCapital}</p>`
                +`<p class=country-departments>${datos.departments[i].country}</p>`
                +`<p class=cities-departments>${datos.departments[i].cities}</p>`
                +`<p class=regionId-departments>${datos.departments[i].regionId}</p>`
                +`<p class=region-departments>${datos.departments[i].region}</p>`
                +`<p class=naturalAreas-departments>${datos.departments[i].naturalAreas}</p>`
                +`<p class=maps-departments>${datos.departments[i].maps}</p>`;
            }
        }
        document.getElementById("departments").innerHTML = rta;
    }
}