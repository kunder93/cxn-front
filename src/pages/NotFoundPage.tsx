import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../resources/routes-constants'

/**
 * NotFoundPage component to display a 404 error message.
 *
 * This component informs users that the requested page was not found
 * and provides a link to redirect them back to the homepage.
 *
 * @returns {JSX.Element} The rendered 404 Not Found page.
 */
const NotFoundPage = (): JSX.Element => {
    const navigate = useNavigate()

    /**
     * Redirects the user to the homepage.
     *
     * This function is called when the user clicks the "Homepage" link.
     */
    const redirectToHomePage = () => {
        navigate(ROUTES.HOMEPAGE_ROUTE)
    }

    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <h1 style={{ fontSize: '4em' }}>Oops 404!</h1>
            <span style={{ cursor: 'pointer' }} onClick={() => redirectToHomePage()}>
                Homepage
            </span>
        </div>
    )
}

export default NotFoundPage
