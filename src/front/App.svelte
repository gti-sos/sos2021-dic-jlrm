<script>
	import Router from 'svelte-spa-router';

	import Landing from './Landing.svelte';
	import DeathStatsHome from './DeathStatsGUI/DeathStatsTable.svelte';
	import DeathStatsEdit from './DeathStatsGUI/DeathStatEdit.svelte';
	import DeathStatsGraph from './DeathStatsGUI/DeathStatsGraph.svelte';
	import Graph2 from './DeathStatsGUI/DeathStatsGraph2.svelte';
	import Graph3 from './DeathStatsGUI/grafica3.svelte';
	import Graph4 from './DeathStatsGUI/grafica4.svelte';
	import Graph5 from './DeathStatsGUI/grafica5.svelte';
	import Graph6 from './DeathStatsGUI/grafica6.svelte';
	import NotFound from './NotFound.svelte';
	import Info from './Info.svelte';
	import Integrations from './NotFound.svelte';


	const routes = {
		"/": Landing,
		"/death-stats": DeathStatsHome,
		"/death-stats-graph1": DeathStatsGraph,
		"/graph2": Graph2,
		"/graph3": Graph3,
		"/graph4": Graph4,
		"/graph5": Graph5,
		"/graph6": Graph6,
		"/death-stats/:province/:year": DeathStatsEdit,
		"/info": Info,
		"/integrations": Integrations,
		"*": NotFound
	};
	
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from 'sveltestrap';

  let isOpen = false;

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
</script>

<Navbar color="dark" dark expand="md">
  <NavbarBrand href="/">Estadisticas de muerte - Andalucia</NavbarBrand>
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="mr-auto" navbar>
	 <Dropdown nav inNavbar>
        <DropdownToggle nav caret>API</DropdownToggle>
        <DropdownMenu end>
          <DropdownItem><a href="#/death-stats">Tabla de la API</a></DropdownItem>
          <DropdownItem><a href="#/death-stats-graph1">Grafico de la API</a></DropdownItem>
          <DropdownItem><a href="#/graph3">Grafico Integrado</a></DropdownItem>
	      <DropdownItem><a href="#/graph2">Grafico Usado 1</a></DropdownItem>
          <DropdownItem><a href="#/graph4">Grafico Usado 2</a></DropdownItem>
          <DropdownItem><a href="#/graph5">Grafico Externo 1</a></DropdownItem>
		  <DropdownItem><a href="#/graph6">Grafico Externo 2</a></DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Documentacion POSTMAN</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <NavItem>
        <NavLink href="#/info/">Informacion</NavLink>
      </NavItem>
    </Nav>
  </Collapse>
</Navbar>

<body>
	<div class="maincontainer">
		<Router {routes} />
	</div>
</body>