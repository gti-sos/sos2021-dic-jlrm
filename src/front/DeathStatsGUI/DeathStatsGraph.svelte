<script>
    import {
        onMount,
    } from "svelte";

	import Alert from "sveltestrap/src/Button.svelte";

    let deathStatsData = [];
    let deathStatsChartData = [];
  
  	let deathStatsChartProvince = [];
 	let deathStatsChartYear = [];
 	let deathStatsChartTumor = [];
  	let deathStatsChartRespiratory = [];
	let deathStatsChartCirculatory = [];
  
  
    function distinctRecords(MYJSON, prop) {
      return MYJSON.filter((obj, pos, arr) => {
        return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
      });
    }

    const BASE_API_PATH = "/api/v2";

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

 console.log("Fetching data...");
  
      const res = await fetch(BASE_API_PATH + "/death-stats");
      deathStatsData = await res.json();
  
      if (res.ok) {
        deathStatsData.forEach(stat => {
        deathStatsChartProvince.push(stat.province);
		deathStatsChartYear.push(stat["year"]);
        deathStatsChartTumor.push(stat["tumor"]);
        deathStatsChartRespiratory.push(stat["respiratory_system_disease"]);
        deathStatsChartCirculatory.push(stat["circulatory_system_disease"]);
       
        });
      }
      
      console.log("Death Stat Chart DaTa: " + deathStatsChartData);
Highcharts.chart('container', {

	title: {
		text: 'Estadisticas de muerte por enfermedades en Andalucia'
	},
    subtitle: {
        text: '-------------------'
    },

    yAxis: {
        title: {
            text: 'Muertes'
        },
		categories: deathStatsChartYear,
    },

    xAxis: {
        accessibility: {
            rangeDescription: 'Range: 2010 to 2017'
        },
		categories: deathStatsChartProvince,
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    series: [{
        name: 'Tumor',
        data: deathStatsChartTumor
    }, {
        name: 'Enfermedad del sistema respiratorio',
        data: deathStatsChartRespiratory
    }, {
        name: 'Enfermedad del sistema circulatorio',
        data: deathStatsChartCirculatory
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});
}

</script>

<svelte:head>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/series-label.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js" on:load="{loadGraph}"></script>
</svelte:head>

<main>
  <center><h1>Estadisticas de muerte por enfermedades en Andalucia</h1></center>
<br>

  <br><br>
   <figure class="highcharts-figure">
    <div id="container"></div>
    <p class="highcharts-description">
    </p>
</figure>

</main>

<style>
.highcharts-figure,
.highcharts-data-table table {
    min-width: 360px;
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
