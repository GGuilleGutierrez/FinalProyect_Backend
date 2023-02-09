const products = require("../../models").products

const getAll = (req, res) => {
    return products.findAll()
        .then(products => res.status(200).send(products))
        .catch(error => res.status(404).send(error))
}

const getOne = (req, res) => {
    const { id } = req.params
    return products.findOne(
        { where: { id: id } })
        .then(products => res.status(200).send(products))
        .catch(error => res.status(404).send(error))
}

const create = (req, res) => {
    const { product, descript, price, img } = req.body
    return products.create({
        product: product,
        descript: descript,
        price: price,
        img: img
    })
        .then(products => res.status(201).send(products))
        .catch(error => res.status(500).send(error))
}

const update = async (req, res) => {
    const { id } = req.params
    const { product, descript, price, img } = req.body
    return products.update({ product: product, descript: descript, price: price, img: img }, { where: { id: id } })
        .then(products => res.status(201).send(products))
        .catch(error => res.status(500).send('No se pudo actualizar', error))
}

const deleteOne = async (req, res) => {
    const { id } = req.params
    return await products.destroy(
        { where: { id: id } }
    ).then((newProd) => {
        if (newProd === 1) {
            res.status(200).send({ message: 'Success' })
        } else {
            res.sendStatus(404)
        }
    }).catch((err) => res.status(500).send(err))
}

module.exports = { getAll, getOne, create, update, deleteOne };