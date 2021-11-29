<script>
    import { onMount } from "svelte";
    import { pop } from "svelte-spa-router";
    import Table from "sveltestrap/src/Table.svelte";
    import Button from "sveltestrap/src/Button.svelte";
    import Input from "sveltestrap/src/Input.svelte";
	import { Toast, ToastBody, ToastHeader, Alert } from 'sveltestrap';
    import Label from "sveltestrap/src/Label.svelte";
    import FormGroup from "sveltestrap/src/FormGroup.svelte";
    import { Pagination, PaginationItem, PaginationLink } from "sveltestrap";
    let deathStat = [];
    let newDeathStat = {
        province: "",
        year: "",
        tumor: 0.0,
        circulatory_system_disease: 0.0,
        respiratory_system_disease: 0.0,
    };
    let provinces = [];
    let years = [];
    let actualProvince = "";
    let actualYear = "";
    // Paginación
    let elementPage = 10;
    let offset = 0;
    let actualPage = 1;
    let moreData = true;
    let okMsg = false;
    let errorMsg = false;
    onMount(getdeathStatProvinceYear);
    onMount(getdeathStat);
    async function getdeathStatProvinceYear() {
        const res = await fetch("/api/v2/death-stats");
        if (res.ok) {
            const json = await res.json();
            provinces = json.map((c) => {
                return c.province;
            });
            provinces = Array.from(new Set(provinces));
            years = json.map((c) => {
                return c.year;
            });
            years = Array.from(new Set(years));
        } else {
            console.log("ERROR");
        }
    }
    async function getdeathStat() {
        console.log("Fetching deathStat_stats...");
        const res = await fetch(
            "/api/v2/death-stats?offset=" +
                elementPage * offset +
                "&limit=" +
                elementPage
        );
        const nextPage = await fetch(
            "/api/v2/death-stats?offset=" +
                elementPage * (offset + 1) +
                "&limit=" +
                elementPage
        );
        if (res.ok && nextPage.ok) {
            console.log("Ok");
            const json = await res.json();
            const jsonNext = await nextPage.json();
            deathStat = json;
            if (jsonNext.length == 0) {
                moreData = false;
            } else {
                moreData = true;
            }
        } else {
            console.log("ERROR");
        }
    }
    async function insertdeathStat() {
        console.log(
            "Insertando deathStat_stats..." + JSON.stringify(newDeathStat)
        );
        if (
            isNaN(newDeathStat.year) ||
            isNaN(newDeathStat.tumor) ||
            isNaN(newDeathStat.circulatory_system_disease) ||
            isNaN(newDeathStat.respiratory_system_disease) ||
            newDeathStat.province === "" ||
            newDeathStat.year === ""
        ) {
            console.log("Uno o más datos NO son numéricos");
            okMsg = false;
            errorMsg =
                "No puede introducir campos en blanco o campos que no sean numéricos";
        } else {
            const res = await fetch("/api/v2/death-stats", {
                method: "POST",
                body: JSON.stringify(newDeathStat),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(function (res) {
                if (res.ok) {
                    getdeathStat();
                    okMsg = "Dato introducido de forma exitosa";
                    errorMsg = false;
                } else {
                    okMsg = false;
                    errorMsg =
                        "No puede introducirse un dato con mismo año y país debido a que ya existe uno en la base de datos";
                }
            });
        }
    }
    async function deletedeathStat(province, year) {
        const res = await fetch(
            "/api/v2/death-stats/" + province + "/" + year,
            {
                method: "DELETE",
            }
        ).then(function (res) {
            getdeathStat();
            getdeathStatProvinceYear();
        });
        okMsg = "Dato borrado de forma exitosa";
        errorMsg = false;
    }
    async function deletedeathStatData() {
        const res = await fetch("/api/v2/death-stats", {
            method: "DELETE",
        }).then(function (res) {
            getdeathStat();
            getdeathStatProvinceYear();
        });
        okMsg = "Todos los datos han sido borrados de forma exitosa";
        errorMsg = false;
    }
    async function loadInitialDatadeathStat() {
        const res = await fetch(
            "/api/v2/death-stats/loadInitialData"
        ).then(function (res) {
            getdeathStat();
        });
        okMsg = "Los datos iniciales han sido cargados de forma exitosa";
        errorMsg = false;
    }
    // Búsqueda
    async function searchdeathStat(province, year) {
        var url = "/api/v2/death-stats";
        if (province != "" && year != "") {
            url = url + "?year=" + year + "&province=" + province;
        } else if (province != "" && year == "") {
            url = url + "?province=" + province;
        } else if (province == "" && year != "") {
            url = url + "?year=" + year;
        }
        const res = await fetch(url);
        if (res.ok) {
            const json = await res.json();
            deathStat = json;
            if (deathStat.length > 0) {
                okMsg = "Se ha encontrado uno o varios resultados";
                errorMsg = false;
            } else {
                okMsg = false;
                errorMsg = "No se ha obtenido ningún resultado";
            }
        } else {
            console.log("ERROR");
        }
    }
    async function addOffSet(inc) {
        offset += inc;
        actualPage += inc;
        getdeathStat();
    }
</script>

<main>
<center><h1>Estadísticas de muerte por enfermedades en Andalucia</h1></center>
<br>
 <Alert color="secondary">
    La siguiente tabla muestra información sobre las muertes que se han producido en las provincias de Andalucia año
	tras año, en este caso intenta asociar las muertes producidas por enfermedades, como es el caso de muertes por 
	tumor, enfermedades del sistema respiratorio y enfermedades del sistema circulatorio.
  </Alert>
    {#await deathStat}
        Loading deathStat stats...
    {:then deathStat}
        <div class="col p-3 bg-dark mb-3" style="border-radius:4px">
            <div class="row">
                <div class="col-4">
                    <Toast class="me-1">
					<FormGroup>
      <ToastHeader><Label for="selectProvince"><b>Búsqueda por provincia</b></Label></ToastHeader>
      <ToastBody>
                        <Input
                            name="selectProvince"
                            id="selectProvince"
                            bind:value={actualProvince}
                        >
                            {#each provinces as province}
                                <option>{province}</option>
                            {/each}
                            <option>-</option>
                        </Input>
                    
      </ToastBody>
   </FormGroup> </Toast>
                </div>
                <div class="col-4">
                    <Toast class="me-1">
					<FormGroup>
      					<ToastHeader>
                        <Label for="selectYear"><b>Búsqueda por año</b></Label>
						</ToastHeader>
						<ToastBody>
                        <Input
                            name="selectYear"
                            id="selectYear"
                            bind:value={actualYear}
                        >
                            {#each years as year}
                                <option>{year}</option>
                            {/each}
                            <option>-</option>
                        </Input>
						</ToastBody>
                    </FormGroup></Toast>
                </div>
                <div style="text-align:center; width:100px; ">
                    <Button
                        outline
                        style="font-size: 16px;border-radius: 4px;background-color: white; color:black; height:60px;"
                        on:click={searchdeathStat(actualProvince, actualYear)}
                        class="button-search"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-search"
                            viewBox="0 0 16 16"
                        >
                            <path
                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"
                            />
                        </svg>
                        Buscar
                    </Button>
                </div>
            </div>
        </div>

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
            <tbody style="color:white;text-align:center;">
                <tr>
                    <td>
                        <Input
                            id="province"
                            type="text"
                            placeholder="Introduzca una provincia"
                            bind:value={newDeathStat.province}
                        /></td
                    >
                    <td>
                        <Input
                            id="year"
                            type="number"
                            placeholder="Introduzca un año"
                            bind:value={newDeathStat.year}
                        /></td
                    >
                    <td>
                        <Input
                            id="tumor"
                            type="number"
                            placeholder="Sólo caracteres numéricos"
                            step="1"
                            min="1"
                            bind:value={newDeathStat.tumor}
                        />
                    </td>
                    <td>
                        <Input
                            id="circulatory_system_disease"
                            type="number"
                            placeholder="Sólo caracteres numéricos"
                            step="1"
                            min="1"
                            bind:value={newDeathStat.circulatory_system_disease}
                        /></td
                    >
                    <td>
                        <Input
                            id="respiratory_system_disease"
                            type="number"
                            placeholder="Sólo caracteres numéricos"
                            step="1"
                            min="1"
                            bind:value={newDeathStat.respiratory_system_disease}
                        /></td
                    >
                    <td>
                        <Button
                            id="addDeathStat"
                            outline
                            color="btn btn-primary"
                            on:click={insertdeathStat}
                        >
                            Insertar
                        </Button>
                    </td>
                </tr>
                {#each deathStat as deathStatStat}
                    <tr>
                        <td>
                            <a
                                href="#/death-stats/{deathStatStat.province}/{deathStatStat.year}"
                            >
                                {deathStatStat.province}
                            </a>
                        </td>
                        <td> {deathStatStat.year} </td>
                        <td> {deathStatStat.tumor} </td>
                        <td> {deathStatStat.circulatory_system_disease} </td>
                        <td> {deathStatStat.respiratory_system_disease} </td>
                        <td>
                            <Button
                                outline
                                color="danger"
                                on:click={deletedeathStat(
                                    deathStatStat.province,
                                    deathStatStat.year
                                )}
                            >
                                Borrar
                            </Button>
                        </td>
                    </tr>
                {/each}
            </tbody>
        </Table>
    {/await}

    <Pagination style="float:right;" ariaLabel="Cambio de página">
        <PaginationItem class={actualPage === 1 ? "disabled" : ""}>
            <PaginationLink
                previous
                href="#/death-stats"
                on:click={() => addOffSet(-1)}
            />
        </PaginationItem>

        {#if actualPage != 1}
            <PaginationItem>
                <PaginationLink
                    href="#/death-stats"
                    on:click={() => addOffSet(-1)}
                    >{actualPage - 1}</PaginationLink
                >
            </PaginationItem>
        {/if}
        <PaginationItem active>
            <PaginationLink href="#/death-stats"
                >{actualPage}</PaginationLink
            >
        </PaginationItem>

        {#if moreData}
            <PaginationItem>
                <PaginationLink
                    href="#/death-stats"
                    on:click={() => addOffSet(1)}
                    >{actualPage + 1}</PaginationLink
                >
            </PaginationItem>
        {/if}

        <PaginationItem class={moreData ? "" : "disabled"}>
            <PaginationLink
                next
                href="#/death-stats"
                on:click={() => addOffSet(1)}
            />
        </PaginationItem>
    </Pagination>
    {#if errorMsg}
        <p style="color: red">ERROR: {errorMsg}</p>
    {/if}
    {#if okMsg}
        <p style="color: green">ÉXITO: {okMsg}</p>
    {/if}

    <Button
        style="font-size: 16px;border-radius: 4px;background-color:black; color:white"
        outline
        color="btn btn-info"
        on:click={pop}
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-arrow-return-left"
            viewBox="0 0 16 16"
        >
            <path
                fill-rule="evenodd"
                d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"
            />
        </svg>
        Atrás
    </Button>

    <Button
        style="font-size: 16px;border-radius: 4px;background-color: #000000;"
        outline
        color="btn btn-primary"
        on:click={loadInitialDatadeathStat}>Cargar datos iniciales</Button
    >
    <Button
        style="font-size: 16px;border-radius: 4px;background-color: danger;"
        outline
        on:click={deletedeathStatData}
        color="btn btn-danger"
    >
        Borrar todo

        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-trash2-fill"
            viewBox="0 0 16 16"
        >
            <path
                d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"
            />
        </svg>
    </Button>
</main>