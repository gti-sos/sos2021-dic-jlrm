<script>
   import { Nav, NavItem, NavLink, Alert } from "sveltestrap";
    var errorMsg = "";
    var datos = [];
    const BASE_API_ANXIETY = "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
   
    async function loadRentals() {
        console.log("Loading data...");
        const res = await fetch(BASE_API_ANXIETY).then(
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
        const res = await fetch(BASE_API_ANXIETY);
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
   	    let json = await res.json();
   		let data_us = json;
   		let data_us = Object.values(data_us["data"]);
        var plata = [] ;
        var country = [] ;
        data_us.forEach((anxiety) => {
            plata.push(anxiety.Population);
            country.push(anxiety.Year);
        });
		
		
		
// Set up the chart
Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Candidatas por fase de vacuna covid'
    },
    subtitle: {
        text: '-------'
    },
    xAxis: {
        categories: country,
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Rainfall (mm)'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'China',
        data: plata
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
  <center><h1>Candidatas por fase de vacuna covid</h1></center>
<br>
  <br>
  <Nav>
    <NavItem>
    <NavLink href="/">Pรกgina Principal</NavLink>
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
.highcharts-figure,
.highcharts-data-table table {
    min-width: 310px;
    max-width: 800px;
    margin: 1em auto;
}

#container {
    height: 400px;
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