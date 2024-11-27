// hooks/useFetchActivities.ts
import { useState, useCallback, useEffect } from 'react'
import axios from 'axios'
import { IActivityWithImageUrl } from 'components/Activities/Types'
import { ACTIVITIES_URL } from 'resources/server_urls'

export const useFetchActivities = () => {
    const [activities, setActivities] = useState<IActivityWithImageUrl[]>([])
    const [error, setError] = useState<string | null>(null)

    const fetchActivities = useCallback(async () => {
        try {
            const response = await axios.get(ACTIVITIES_URL, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const activitiesData: IActivityWithImageUrl[] = response.data.map((activity: any) => ({
                title: activity.title,
                description: activity.description,
                startDate: activity.startDate ? new Date(activity.startDate).toISOString() : null,
                endDate: activity.endDate ? new Date(activity.endDate).toISOString() : null,
                category: activity.category,
                imageUrl: activity.image ? `data:image/jpeg;base64,${activity.image}` : 'default-image.jpg'
            }))

            setActivities(activitiesData)
            setError(null)
        } catch (err) {
            console.error('Failed to fetch activities:', err)
            setError('Failed to fetch activities')
        }
    }, [])

    useEffect(() => {
        void fetchActivities()
    }, [fetchActivities])

    // Function to add an activity locally without refetching
    const addLocalActivity = (activity: IActivityWithImageUrl) => {
        setActivities((prevActivities) => [...prevActivities, activity])
    }

    return { activities, error, refetch: fetchActivities, addLocalActivity }
}
