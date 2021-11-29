<script>
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import { Button, Table } from "sveltestrap";
    const API_DEATH_STATS = "/api/v2/death-stats"; //tiene que llamar a la API para tratar los datos
    export let params = {};
    let deathStat = {};
    let updatedProvince = "";
    let updatedYear = 0;
    let updatedTumor = 0.0;
    let updatedCirculatory = 0.0;
    let updatedRespiratory = 0.0;
    let errorMsg = "";
    let correctMsg = "";
    onMount(getdeathStat);
    async function getdeathStat() {
        console.log("Fetching data...");
        const res = await fetch(
            API_DEATH_STATS + "/" + params.province + "/" + params.year
        );
        if (res.ok) {
            console.log("Ok:");
            const json = await res.json();
            deathStat = json;
            updatedProvince = deathStat.province;
            updatedYear = deathStat.year;
            updatedTumor = deathStat["tumor"];
            updatedCirculatory = deathStat["circulatory_system_disease"];
            updatedRespiratory =
                deathStat["respiratory_system_disease"];
            console.log("Received data.");
        } else if (res.status == 404) {
            errorMsg = "No se encuentra el dato a editar.";
            console.log("ERROR. " + errorMsg);
        } else {
            //res.status ===500)
            errorMsg = "No se ha podido acceder a la base de datos";
            console.log("ERROR. " + errorMsg);
        }
    }
    async function updatedeathStat() {
        console.log("Updating data..." + params.province + " " + params.year);
        const res = await fetch(
            API_DEATH_STATS + "/" + params.province + "/" + params.year,
            {
                method: "PUT",
                body: JSON.stringify({
                    province: params.province,
                    year: parseInt(params.year),
                    tumor: updatedTumor,
                    circulatory_system_disease: updatedCirculatory,
                    respiratory_system_disease: updatedRespiratory,
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        ).then(function (res) {
            if (res.ok) {
                console.log("Ok. ");
                errorMsg = "";
                correctMsg = `El dato de la provincia de ${params.province} para el año: ${params.year} ha sido actualizado correctamente.`;
                getdeathStat();
            } else if (res.status == 404) {
                errorMsg = "El dato que intenta editar no existe.";
            } else if (res.status == 500) {
                errorMsg = "Error accediendo a la base de datos.";
            }
        });
    }
</script>

<main>
    <h3>Editando <strong>{params.province}</strong> en el año <strong>{params.year}</strong></h3>
    <div id="update">
        <Table responsive dark bordered>
            <thead>
                <tr>
                    <th>Provincia</th>
                    <th>Año</th>
                    <th>Muertes por tumor</th>
                    <th>Muertes por enfermedades del sistema circulatorio</th>
                    <th>Muertes por enfermedades del sistema respiratorio</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{updatedProvince}</td>
                    <td>{updatedYear}</td>
                    <td
                        ><input
                            type="number"
                            placeholder="0"
                            min="0"
                            bind:value={updatedTumor}
                        />
                    </td>
                    <td
                        ><input
                            type="number"
                            placeholder="0"
                            min="0"
                            bind:value={updatedCirculatory}
                        /></td
                    >
                    <td
                        ><input
                            type="number"
                            placeholder="0"
                            min="0"
                            bind:value={updatedRespiratory}
                        />
                    </td>
                    <td>
                        <Button
                            color="primary"
                            on:click={() => updatedeathStat()}
                        >
                            Actualizar
                        </Button></td
                    >
                </tr>
            </tbody>
        </Table>
        <Button style="background-color:black; color:white" on:click={pop}>Volver</Button>
    </div>

    {#if errorMsg}
        <p style="color: red; text-align:center; font-size: 20px;">
            ERROR: {errorMsg}
        </p>
    {/if}

    {#if correctMsg}
        <p style="color: green; text-align:center; font-size: 20px;">
            {correctMsg}
        </p>
    {/if}
</main>