import { Player } from "./player";

export interface TournamentsTeamsPlayer {
    id: number;
    teamId: number;
    playerId: number;
    player: Player;
    number: number;
    isCaptain: boolean;
}
