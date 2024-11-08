import React, { useEffect, useState, useCallback } from 'react'
import ActivityCard from './ActivityCard'
import { IActivityWithImageUrl } from './Types'
import axios from 'axios'
import { ACTIVITIES_URL } from 'resources/server_urls'
import { useAppSelector } from 'store/hooks'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
import styled from 'styled-components'

const Wrapper = styled.div`
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0.05, 0.05, 0, 0.2);
    padding-bottom: 1em;
`

const SwiperSlideStyled = styled(SwiperSlide)`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding-bottom: 3em;
    padding-top: 1.5em;
`

const LoadingMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    color: #555;
`

const ActivitiesCarousel: React.FC = () => {
    const [activities, setActivities] = useState<IActivityWithImageUrl[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const userJwt = useAppSelector<string | null>((state) => state.users.jwt)

    const fetchActivities = useCallback(async (): Promise<IActivityWithImageUrl[]> => {
        const response = await axios.get(ACTIVITIES_URL, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userJwt}`
            }
        })

        return response.data.map((activity: any) => ({
            title: activity.title,
            description: activity.description,
            startDate: activity.startDate ? new Date(activity.startDate).toISOString() : null,
            endDate: activity.endDate ? new Date(activity.endDate).toISOString() : null,
            category: activity.category,
            imageUrl: activity.image ? `data:image/jpeg;base64,${activity.image}` : 'default-image.jpg'
        }))
    }, [userJwt])

    useEffect(() => {
        const loadActivities = async () => {
            setIsLoading(true)
            const activitiesData = await fetchActivities()
            setActivities(activitiesData)
            setIsLoading(false)
        }
        void loadActivities()
    }, [fetchActivities])

    return (
        <Wrapper id="activities-carousel">
            {isLoading ? (
                <LoadingMessage>Loading activities...</LoadingMessage>
            ) : (
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    pagination={{ clickable: true }}
                    navigation
                    modules={[Pagination, Navigation]}
                    breakpoints={{
                        1120: { slidesPerView: 1 },
                        1600: { slidesPerView: 2 },
                        1650: { slidesPerView: 3 }
                    }}
                    className="mySwiper"
                >
                    {activities.map((activity, index) => (
                        <SwiperSlideStyled key={index}>
                            <ActivityCard activity={activity} />
                        </SwiperSlideStyled>
                    ))}
                </Swiper>
            )}
        </Wrapper>
    )
}

// Wrap with React.memo when exporting, not while declaring the component
export default React.memo(ActivitiesCarousel)
