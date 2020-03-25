const conn = require('../database/connnection');

module.exports={
    async Login(req,res){
        const {id}=req.body;
        const ong=await conn('ongs').where('id',id).select('name').first();
        if(!ong){
            return res.status(400).json({error:'Ong not found'})
        }
        return res.json(ong);
    }
}