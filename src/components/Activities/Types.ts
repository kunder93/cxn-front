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
    startDate: Date | null
    endDate: Date | null
    state: ActivityState | null
    category: ActivityCategory | null
}

export interface IActivityForm extends IActivity {
    image: File | null
}
