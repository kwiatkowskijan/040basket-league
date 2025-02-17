import { Player } from "./player";

export interface Team {
    tournamentId: number,
    id: number,
    name: string,
    city: string,
    players: Player[];
}
