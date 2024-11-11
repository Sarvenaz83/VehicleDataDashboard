# VehicleDataDashboard

## Projektbeskrivning
**VehicleDataDashboard** är ett projekt som syftar till att utveckla en interaktiv fordonsdashboard med realtidsuppdateringar och historisk datahantering. Dashboarden använder simulerad fordonsdata för att visualisera och analysera parametrar som hastighet, bränsleförbrukning och säkerhetsvarningar. Projektet är designat för att visa hur datadriven teknik kan användas för att förbättra övervakning, prestanda och säkerhet i fordonsindustrin.

## Projektmål
- Bygga en dashboard-applikation som visar både realtids- och historisk fordonsdata.
- Implementera en skalbar lösning med MongoDB för datalagring och WebSocket för realtidsuppdateringar.
- Skapa en dynamisk och modulär frontend med React för att tillhandahålla en smidig användarupplevelse.
- Visualisera data med interaktiva diagram skapade med Chart.js för att underlätta analys och beslutsfattande.

## Teknologier
Projektet är byggt med följande teknologier:

- **Backend**: 
  - **Node.js** – Hantering av API-anrop och serverlogik.
  - **WebSocket (Socket.io)** – Realtidskommunikation för att sända uppdateringar av fordonsdata till frontend.

- **Frontend**:
  - **React** – Komponentbaserad frontend-arkitektur för att bygga en interaktiv och strukturerad dashboard.
  - **Chart.js** – Visualisering av fordonsdata i olika diagram, integrerat i React-komponenter.

- **Databas**:
  - **MongoDB** – Databas för att lagra och hantera både realtids- och historisk fordonsdata.

## Funktioner
- Realtidsuppdatering av fordonsdata via WebSocket.
- Interaktiva diagram för att visualisera hastighet, bränsleförbrukning och säkerhetsvarningar.
- Lagring och hämtning av historisk data för analys över tid.
- Filtrering och visning av data för specifika tidsperioder.

## Installation och körning

### Förutsättningar
- **Node.js** och **MongoDB** installerat på din dator.

### Klona projektet
För att komma igång, klona detta repo till din lokala maskin:
```bash
git clone https://github.com/Sarvenaz83/VehicleDataDashboard.git
cd VehicleDataDashboard
