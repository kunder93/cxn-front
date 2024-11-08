import React, { useEffect, useState } from 'react'
import ActivityCard from './ActivityCard'
import { IActivityWithImageUrl } from './Types'

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

interface ActivitiesCarouselProps {
    activitiesList: IActivityWithImageUrl[]
}

const ActivitiesCarousel: React.FC<ActivitiesCarouselProps> = ({ activitiesList }) => {
    const [activities, setActivities] = useState<IActivityWithImageUrl[]>([])

    useEffect(() => {
        setActivities(activitiesList)
    }, [activitiesList])

    return (
        <Wrapper id="activities-carousel">
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
        </Wrapper>
    )
}

export default ActivitiesCarousel
