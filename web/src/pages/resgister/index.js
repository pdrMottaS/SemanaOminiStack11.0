import React,{useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi'
import {Link,useHistory} from 'react-router-dom';
import api from '../../services/api';

export default function Register(){

    const hist=useHistory();

    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [wpp,setWpp]=useState();
    const [city,setCity]=useState();
    const [uf,setUf]=useState();

    async function handleRegister(e){
        e.preventDefault();
        const data={
            name,
            email,
            wpp,
            city,
            uf
        };
        console.log(data);
        try{
            const res = await api.post('/ongs',data);
            alert(`Seu ID de acesso: ${res.data.id}`);
            hist.push('/')
        }catch(err){
            alert('Erro no cadastro\nTente novamente');
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="logo"/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadstro, entro na plataforma, ajude pessoas a encontrarem os casos da sua ONG</p>
                    <Link className="rout-link" to="/">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar para Login
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG" value={name} onChange={e=>setName(e.target.value)}/>
                    <input type="email" placeholder="E-mail" value={email} onChange={e=>setEmail(e.target.value)}/>
                    <input placeholder="WhatsApp" value={wpp} onChange={e=>setWpp(e.target.value)}/>
                    <div className="input-group"> 
                        <input placeholder="Cidade" value={city} on onChange={e=>setCity(e.target.value)}/>
                        <input placeholder="UF" style={{width:80}} value={uf} on onChange={e=>setUf(e.target.value)}/>
                    </div>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}