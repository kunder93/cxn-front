const baseUrl = 'https://xadreznaron.es:4443'

export const getData = (userId: number): string => {
    return baseUrl + '/data/' + userId
}