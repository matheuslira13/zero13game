"use client";

import { observer } from "mobx";
import { tournamentStore } from "@/mobx/store";

export const TournamentList = observer(() => {
  return (
    <div>
      <h2>Torneios disponíveis</h2>

      {tournamentStore.availableTournaments.map((tournament) => (
        <div key={tournament.id}>
          <h3>{tournament.title}</h3>
          <p>{tournament.game}</p>
          <p>
            {tournament.players}/{tournament.maxPlayers} jogadores
          </p>
        </div>
      ))}
    </div>
  );
});
