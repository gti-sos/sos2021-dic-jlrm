<script>
 import {
	Col, Container, Row, Button, ButtonGroup, Image
  } from 'sveltestrap';
  
</script>
<main>
	<center><h1>Muertes por enfermedades en las provincias de Andalucía por Año</h1></center>
	<br>
<Container style="background-color:#121212; color:white; border-radius:4px; padding: 20px">
	<center>
	<Image fluid alt="mapa" src="./images/mapa.png" />
</center>
	<br>
  <Row>
    <Col><center>
<ButtonGroup>
  <a href="/#/death-stats"><Button light style="margin:2px;">Tabla de la API</Button></a>
  <a href="/#/death-stats-graph1"><Button light style="margin:2px;">Grafico de la API</Button></a>
  <a href="#/graph3"><Button light style="margin:2px;">Grafico integrado</Button></a>
  <a href="#/graph2"><Button light style="margin:2px;">Grafico de SOS 1</Button></a>
  <a href="#/graph4"><Button light style="margin:2px;">Grafico de SOS 2</Button></a>
  <a href="#/graph5"><Button light style="margin:2px;">Grafico externo 1</Button></a>
  <a href="#/graph6"><Button light style="margin:2px;">Grafico externo 2</Button></a>

</ButtonGroup>
</center></Col>
  </Row>
</Container></main>
