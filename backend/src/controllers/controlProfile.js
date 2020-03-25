const conn = require('../database/connnection');

module.exports={

    async listProfile(req,res){
        const ong_id=req.headers.auth;
        const incidents= await conn('incidents').where('ong_id',ong_id).select('*');
        return res.json(incidents);
    }

}