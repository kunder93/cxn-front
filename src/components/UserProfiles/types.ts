import { ProfileSection } from './SideBar'

/**
 * Represents a button in the profile menu.
 *
 * @interface Button
 * @property {ProfileSection} section - The section that the button navigates to.
 * @property {string} text - The display text of the button.
 * @property {number} buttonIndex - The index of the button, used for hover effects.
 */
interface Button {
    section: ProfileSection
    text: string
    buttonIndex: number
}

/**
 * Represents a section in the profile menu.
 *
 * @interface ProfileMenuSection
 * @property {string} key - A unique key for the section.
 * @property {JSX.Element} icon - The icon displayed for the section.
 * @property {string} title - The title of the section.
 * @property {Button[]} buttons - An array of buttons associated with the section.
 */
export interface ProfileMenuSection {
    key: string
    icon: JSX.Element
    title: string
    buttons: Button[]
}

/**
 * Interface for the properties of the RolePage component.
 *
 * @interface RolePageProps
 * @property {function} changePage - Function to navigate to a specified section.
 */
export interface RolePageProps {
    changePage: (section: ProfileSection) => void
}
