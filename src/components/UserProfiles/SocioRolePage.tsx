import React from 'react'
import { useAppSelector } from '../../store/hooks'
import { UserProfile } from '../../store/types/userTypes'
import SocioRolePageDataTable from '../../components/MyProfile/SocioRolePageDataTable'

const SocioRolePage: React.FC = () => {
    const userProfile: UserProfile = useAppSelector((state) => state.users.userProfile)
    return <SocioRolePageDataTable userProfile={userProfile}></SocioRolePageDataTable>
}

export default SocioRolePage
