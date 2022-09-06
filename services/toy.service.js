const fs = require('fs')
var gToys = require('../data/toy.json')
const PAGE_SIZE = 5

module.exports = {
    query,
    getById,
    save,
    remove
}

function query(filterBy) {
    var toys = gToys
    console.log(toys)
    if (filterBy) {
        console.log( filterBy)
        var { lables, name, price, inStock } = filterBy
        if (name) {
            const regex = new RegExp(name, 'i')
            toys = toys.filter(toys => regex.test(toys.name))
        }
        if (inStock === true || inStock === false) {
            if (inStock) toys = toys.filter(toys => toys.inStock)
            if (!inStock) toys = toys.filter(toys => !toys.inStock)
        }
        if (lables && lables.length) {
            toys = toys.filter(toy => lables.every(filterLable => toy.lables.includes(filterLable)))
        }
        //PAGING

        // if (filterBy.pageIdx !== undefined) {
        //     const startIdx = filterBy.pageIdx * PAGE_SIZE
        //     cars = cars.slice(startIdx, startIdx + PAGE_SIZE)
        // }
    }
    return Promise.resolve(toys)
}

// function query(filterBy = { txt: '' }) {

//     const regex = new RegExp(filterBy.txt, 'i')
//     var cars = gCars.filter(car => regex.test(car.vendor))

//     if (filterBy.userId) {
//         cars = cars.filter(car => filterBy.userId === car.owner._id)
//     }

//     if (filterBy.pageIdx !== undefined) {
//         const startIdx = filterBy.pageIdx * PAGE_SIZE
//         cars = cars.slice(startIdx, startIdx + PAGE_SIZE)
//     }

//     return Promise.resolve(cars)
// }

function getById(toyId) {
    const toy = gToys.find(toy => toy._id === toyId)
    return Promise.resolve(toy)
}

function remove(toyId) {
    gToys = gToys.filter(toy => toy._id !== toyId)
    return _saveToysToFile()
}

// function remove(carId, loggedinUser) {
//     const idx = gCars.findIndex(car => car._id === carId)
//     if (!loggedinUser.isAdmin &&  gCars[idx].owner._id !== loggedinUser._id) {
//         return Promise.reject('Not your Car')
//     }
//     gCars.splice(idx, 1)

//     return _saveCarsToFile()
// }

function save(toy, loggedinUser) {
    if (toy._id) {
        const toyToUpdate = gToys.find(currToy => currToy._id === toy._id)

        if (loggedinUser) {
            if (!loggedinUser.isAdmin && toyToUpdate.owner._id !== loggedinUser._id) {
                return Promise.reject('Not your Toy')
            }
        }
        toyToUpdate.name = toy.name
        toyToUpdate.price = toy.price
        toyToUpdate.labels = toy.labels
        toyToUpdate.inStock = toy.inStock
        console.log(toyToUpdate)
    } else {
        toy._id = _makeId()
        toy.createdAt = Date.now()
        gToys.push(toy)
    }
    return _saveToysToFile()
        .then(() => toy)

}

function _saveToysToFile() {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify(gToys, null, 2)
        fs.writeFile('data/toy.json', data, (err) => {
            if (err) return reject('Cannot save to file')
            resolve()
        })
    })
}

function _makeId(length = 5) {
    var txt = ''
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}