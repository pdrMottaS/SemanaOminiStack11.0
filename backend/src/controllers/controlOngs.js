const conn = require('../database/connnection');
const crypto = require('crypto');

module.exports={

    async listOngs(req,res){
        const ongs = await conn('ongs').select('*');
        return res.json(ongs);
    },

    async createOngs(req,res){
        const {name, email, wpp, city, uf}=req.body;
        const id=crypto.randomBytes(4).toString('HEX');
        await conn('ongs').insert({
            id,
            name,
            email,
            wpp,
            city,
            uf
        });
        res.json({id});
    }
}