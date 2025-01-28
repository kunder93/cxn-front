export interface Author {
    firstName: string
    lastName: string
}

export interface Book {
    isbn: string
    title: string
    description: string
    genre: string
    publishDate: string
    language: string
    authors: Author[]
}

export interface Magazine {
    issn: string
    title: string
    publisher: string
    editionNumber: number
    publishDate: string
    description: string
    pagesAmount: number
    authors: Author[]
    language: string
}

export interface IFormBook {
    previewUrl: string | null
    isbn: string
    title: string
    description: string
    genre: string
    publishDate: Date | null
    language: string
    coverSrc: string
    authors: Author[]
    imageFile: File | null
}

export interface IFormMagazine {
    issn: string
    title: string
    publisher: string
    editionNumber: number
    publishDate: Date | null
    description: string
    coverImageUrl: string
    imageFile: File | null
    pagesAmount: number
    authors: Author[]
    language: string
}
