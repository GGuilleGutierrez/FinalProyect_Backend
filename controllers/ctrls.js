const products = require("../models").products
const users = require("../models").users
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const getAllProds = (req, res) => {
    return res.send("SI FUNCIONO");

    
    // return products.findAll()
    //     .then(products => { res.status(200).send(products) })
    //     .catch(error => res.status(404).send(error))
}

// const getOne = (req, res) => {
//     const { id } = req.params
//     return products.findOne(
//         { where: { id: id } })
//         .then(products => res.status(200).send(products))
//         .catch(error => res.status(404).send(error))
// }

const createProd = (req, res) => {
    const { name, descript, price, img, stock } = req.body
    return products.create({
        name: name,
        descript: descript,
        price: price,
        img: img,
        stock: stock
    })
        .then(products => res.status(201).send(products))
        .catch(error => res.status(500).send(error))
}

const updateProd = async (req, res) => {
    const { id } = req.params
    const { name, descript, price, img, stock } = req.body
    return products.update({ name: name, descript: descript, price: price, stock: stock, img: img }, { where: { id: id } })
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

const registerUser = async (req, res) => {
    const { name, surname, email, birth, phone, password } = req.body
    const emailUsed = await users.findOne({ where: { email: email } });
    if (!emailUsed){
        const passwordHash = bcrypt.hashSync(password, 10)
        return users.create({
            name: name,
            surname: surname,
            email: email,
            dateofbirth: birth,
            phone: phone,
            passw: passwordHash,
            role: "user"
        })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(500).send(error))
    }else{
        return res.status(404).send({message: "error"});
    }
}

const registerAdmin = async (req, res) => {
    const { name, surname, email, birth, phone, password } = req.body
    const emailUsed = await users.findOne({ where: { email: email } });
    if (!emailUsed){
        const passwordHash = bcrypt.hashSync(password, 10)
        return users.create({
        name: name,
        surname: surname,
        email: email,
        dateofbirth: birth,
        phone: phone,
        passw: passwordHash,
        role: "admin"
        })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(500).send(error))
    }else{
        return res.status(404).send({message: "error"});
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;
    const userLog = await users.findOne({ where: { email: email } });
    if (!userLog) {
        return res.status(404).send({message: "error"});
    } else {
        const checkPassword = bcrypt.compareSync(password, userLog.passw)
        if (!checkPassword) { 
            return res.status(404).send({message: "error"});
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

const mercadopago = require("mercadopago")

mercadopago.configure({
    access_token: "TEST-1233814824459388-051814-da73671dc1b73c79771daaabb8b7e3b0-374368181",
  });

const createPreference = (req, res) => {
    const products = req.body.cart;

    const items = products.map(product => ({
        title: product.name,
        quantity: product.amount,
        unit_price: product.price
      }));

    let preference = {
		items,
		back_urls: {
			"success": "http://localhost:4200/products",
			"failure": "http://localhost:4200/cart",
			"pending": ""
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then( response => {
			res.json({
				preferenceId: response.body.id
			});
		}).catch(error => {
			console.log(error);
            res.status(500).json({error: 'ERROR AL GENERAR PREFERENCIA DE PAGO'})
		});
}


module.exports = { getAllProds, createProd, updateProd, deleteProd, registerUser, registerAdmin, login, getAllUsers, deleteUser, createPreference };