import React,{useState} from 'react';
import {FiLogIn} from 'react-icons/fi'
import './styles.css'
import {Link, useHistory} from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import api from '../../services/api'

export default function Logon(){

    const hist=useHistory();

    const [id,setId]=useState();

    async function handleLogin(e){
        e.preventDefault();
        try{
            const res=await api.post('/session',{id});
            localStorage.setItem('ongID',id);
            localStorage.setItem('ongName',res.data.name);
            hist.push('/profile');
        }catch(err){
            alert('Erro no Login')
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be a Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input placeholder="Sua ID..." value={id} onChange={e=>setId(e.target.value)}/>
                    <button className="button" type="submit">Entrar</button>
                    <Link className="rout-link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="heroes"/>
        </div>
    );
}