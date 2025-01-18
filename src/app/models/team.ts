import { Player } from "./player";

export interface Team {
    id: string,
    name: string,
    city: string,
    tournamentId: string,
    players: Player[];
}
