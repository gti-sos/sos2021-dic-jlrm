<script>
  import { Nav, NavItem, NavLink } from "sveltestrap";
  var errorMsg = "";
  var datos = [];
  const BASE_API_FIN = "https://parallelum.com.br/fipe/api/v1/motos/marcas"
 
  async function loadRentals() {
      console.log("Loading data...");
      const res = await fetch(BASE_API_FIN).then(
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
      const res = await fetch(BASE_API_FIN);
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

	  let data_x = Object.values(datos["coins"]);
         var uno = [];
      var dos = [] ;
      var tres = [] ;
        datos.forEach((x) => {
            uno.push(x["codigo"]);
          
        });
		
      console.log(uno);
      console.log(dos);
      console.log(tres);
      Highcharts.chart('container', {
          chart: {
              type: 'packedbubble',
              height: '100%'
          },
          title: {
              text: 'Uso de la API'
          },
          tooltip: {
              useHTML: true,
              pointFormat: '<b>{point.name}:</b> {point.value} '
          },
          plotOptions: {
              packedbubble: {
                  minSize: '30%',
                  maxSize: '100%',
                  zMin: 0,
                  zMax: 1000,
                  layoutAlgorithm: {
                      splitSeries: false,
                      gravitationalConstant: 0.02
                  },
                  dataLabels: {
                      enabled: true,
                      format: '{point.name}',
                      filter: {
                          property: 'y',
                          operator: '>',
                          value: 250
                      },
                      style: {
                          color: 'black',
                          textOutline: 'none',
                          fontWeight: 'normal'
                      }
                  }
              }
          },
          series:  [{
              name: 'Metros',
              data: uno
          }]
      });
  }        
    
</script>

<svelte:head>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts-more.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js" on:load={loadGraph}></script>
</svelte:head>

<main>
  <Nav>
    <NavItem>
    <NavLink href="/">Página Principal</NavLink>
    </NavItem>
    <NavItem>
    <NavLink href="#/integrations">Integraciones</NavLink>
    </NavItem>
    <NavItem>
      <NavLink href="https://sos2021-07.herokuapp.com/#/rentals">Cargar Datos Iniciales</NavLink>
      </NavItem>
    </Nav>      


      
    <figure class="highcharts-figure">
      <div id="container"></div>
      <p class="highcharts-description">
         
      </p>
  </figure>
  {#if errorMsg}
  <p>{errorMsg}</p>
  {/if}
</main>

<style>
  main {
      text-align: center;
      padding: 30px;       
  }
  p.error{
      color: red; 
      text-align:center;
      font-size: 20px;
      margin-top:80px;
    }
  
  .highcharts-figure, .highcharts-data-table table {
  min-width: 320px; 
  max-width: 800px;
  margin: 1em auto;
}
#container {
  height: 800px;
}
.highcharts-tooltip h3 {
margin: 0.3em 0;
}
.highcharts-data-table table {
font-family: Verdana, sans-serif;
border-collapse: collapse;
border: 1px solid #EBEBEB;
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
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
background: #f8f8f8;
}
.highcharts-data-table tr:hover {
background: #f1f7ff;
}
</style>