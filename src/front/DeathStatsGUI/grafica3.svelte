<script>
    
    import { Nav, NavItem, NavLink } from "sveltestrap";
    import { pop } from "svelte-spa-router";
    var miAPI = "https://sos2021-dic-jlrm.herokuapp.com/api/v2/death-stats";
    var API2 = "https://sos2021-sep-arc.herokuapp.com/api/v2/schizophrenia-stats";
    async function loadGraph(){
        let dataG2 = [];
        let myData = [];
        let province=[];
        let circulatory = [];
        let respiratory = [];
        let country = [];
        let schizophrenia_men = [];
        let schizophrenia_population =[];
               
        const resDataG2 = await fetch(API2);
        const resData = await fetch(miAPI);
        myData = await resData.json();
        dataG2 = await resDataG2.json();
        province = myData.map((myData)=> (myData.province));
        circulatory = myData.map((myData)=> parseFloat(myData.circulatory_system_disease));
        respiratory = myData.map((myData)=> parseFloat(myData.respiratory_system_disease));
        
        country = dataG2.map((dataG2)=> dataG2.country);
        schizophrenia_men = dataG2.map((dataG2)=> parseInt(dataG2.schizophrenia_men));
        schizophrenia_population = dataG2.map((dataG2)=> parseInt(dataG2.schizophrenia_population));
        
        dataG2.forEach((e) => {
          
        country.push(e.country);
        schizophrenia_men.push(e.schizophrenia_men);
        schizophrenia_population.push(e.schizophrenia_population);
        });
      /*  myData.forEach((f) => {
          
    province.push(f.province);
    respiratory.push(f.respiratory_system_disease);
    circulatory.push(f.circulatory_system_disease);
});*/
        
    
        console.log(province);
        console.log(country);
        console.log(respiratory);
        console.log(circulatory);
        console.log(schizophrenia_men);
        console.log(schizophrenia_population);
        var trace1 = {
        
        x: country,
        y: parseInt(schizophrenia_men),
        mode: 'markers',
        type: 'scatter',
        name: 'Datos de esquizofrenia',
        text: parseInt(schizophrenia_population),
        marker: { size: 12 }
        };
        var trace2 = {
        x: province,
        y: parseInt(circulatory),
        mode: 'markers',
        type: 'scatter',
        name: 'Datos de muertes en Andalucia',
        text: respiratory,
        marker: { size: 12 }
        };
        var data = [ trace1, trace2];
        var layout = {
        xaxis: {
            range: schizophrenia_men
        },
        yaxis: {
            range: [0, 100]
        },
        title:''
        };
        Plotly.newPlot('myDiv', data, layout);
}
</script>

<svelte:head>
    <script src='https://cdn.plot.ly/plotly-2.0.0-rc.2.min.js' on:load="{loadGraph}"></script>
</svelte:head>


<main>
    
    <h3 style="text-align: center;"> Integración 4 Juegos de azar</h3>

    <div id="myDiv"></div>
    <Nav>
        <NavItem>
        <NavLink href="/">Página Principal</NavLink>
        </NavItem>
        <NavItem>
        <NavLink href="#/integrations">Integraciones</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="https://sos2021-sep-mcc.herokuapp.com/#/psychology-stats">Cargar Datos Iniciales Míos</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="https://sos2021-27.herokuapp.com/#/azar-games-and-bet-activities">Cargar Datos Iniciales Compañero</NavLink>
                </NavItem>
        </Nav> 
    
</main>