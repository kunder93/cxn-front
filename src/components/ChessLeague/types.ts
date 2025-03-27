/**
 * Represents a team member.
 * @interface
 */
export interface TeamMember {
    /** The national identification number of the member. */
    dni: string
    /** The email address of the member. */
    email: string
    /** The first name of the member. */
    name: string
    /** The first surname of the member. */
    firstSurname: string // Fixed typo ("firsSurname" -> "firstSurname")
    /** The second surname of the member. */
    secondSurname: string
    /** The birth date of the member in YYYY-MM-DD format. */
    birthDate: string // Consider changing this to `Date` type if working with actual Date objects
    /** The gender of the member. */
    gender: string
}

export interface Team {
    /** The name of the team. */
    name: string
    /** A brief description of the team. */
    description: string
    /** The category to which the team belongs. */
    category: string
}

/**
 * Represents a team with members.
 * @interface
 */
export interface TeamWithMembers extends Team {
    /** A list of members who are part of the team. */
    members: TeamMember[]
}

/**
 * Represents a list of teams.
 * @type {TeamWithMembers[]}
 */
export type TeamWithMembersList = TeamWithMembers[]
