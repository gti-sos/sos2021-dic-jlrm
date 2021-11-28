<script>
	import Router from 'svelte-spa-router';

	import Landing from './Landing.svelte';
	import DeathStatsHome from './DeathStatsGUI/DeathStatsTable.svelte';
	import DeathStatsEdit from './DeathStatsGUI/DeathStatEdit.svelte';
	import DeathStatsGraph from './DeathStatsGUI/DeathStatsGraph.svelte';
	import DeathStatsGraph2 from './DeathStatsGUI/DeathStatsGraph2.svelte';
	import NotFound from './NotFound.svelte';
	import Info from './Info.svelte';


	const routes = {
		"/": Landing,
		"/death-stats": DeathStatsHome,
		"/death-stats-graph1": DeathStatsGraph,
		"/death-stats-graph2": DeathStatsGraph2,
		"/death-stats/:province/:year": DeathStatsEdit,
		"/info": Info,
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