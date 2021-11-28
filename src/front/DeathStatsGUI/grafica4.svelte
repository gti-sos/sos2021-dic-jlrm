<script>
    import {
        onMount,
    } from "svelte";

	import Alert from "sveltestrap/src/Button.svelte";


    let deathStats = [];
    let newDeathStat ={
        province: "",
        year: "",
		tumor: "",
		circulatory_system_disease: "",
		respiratory_system_disease: ""
    }

    const BASE_API_PATH = "/api/v1";

    async function getDeathStats(){
        console.log("Fetching death stats...");
        const res = await fetch(BASE_API_PATH+"/death-stats");

        if(res.ok){
            console.log("Ok.");
            const json = await res.json();
            deathStats = json;
            console.log(`We have received ${deathStats.length} death stats.`);
        }else{
            console.log("Error!");
        }
    }   

async function loadGraph(){
// Set up the chart
const chart = new Highcharts.Chart({
    chart: {
        renderTo: 'container',
        type: 'column',
        options3d: {
            enabled: true,
            alpha: 15,
            beta: 15,
            depth: 50,
            viewDistance: 25
        }
    },
    title: {
        text: 'Chart rotation demo'
    },
    subtitle: {
        text: 'Test options by dragging the sliders below'
    },
    plotOptions: {
        column: {
            depth: 25
        }
    },
    series: [{
        data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    }]
});

function showValues() {
    document.getElementById('alpha-value').innerHTML = chart.options.chart.options3d.alpha;
    document.getElementById('beta-value').innerHTML = chart.options.chart.options3d.beta;
    document.getElementById('depth-value').innerHTML = chart.options.chart.options3d.depth;
}

// Activate the sliders
document.querySelectorAll('#sliders input').forEach(input => input.addEventListener('input', e => {
    chart.options.chart.options3d[e.target.id] = parseFloat(e.target.value);
    showValues();
    chart.redraw(false);
}));

showValues();

}

</script>

<svelte:head>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts-3d.js"></script><script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
  <center><h1>Estadísticas de muerte por enfermedades en Andalucia</h1></center>
<br>
 <Alert color="secondary">
    La siguiente tabla muestra información sobre las muertes que se han producido en las provincias de Andalucia año
	tras año, en este caso intenta asociar las muertes producidas por enfermedades, como es el caso de muertes por 
	tumor, enfermedades del sistema respiratorio y enfermedades del sistema circulatorio.
  </Alert>
  <br><br>
   <figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
        Chart designed to highlight 3D column chart rendering options.
        Move the sliders below to change the basic 3D settings for the chart.
        3D column charts are generally harder to read than 2D charts, but provide
        an interesting visual effect.
    </p>
    <div id="sliders">
        <table>
            <tr>
                <td><label for="alpha">Alpha Angle</label></td>
                <td><input id="alpha" type="range" min="0" max="45" value="15"/> <span id="alpha-value" class="value"></span></td>
            </tr>
            <tr>
                <td><label for="beta">Beta Angle</label></td>
                <td><input id="beta" type="range" min="-45" max="45" value="15"/> <span id="beta-value" class="value"></span></td>
            </tr>
            <tr>
                <td><label for="depth">Depth</label></td>
                <td><input id="depth" type="range" min="20" max="100" value="50"/> <span id="depth-value" class="value"></span></td>
            </tr>
        </table>
    </div>
</figure>

</main>

<style>
#container {
    height: 400px;
}

.highcharts-figure,
.highcharts-data-table table {
    min-width: 310px;
    max-width: 800px;
    margin: 1em auto;
}

#sliders td input[type="range"] {
    display: inline;
}

#sliders td {
    padding-right: 1em;
    white-space: nowrap;
}

</style>