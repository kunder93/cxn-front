/**
 * Interface representing the statistics of a specific game mode on Lichess.
 *
 * @property {number} elo - The ELO rating of the player in this game mode.
 * @property {number} amountOfGames - The total number of games played in this mode.
 * @property {boolean} isProvisional - Whether the player's rating in this game mode is provisional.
 */
export interface Game {
    elo: number
    amountOfGames: number
    isProvisional: boolean
}

/**
 * Interface representing a Lichess profile response.
 *
 * @property {string} userName - The real-world name of the player (if available) from user name, first surname and second surname.
 * @property {string} lichessUserName - The username of the player on Lichess.
 * @property {string} lastUpdate - The ISO date-time string when the profile was last updated.
 * @property {Game} blitzGame - The player's stats in Blitz games.
 * @property {Game} bulletGame - The player's stats in Bullet games.
 * @property {Game} rapidGame - The player's stats in Rapid games.
 * @property {Game} classicalGame - The player's stats in Classical games.
 * @property {Game} puzzleGame - The player's stats in Puzzle mode.
 */
export interface LichessProfileResponse {
    userName: string
    lichessUserName: string
    lastUpdate: string
    blitzGame: Game
    bulletGame: Game
    rapidGame: Game
    classicalGame: Game
    puzzleGame: Game
}

/**
 * Interface representing a response containing a list of Lichess profiles.
 *
 * @property {LichessProfileResponse[]} profilesList - Array of LichessProfileResponse objects representing multiple Lichess profiles.
 */
export interface LichessProfileListResponse {
    profilesList: LichessProfileResponse[]
}

/**
 * A constant representing an empty/default Lichess profile.
 * Useful for initializing the state when no profile data is available or as a placeholder.
 *
 * @constant
 * @type {LichessProfileResponse}
 */
export const emptyLichessProfile: LichessProfileResponse = {
    userName: '',
    lichessUserName: '',
    lastUpdate: '', // This can be initialized to new Date().toISOString() if needed.
    blitzGame: { elo: 0, amountOfGames: 0, isProvisional: false },
    bulletGame: { elo: 0, amountOfGames: 0, isProvisional: false },
    rapidGame: { elo: 0, amountOfGames: 0, isProvisional: false },
    classicalGame: { elo: 0, amountOfGames: 0, isProvisional: false },
    puzzleGame: { elo: 0, amountOfGames: 0, isProvisional: false }
}

/**
 * Checks if a game is empty.
 * A game is considered empty if:
 * - The ELO is 0.
 * - The number of games played is 0.
 * - The game is not provisional.
 *
 * @param {Game} game - The game object to check.
 * @returns {boolean} - Returns true if the game is empty; otherwise, false.
 */
export function isGameEmpty(game: Game): boolean {
    return game.elo === 0 && game.amountOfGames === 0 && !game.isProvisional
}

/**
 * Checks if a Lichess profile is empty.
 * A profile is considered empty if:
 * - The Lichess username is empty.
 * - All games (blitz, bullet, rapid, classical, and puzzle) are empty.
 *
 * @param {LichessProfileResponse} profile - The Lichess profile object to check.
 * @returns {boolean} - Returns true if the profile is empty; otherwise, false.
 */
export function isLichessProfileEmpty(profile: LichessProfileResponse): boolean {
    return (
        profile.lichessUserName === '' &&
        isGameEmpty(profile.blitzGame) &&
        isGameEmpty(profile.bulletGame) &&
        isGameEmpty(profile.rapidGame) &&
        isGameEmpty(profile.classicalGame) &&
        isGameEmpty(profile.puzzleGame)
    )
}
