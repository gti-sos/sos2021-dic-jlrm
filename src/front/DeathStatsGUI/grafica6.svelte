<script>
  import { Nav, NavItem, NavLink } from "sveltestrap";
    var errorMsg = "";
    var datos = [];
    const BASE_API_COIN = "https://parallelum.com.br/fipe/api/v1/carros/marcas"
     async function loadRentals() {
        console.log("Loading data...");
        const res = await fetch(BASE_API_COIN).then(
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
        const res = await fetch(BASE_API_COIN);
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
        let usd = [] ;
        let btc = [] ;
        datos.forEach((x) => {
			let float_usd = parseInt(x.codigo)
            usd.push(float_usd);
            btc.push(x.nome);
                
        });
        
Highcharts.chart('container', {

    chart: {
        type: 'column',
        styledMode: true
    },

    title: {
        text: 'Styling axes and columns'
    },

    yAxis: [{
        className: 'highcharts-color-0',
        title: {
            text: 'Primary axis'
        }
    }, {
        className: 'highcharts-color-1',
        opposite: true,
        title: {
            text: 'Secondary axis'
        }
    }],

    plotOptions: {
        column: {
            borderRadius: 5
        }
    },

    series: [{
        data: btc
    }, {
        data: usd,
        yAxis: 1
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
  <center><h1>Estadísticas de ansiedad en hombres por año</h1></center>
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

.highcharts-figure,
.highcharts-data-table table {
    min-width: 310px;
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

.highcharts-yaxis .highcharts-axis-line {
    stroke-width: 2px;
}

/* Link the series colors to axis colors */
.highcharts-color-0 {
    fill: #7cb5ec;
    stroke: #7cb5ec;
}

.highcharts-axis.highcharts-color-0 .highcharts-axis-line {
    stroke: #7cb5ec;
}

.highcharts-axis.highcharts-color-0 text {
    fill: #7cb5ec;
}

.highcharts-color-1 {
    fill: #90ed7d;
    stroke: #90ed7d;
}

.highcharts-axis.highcharts-color-1 .highcharts-axis-line {
    stroke: #90ed7d;
}

.highcharts-axis.highcharts-color-1 text {
    fill: #90ed7d;
}


</style>