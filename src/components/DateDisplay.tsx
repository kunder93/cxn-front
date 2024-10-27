import moment from 'moment'
import { useEffect, useState } from 'react'

/**
 * A React functional component that displays the current date and time,
 * updating every second.
 *
 * @returns {JSX.Element} The rendered component showing the current date and time.
 */
const DateDisplay = (): JSX.Element => {
    const [date, setDate] = useState('')

    /**
     * Sets the date state to the current date and time on component mount.
     * Updates the date every second.
     * Cleans up the interval on component unmount.
     *
     * @function
     * @returns {void}
     */
    useEffect(() => {
        const interval = setInterval(() => {
            setDate(moment().toDate().toString())
        }, 1000)

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval)
    }, [])

    return (
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <span style={{ color: 'orange' }}>{date}</span>
        </div>
    )
}

export default DateDisplay
