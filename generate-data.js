const fakerJs = require("@faker-js/faker")
const fs = require("fs");

const {faker} = fakerJs;

const randomListCategories = (quantity) => {
    if(quantity <= 0) return []
    const list = []
    Array.from(new Array(quantity)).forEach(() => {
        const category = {
            id: faker.datatype.uuid(),
            name: faker.commerce.department(),
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }
        list.push(category)
    })
    return list
}

const randomProductList = (categoriesList, quantity) => {
    if(quantity <=0 ) return []
    const productList = [];
    for (const category of categoriesList) {
        Array.from(new Array(quantity)).forEach(() => {
            const product = {
                categoryId: category.id,
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(),
                color: faker.commerce.color(),
                price: Number.parseFloat(faker.commerce.price()),
                description: faker.commerce.productDescription(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                thumbnailUrl: faker.image.imageUrl(400, 400),
            }
            productList.push(product)
        })
    }
    return productList
}
(() => {
    const categoriesList = randomListCategories(4);
    const productList = randomProductList(categoriesList, 5);
    const db = {
        categories: categoriesList,
        products: productList,
        profile: {
            name: 'long',
            age: 26,
            address: 'Da Hoi - Chau Khe - Tu Son - Bac Ninh'
        }
    }
    fs.writeFile('db.json', JSON.stringify(db), () => {
        console.log("Write success")
    })
})()