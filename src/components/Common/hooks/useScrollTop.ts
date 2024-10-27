import { useEffect } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useScrollTop = (dependency: any) => {
    useEffect(() => {
        const scrollToTop = () => {
            const element = document.getElementById('root')
            if (element) {
                // Realizar scroll suave para enfocar el elemento del acordeón
                element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
        }

        scrollToTop() // Llamar la función inicialmente cuando el componente se monta o 'dependency' cambia

        // Agregar 'dependency' como una dependencia del efecto
        // Esto hará que el efecto se ejecute cada vez que 'dependency' cambie
    }, [dependency])
}

export default useScrollTop
