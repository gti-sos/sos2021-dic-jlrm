<script>
    import { Nav, NavItem, NavLink, Alert } from "sveltestrap";
    var errorMsg = "";
    var datos = [];
    const BASE_API_CHILDREN = "https://sos2021-24.herokuapp.com/api/v2/children-employment"
   
    async function loadRentals() {
        console.log("Loading data...");
        const res = await fetch(BASE_API_CHILDREN).then(
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
        const res = await fetch(BASE_API_CHILDREN);
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
   
        var nino = [] ;
		var nina = [] ;
        var country = [] ;
        datos.forEach((ninos) => {
            nino.push(ninos.percent_children_employment_m);
            country.push(ninos.country);
			nina.push(ninos.percent_children_employment_f)
        });
		
		
// Set up the chart
Highcharts.chart('container', {
    chart: {
        type: 'area'
    },
    title: {
        text: 'Fruit consumption *'
    },
    subtitle: {
        text: '* Jane\'s banana consumption is unknown',
        align: 'right',
        verticalAlign: 'bottom'
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 100,
        y: 70,
        floating: true,
        borderWidth: 1,
        backgroundColor:
            Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF'
    },
    xAxis: {
        categories: country
    },
    yAxis: {
        title: {
            text: 'Y-Axis'
        }
    },
    plotOptions: {
        area: {
            fillOpacity: 0.5
        }
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Ninos',
        data: nino
    }, {
        name: 'Ninas',
        data: nina
    }]
});

}

</script>

<svelte:head>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
  <center><h1>Estadísticas de niños empleado por pais</h1></center>
<br>
  <br>
  <Nav>
    <NavItem>
    <NavLink href="/">Página Principal</NavLink>
    </NavItem>
    <NavItem>
    <NavLink href="#/integrations">Integraciones</NavLink>
    </NavItem>
    <NavItem>
        <NavLink href="http://sos2021-24.herokuapp.com/#/children-employment">Cargar Datos Iniciales</NavLink>
        </NavItem>
    </Nav>      
  <br>

<figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
        An area chart showing a gap in the data. By default, Highcharts treats
        <code>null</code> values as missing data, and will allow for gaps in
        datasets.
    </p>
</figure>


</main>

<style>
#container {
    height: 400px;
}

.highcharts-figure,
.highcharts-data-table table {
    min-width: 350px;
    max-width: 800px;
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