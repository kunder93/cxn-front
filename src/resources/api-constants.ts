const baseUrl = 'http://localhost:8080'

export const getData = (userId: number): string => {
    return baseUrl + '/data/' + userId
}