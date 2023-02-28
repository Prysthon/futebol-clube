import Teams from '../../database/models/TeamsModel';

const teamsMock: Teams[] = [
  {
    "id": 1,
    "teamName": "Avaí/Kindermann"
  },
  {
    "id": 2,
    "teamName": "Bahia"
  },
  {
    "id": 3,
    "teamName": "Botafogo"
  },
  {
    "id": 4,
    "teamName": "Corinthians"
  },
  {
    "id": 5,
    "teamName": "Cruzeiro"
  }
] as Teams[];

const teamMock = {
  "id": 1,
  "teamName": "Avaí/Kindermann"
} as Teams;

export {teamsMock, teamMock};