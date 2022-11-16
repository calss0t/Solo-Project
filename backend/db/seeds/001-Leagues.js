/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('leagues').del()
  await knex('leagues').insert([
    {id: 1, league_Id: '140', League_Id_TheSportsDB: '4335', league_name:"La Liga", league_logo:"https://media.api-sports.io/football/leagues/140.png"},
    {id: 2, league_Id: '39', League_Id_TheSportsDB: '4328', league_name:"Premier League", league_logo:"https://media.api-sports.io/football/leagues/39.png"},
    {id: 3, league_Id: '78', League_Id_TheSportsDB: '4331', league_name:"Bundesliga", league_logo:"https://media.api-sports.io/football/leagues/78.png"},
    {id: 4,  league_Id: '2', League_Id_TheSportsDB: '4480', league_name:"UEFA Champions League", league_logo:"https://media.api-sports.io/football/leagues/2.png"},
    {id: 5, league_Id: '1', League_Id_TheSportsDB: '4429', league_name:"World Cup", league_logo:"https://media.api-sports.io/football/leagues/1.png"},
    {id: 6, league_Id: '61', League_Id_TheSportsDB: '4334', league_name:"Ligue 1", league_logo:"https://media.api-sports.io/football/leagues/61.png"},
    {id: 7, league_Id: '98', League_Id_TheSportsDB: '4633', league_name:"J1 League", league_logo:"https://media.api-sports.io/football/leagues/98.png"},
    {id: 8, league_Id: '3', League_Id_TheSportsDB: '4481', league_name:"UEFA Europa League", league_logo:"https://media.api-sports.io/football/leagues/3.png"},
    {id: 9, league_Id: '135', League_Id_TheSportsDB: '4332', league_name:"Serie A", league_logo:"https://media.api-sports.io/football/leagues/135.png"},
    {id: 10, league_Id: '253', League_Id_TheSportsDB: '4346', league_name:"Major League Soccer", league_logo:"https://media.api-sports.io/football/leagues/253.png"},
  ]);
};
