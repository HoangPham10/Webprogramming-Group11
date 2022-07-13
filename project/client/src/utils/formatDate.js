export const formatDate = (date) => {
    return date.split('Z')[0].replace('T', ' ')
}