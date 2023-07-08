const objectMap = require('./objectMap');

class APIFeatures {
    constructor (query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}

        this.query = this.query.find({ ...keyword });
        return this
    }

    filter() {
        const querycopy = { ...this.queryStr }

        // Removing search and pagination fields from the query string
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete querycopy[el]);

        // Format filter to mongoose query object for price, ratings etc
        let queryStr = JSON.stringify(querycopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        // Cast filter values from string to number
        const queryObj = objectMap(JSON.parse(queryStr), (item) => Number.isNaN(parseInt(item)) ? item : parseInt(item));

        this.query = this.query.find({ ...queryObj });
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1);

        this.query = this.query.limit(resPerPage).skip(skip);
        return this;
    }
}

module.exports = APIFeatures