const products = require("../../models").products
const users = require("../../models").users
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const getAllProds = (req, res) => {
    return products.findAll()
        .then(products => { res.status(200).send(products) })
        .catch(error => res.status(404).send(error))
}

// const getOne = (req, res) => {
//     const { id } = req.params
//     return products.findOne(
//         { where: { id: id } })
//         .then(products => res.status(200).send(products))
//         .catch(error => res.status(404).send(error))
// }

const createProd = (req, res) => {
    const { name, descript, price, img } = req.body
    return products.create({
        name: name,
        descript: descript,
        price: price,
        img: img
    })
        .then(products => res.status(201).send(products))
        .catch(error => res.status(500).send(error))
}

const updateProd = async (req, res) => {
    const { id } = req.params
    const { name, descript, price, img } = req.body
    return products.update({ name: name, descript: descript, price: price, img: img }, { where: { id: id } })
        .then(products => res.status(201).send(products))
        .catch(error => res.status(500).send('No se pudo actualizar', error))
}

const deleteProd = async (req, res) => {
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

const register = (req, res) => {
    const { name, surname, email, birth, phone, role, password } = req.body
    const passwordHash = bcrypt.hashSync(password, 10)
    return users.create({
        name: name,
        surname: surname,
        email: email,
        dateofbirth: birth,
        phone: phone,
        role: role,
        passw: passwordHash
    })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(500).send(error))
}

const login = async (req, res) => {
    const { email, password } = req.body;
    const userLog = await users.findOne({ where: { email: email } });
    if (!userLog) {
        return (error) => res.status(404).send({ message: "error", error })
    } else {
        const checkPassword = bcrypt.compareSync(password, userLog.passw)
        if (!checkPassword) {
            return (error) => res.status(404).send({ message: "error", error })
        } else {
            const token = jwt.sign({ userLog }, "secretTkn")
            return res.status(200).json(token)
        }
    }
}

const getAllUsers = (req, res) => {
    return users.findAll()
        .then(users => { res.status(200).send(users) })
        .catch(error => res.status(404).send(error))
}

const deleteUser = async (req, res) => {
    const { id } = req.params
    return await users.destroy(
        { where: { id: id } }
    ).then((newUser) => {
        if (newUser === 1) {
            res.status(200).send({ message: 'Success' })
        } else {
            res.sendStatus(404)
        }
    }).catch((err) => res.status(500).send(err))
}

module.exports = { getAllProds, createProd, updateProd, deleteProd, register, login, getAllUsers, deleteUser };