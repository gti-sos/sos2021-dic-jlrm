<script>
    import {
        onMount,
    } from "svelte";

    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
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

    async function insertDeathStat(){
        console.log("Inserting death stat "+ JSON.stringify(newDeathStat));

        const res = await fetch(BASE_API_PATH+"/death-stats",
                            {
                                method: "POST",
                                body: JSON.stringify(newDeathStat),
                                headers:{
                                    "Content-Type": "application/json"
                                }
                            }
                           ).then( (res) => {
                               getDeathStats();
                           })
    }
    
    async function deleteDeathStat(province, year){
        console.log("Deleting death stat with name "+ province + "and year" + year);

        const res = await fetch(BASE_API_PATH+ "/death-stats/" + province + "/" + year,
                            {
                                method: "DELETE"
                            }
                           ).then( (res) => {
                               getDeathStats();
                           })
    }
    onMount(getDeathStats);
</script>

 


<main>
  <center><h1>Estadísticas de muerte por enfermedades en Andalucia</h1></center>
<br>
 <Alert color="secondary">
    La siguiente tabla muestra información sobre las muertes que se han producido en las provincias de Andalucia año
	tras año, en este caso intenta asociar las muertes producidas por enfermedades, como es el caso de muertes por 
	tumor, enfermedades del sistema respiratorio y enfermedades del sistema circulatorio.
  </Alert>
  <br><br>
    <Table bordered>
        <thead>
            <tr>
                <th>Provincia</th>
                <th>Año</th>
				<th>Tumor</th>
                <th>Enfermedad circulatoria</th>
                <th>Enfermedad respiratoria</th>
                <th>Acción</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><input bind:value="{newDeathStat.province}"></td>
                <td><input bind:value="{newDeathStat.year}"></td>
				<td><input bind:value="{newDeathStat.tumor}"></td>
                <td><input bind:value="{newDeathStat.circulatory_system_disease}"></td>
                <td><input bind:value="{newDeathStat.respiratory_system_disease}"></td>
                <td><Button on:click={insertDeathStat}>Insertar</Button></td>
            </tr>
            {#each deathStats as deathStat}
                <tr>
                    <td><a href="#/death-stats/{deathStat.province}/{deathStat.year}">{deathStat.province}</a></td>
                    <td>{deathStat.year}</td>
					<td>{deathStat.tumor}</td>
					<td>{deathStat.circulatory_system_disease}</td>
                    <td>{deathStat.respiratory_system_disease}</td>
                    <td><Button on:click={deleteDeathStat(deathStat.province,deathStat.year)}>Borrar</Button></td>
                </tr>
            {/each}
        </tbody>
    </Table>
</main>
