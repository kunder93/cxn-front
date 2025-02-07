import ActivityCard from './ActivityCard'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Pagination, Navigation } from 'swiper/modules'
import styled from 'styled-components'
import LoadingTableSpinnerContainer from 'components/Common/LoadingTableSpinnerContainer'
import { IActivity } from './Types'

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

const NoActivitiesBox = styled.div`
    background-color: aliceblue;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0.05, 0.05, 0, 0.2);
    padding-bottom: 1em;
    padding-top: 1em;
    margin-top: 1em;
    display: flex;
    justify-content: center;
    align-items: center;
`

interface ActivitiesCarouselProps {
    activities: IActivity[]
    error: string | null
    loading: boolean
}

const ActivitiesCarousel: React.FC<ActivitiesCarouselProps> = ({ activities, error, loading }): JSX.Element => {
    if (loading) {
        return <LoadingTableSpinnerContainer />
    }

    if (error) {
        return (
            <NoActivitiesBox>
                <h2>Error loading activities</h2>
            </NoActivitiesBox>
        )
    }

    if (!activities || activities.length === 0) {
        return (
            <NoActivitiesBox>
                <h2>No hay actividades disponibles</h2>
            </NoActivitiesBox>
        )
    }

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
                {activities.map((activity) => (
                    <SwiperSlideStyled key={activity.title}>
                        <ActivityCard activity={activity} />
                    </SwiperSlideStyled>
                ))}
            </Swiper>
        </Wrapper>
    )
}

export default ActivitiesCarousel
