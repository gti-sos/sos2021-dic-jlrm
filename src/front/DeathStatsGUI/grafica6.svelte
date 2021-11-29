<script>
   import { Nav, NavItem, NavLink, Alert } from "sveltestrap";
    var errorMsg = "";
    var datos = [];
    const BASE_API_CRYPTO = "https://api.coinstats.app/public/v1/coins"
   
    async function loadRentals() {
        console.log("Loading data...");
        const res = await fetch(BASE_API_CRYPTO).then(
          function (res) {
            if (res.ok) {
              errorMsg = "";
              console.log("OK");
            } else {
              if (res.status === 500) {
                errorMsg = "No se ha podido acceder a la base de datos";
              }
              console.log("ERROR!" + errorMsg);
            }
          }
        );
      }
    
      async function getDatos() {
        console.log("Fetching data...");
        await loadRentals();
        const res = await fetch(BASE_API_CRYPTO);
        if (res.ok) {
          const json = await res.json();
          datos = json;
          console.log(`We have received ${datos.length} stats.`);
          console.log("Ok");
        } else {
          errorMsg = "Error recuperando datos";
          console.log("ERROR!" + errorMsg);
        }
      }

async function loadGraph(){
   await getDatos();
   		let data_c = Object.values(datos["coins"]);
        var volumen = [] ;
        var nombre = [] ;
        data_c.forEach((d) => {
            volumen.push(d["volume"]);
            nombre.push(d["id"]);
        });
		
		
		
// Set up the chart
Highcharts.chart('container', {

    chart: {
        styledMode: true
    },

    title: {
        text: 'Pie point CSS'
    },



    series: [{
        type: 'pie',
        allowPointSelect: true,
        keys: ['name', 'y', 'selected', 'sliced'],
        data: [
            [nombre, volumen, false],
            ['Pears', 71.5, false],
            ['Oranges', 106.4, false],
            ['Plums', 129.2, false],
            ['Bananas', 144.0, false],
            ['Peaches', 176.0, false],
            ['Prunes', 135.6, true, true],
            ['Avocados', 148.5, false]
        ],
        showInLegend: true
    }]
});

}

</script>

<svelte:head>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts-3d.js"></script><script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
  <center><h1>Volumen criptomonedas</h1></center>
<br>
  <br>
  <Nav>
    <NavItem>
    <NavLink href="/">Pagina Principal</NavLink>
    </NavItem>
    <NavItem>
    <NavLink href="#/integrations">Integraciones</NavLink>
    </NavItem>
    <NavItem>
        <NavLink href="https://sos2021-sep-jpcc.herokuapp.com/#/anxiety_stats">Cargar Datos Iniciales</NavLink>
        </NavItem>
    </Nav>      
  <br>
<figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
      
    </p>
</figure>


</main>

<style>
@import "https://code.highcharts.com/css/highcharts.css";

.highcharts-pie-series .highcharts-point {
    stroke: #ede;
    stroke-width: 2px;
}

.highcharts-pie-series .highcharts-data-label-connector {
    stroke: silver;
    stroke-dasharray: 2, 2;
    stroke-width: 2px;
}

.highcharts-figure,
.highcharts-data-table table {
    min-width: 320px;
    max-width: 600px;
    margin: 1em auto;
}

.highcharts-data-table table {
    font-family: Verdana, sans-serif;
    border-collapse: collapse;
    border: 1px solid #ebebeb;
    margin: 10px auto;
    text-align: center;
    width: 100%;
    max-width: 500px;
}

.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}

.highcharts-data-table th {
    font-weight: 600;
    padding: 0.5em;
}

.highcharts-data-table td,
.highcharts-data-table th,
.highcharts-data-table caption {
    padding: 0.5em;
}

.highcharts-data-table thead tr,
.highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}

.highcharts-data-table tr:hover {
    background: #f1f7ff;
}


</style>