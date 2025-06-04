export type ActivityState = 'upcoming' | 'ongoing' | 'ended'
export enum ActivityCategory {
    TORNEO = 'TORNEO',
    ENTRENAMIENTO = 'ENTRENAMIENTO',
    CLASES = 'CLASES',
    INFORMAL = 'INFORMAL',
    OTRO = 'OTRO'
}

export interface IActivity {
    title: string
    description: string
    startDate: Date | null // Store as ISO string with date and time
    endDate: Date | null
    category: ActivityCategory | null
}

export type ActivitiesList = IActivity[]

export interface IActivityForm extends IActivity {
    imageFile: File | null
}

export interface IActivityDto {
    title: string
    description: string
    startDate: string | null // Assuming it comes as an ISO string from the backend
    endDate: string | null
    category: string | null
    image: Uint8Array | null // `image` field as a byte array (or `null` if no image)
}
