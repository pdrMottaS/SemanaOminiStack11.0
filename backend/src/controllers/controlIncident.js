const conn = require('../database/connnection');

module.exports={
    async createIncident(req,res){
        const {title,description,value}=req.body;
        const ong_id = req.headers.auth;
        const [id] = await conn('incidents').insert({
            title,
            description,
            value,
            ong_id
        })
        return res.json({id});
    },

    async listIncident(req,res){
        const {page=1}=req.query;
        const [count]=await conn('incidents').count();
        const incidents=await conn('incidents').join('ongs','ongs.id','=','incidents.ong_id').limit(5).offset((page-1)*5).select(['incidents.*','ongs.name','ongs.email','ongs.wpp','ongs.city','ongs.uf']);
        res.header('X-Total-Count',count['count(*)']);
        res.json(incidents);
    },

    async deleteIncident(req,res){
        const {id}=req.params;
        const ong_id=req.headers.auth;
        const incident=await conn('incidents').where('id',id).select('ong_id').first();
        if(incident.ong_id != ong_id){
            return res.status(401).json({error:'operation not authorized'});
        }
        await conn('incidents').where('id',id).delete();
        return res.status(204).send();
    }
}