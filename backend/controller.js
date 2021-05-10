let Inventory = [{
    id: 1,
    name: 'Harry Potter',
    description: 'Harry Potter Tales',
    price: '$99.99',
    author: 'Tony',
    imageUrl: 'http://images.amazon.com/images/P/0596004478.01._PE30_PI_SCMZZZZZZZ_.jpg'
},{
    id: 2,
    name: 'Spider Man',
    description: 'Spider Man book acted by Peter Parker',
    price: '$99.99',
    author: 'Robert',
    imageUrl: 'http://images.amazon.com/images/P/0596004613.01._PE30_PI_SCMZZZZZZZ_.jpg'
},{
    id: 3,
    name: 'Vikram and Vedha',
    description: 'Vikram acted in Vikramadhityan',
    price: '$99.99',
    author: 'Vetri',
    imageUrl: 'http://images.amazon.com/images/P/0596004605.01._SCMZZZZZZZ_.jpg'
}]

const getInventory = (req, res, next) => {
    res.json({
        ok: true,
        Inventory,
        message: 'Success'
    })
}

const postInventory = (req, res, next) => {
    const {id, name, description, price, author, imageUrl} = req.body;    

    try {
        Inventory.push({
            id,
            name,
            description,
            price,
            author,
            imageUrl
        });

    } catch(error) {
        return next({error: 'Failed to Insert'});
    }

    res.json({
        ok: true,
        Inventory,
        message: 'Success'
    });
}

const patchInventory = (req, res, next) => {
    const {id, name, description, price, author, imageUrl} = req.body;

    try {
        const ItemIndex = Inventory.findIndex((val) => +val.id === +id);

        Inventory[ItemIndex] = {
            id,
            name,
            description,
            price,
            author,
            imageUrl
        }
        
    } catch(error) {
        return next({error: 'Failed to Update'});
    }

    res.json({
        ok: true,
        Inventory,
        message: 'Success'
    });
}

const deleteInventory = (req, res, next) => {
    const {Inv_id} = req.body;
    
    Inventory = Inventory.filter((val) => +val.id !== +Inv_id);

    res.json({
        ok: true,
        Inventory,
        message: 'Success'
    })
}

exports.getInventory = getInventory;
exports.postInventory = postInventory;
exports.patchInventory = patchInventory;
exports.deleteInventory = deleteInventory;