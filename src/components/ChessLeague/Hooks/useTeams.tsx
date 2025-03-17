import { useEffect, useState } from 'react'
import { Team, TeamWithMembers, TeamWithMembersList } from '../types'
import { useAppSelector } from 'store/hooks'
import axios, { isAxiosError } from 'axios'
import { CHESS_TEAMS_URL } from 'resources/server_urls'

export const useTeams = () => {
    const [teams, setTeams] = useState<TeamWithMembersList>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const userJwt = useAppSelector<string>((state) => state.users.jwt)

    useEffect(() => {
        if (!userJwt) return
        const fetchTeams = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await axios.get<TeamWithMembersList>(CHESS_TEAMS_URL, {
                    headers: { Authorization: `Bearer ${userJwt}` }
                })
                setTeams(response.data)
            } catch (err) {
                console.error('Error fetching teams:', err)
                setError(err instanceof Error ? err.message : 'An unknown error occurred')
            } finally {
                setLoading(false)
            }
        }
        void fetchTeams()
    }, [userJwt])

    /**
     * Añadir un equipo.
     */
    const addTeam = async (name: string, category: string, description: string) => {
        setLoading(true)
        setError(null)
        try {
            const newTeam: Team = { name, category, description }

            // Enviar al servidor
            const response = await axios.post<TeamWithMembers>(CHESS_TEAMS_URL, newTeam, {
                headers: { Authorization: `Bearer ${userJwt}` }
            })
            console.log('LA RESPUESTA DE AXIOS ES:', response.data)

            // Actualiza el estado con el nuevo equipo
            setTeams((prevTeams) => [...prevTeams, response.data])
        } catch (err) {
            console.error('Error adding team:', err)
            setError(err instanceof Error ? err.message : 'An unknown error occurred')
        } finally {
            setLoading(false)
        }
    }

    /**
     * Eliminar un equipo por su nombre.
     */
    const removeTeam = async (name: string) => {
        setLoading(true)
        setError(null)
        try {
            // Enviar solicitud al servidor
            await axios.delete(`${CHESS_TEAMS_URL}/${encodeURIComponent(name)}`, {
                headers: { Authorization: `Bearer ${userJwt}` }
            })

            // Actualizar estado localmente
            setTeams(teams.filter((team) => team.name !== name))
        } catch (err) {
            console.error('Error removing team:', err)
            setError(err instanceof Error ? err.message : 'An unknown error occurred')
        } finally {
            setLoading(false)
        }
    }

    const addMemberToTeam = async (userEmail: string, teamName: string) => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.patch<TeamWithMembers>(
                `${CHESS_TEAMS_URL}/${teamName}`,
                { userEmail }, // Enviamos el email en formato JSON
                {
                    headers: {
                        Authorization: `Bearer ${userJwt}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            // Suponemos que la respuesta contiene el equipo actualizado, con el nuevo miembro incluido
            const updatedTeam = response.data

            // Actualizamos el estado local reemplazando el equipo modificado
            setTeams((prevTeams) => prevTeams.map((team) => (team.name === teamName ? updatedTeam : team)))
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                setError('Error: ' + error.message)
            } else {
                setError('Error al añadir usuario al equipo')
            }
            throw error
        } finally {
            setLoading(false)
        }
    }

    const removeMemberFromTeam = async (userEmail: string, teamName: string) => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.delete<TeamWithMembers>(`${CHESS_TEAMS_URL}/${teamName}/${userEmail}`, {
                headers: {
                    Authorization: `Bearer ${userJwt}`,
                    'Content-Type': 'application/json'
                }
            })
            const updatedTeam = response.data

            // Actualiza el estado local reemplazando el equipo modificado
            setTeams((prevTeams) => prevTeams.map((team) => (team.name === teamName ? updatedTeam : team)))
        } catch (error: unknown) {
            if (isAxiosError(error)) {
                setError('Error: ' + error.message)
            } else {
                setError('Error al eliminar miembro del equipo')
            }
            throw error
        } finally {
            setLoading(false)
        }
    }

    // Log the updated teams list whenever it changes
    useEffect(() => {
        console.log('Equipos actualizados:', teams)
    }, [teams]) // This effect will run whenever the teams state changes

    return { teams, loading, error, addTeam, removeTeam, addMemberToTeam, removeMemberFromTeam }
}
