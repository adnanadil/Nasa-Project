const DEFAULT_LIMIT = 0;
const DEFAULT_PAGE_NUMBER = 1

function pagination(limitG, pageG) {
    const limit = Math.abs(limitG) || DEFAULT_LIMIT
    const page = Math.abs(pageG) || DEFAULT_PAGE_NUMBER
    const skip = (page-1)*limit

    return{
        limit,
        skip
    }
}

module.exports = {
    pagination
}