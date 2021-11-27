<script>
    import {
        onMount
    } from "svelte";

    import {
        pop
    } from "svelte-spa-router";


    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";

    export let params = {};
    let deathStat = {};
    let updatedProvince = "XXXX";
    let updatedYear = 12345;
	let updatedTumor = 12345;
    let updatedCirculatory = 12345;
	let updatedRespiratory = 12345;

    let errorMsg = "";

    onMount(getDeathStat);

    async function getDeathStat() {

        console.log("Fetching death stact...");
        const res = await fetch("/api/v1/death-stats/" + params.provinceName);

        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            deathStat = json;
            updatedProvince = deathStat.province;
            updatedYear = deathStat.year;
			updatedTumor = deathStat.tumor;
            updatedCirculatory = deathStat.circulatory_system_disease;
            updatedRespiratory = deathStat.respiratory_system_disease;
            console.log("Received death stat.");
        } else {
            errorMsg = res.status + ": " + res.statusText;
            console.log("ERROR!" + errorMsg);
        }
    }


    async function updateDeathStat() {

        console.log("Updating death stat..." + JSON.stringify(params.provinceName));

        const res = await fetch("/api/v1/death-stats/" + params.provinceName, {
            method: "PUT",
            body: JSON.stringify({
                province: params.provinceName,
                year: updatedYear,
				tumor: updatedTumor,
                respiratory_system_disease: updatedRespiratory,
                circulatory_system_disease: updatedCirculatory
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(function (res) {
            getDeathStat();
        });



    }
</script>
<main>
    <h3>Edit Death Stat <strong>{params.provinceName}</strong></h3>
        <Table bordered>
            <thead>
                <tr>
                    <th>Provincia</th>
                    <th>Año</th>
                    <th>Tumor</th>
					<th>Enfermedad del sistema respiratorio</th>
                    <th>Enfermedad del sistema circulatorio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{updatedProvince}</td>
                    <td><input bind:value="{updatedYear}"></td>
					<td><input bind:value="{updatedTumor}"></td>
                    <td><input bind:value="{updatedRespiratory}"></td>
                    <td><input bind:value="{updatedCirculatory}"></td>
                    <td> <Button outline color="primary" on:click={updateDeathStat}>Actualizar</Button> </td>
                </tr>
        </tbody>
        </Table>
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    <Button outline color="secondary" on:click="{pop}">Back</Button>
</main>