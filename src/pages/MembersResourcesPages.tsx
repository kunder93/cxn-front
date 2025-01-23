import BooksViewer from 'components/ChessMemberResources/BooksViewer'
import MagazinesViewer from 'components/ChessMemberResources/MagazinesViewer'
import { useState } from 'react'

import { Button, ButtonGroup } from 'react-bootstrap'

export enum ResourceCategory {
    BOOKS = 'Libros',
    MAGAZINES = 'Revistas',
    GAME_MATERIAL = 'Material de Juego',
    TRAINING_VIDEOS = 'Videos de Entrenamiento',
    ARTICLES = 'Artículos',
    PUZZLES = 'Problemas de Ajedrez',
    SOFTWARE = 'Software de Ajedrez',
    EQUIPMENT = 'Equipamiento'
}

export const MembersResourcesPage = () => {
    const categories = Object.values(ResourceCategory)
    const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>(ResourceCategory.BOOKS)

    const handleCategoryClick = (category: ResourceCategory) => {
        setSelectedCategory(category)
    }

    const renderCategoryViewer = () => {
        switch (selectedCategory) {
            case ResourceCategory.BOOKS:
                return <BooksViewer />
            case ResourceCategory.MAGAZINES:
                return <MagazinesViewer />
            case ResourceCategory.GAME_MATERIAL:
                return <div>game material Viewer</div>
            case ResourceCategory.TRAINING_VIDEOS:
                return <div>Training Videos Viewer</div> // Puedes agregar el componente adecuado aquí
            case ResourceCategory.ARTICLES:
                return <div>Articles Viewer</div> // Y aquí también
            case ResourceCategory.PUZZLES:
                return <div>Puzzles Viewer</div> // Igualmente aquí
            case ResourceCategory.SOFTWARE:
                return <div>Software Viewer</div>
            case ResourceCategory.EQUIPMENT:
                return <div>Equipment Viewer</div>
            default:
                return <div>Select a category to see the resources.</div>
        }
    }

    return (
        <>
            {/* Grupo de botones */}
            <ButtonGroup aria-label="Resource categories">
                {categories.map((category, index) => (
                    <Button key={index} variant={selectedCategory === category ? 'primary' : 'secondary'} onClick={() => handleCategoryClick(category)}>
                        {category}
                    </Button>
                ))}
            </ButtonGroup>

            {/* Renderizado dinámico de recursos */}
            {renderCategoryViewer()}
        </>
    )
}
