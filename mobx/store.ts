import { makeAutoObservable } from "mobx";

export type Tournament = {
  id: string;
  title: string;
  game: string;
  date: string;
  maxPlayers: number;
  players: number;
};

export class TournamentStore {
  tournaments: Tournament[] = [];
  constructor() {
    makeAutoObservable(this);
  }
  addTournament(tournament: Tournament) {
    this.tournaments.push(tournament);
  }
  removeTournament(id: string) {
    this.tournaments = this.tournaments.filter((item) => item.id !== id);
  }
  get availableTournaments() {
    return this.tournaments.filter((item) => item.players < item.maxPlayers);
  }
  get totalTournaments() {
    return this.tournaments.length;
  }
}

export const tournamentStore = new TournamentStore();
