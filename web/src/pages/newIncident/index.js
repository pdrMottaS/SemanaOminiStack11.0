import React,{useState} from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import {FiArrowLeft} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom';
import api from '../../services/api';

export default function NewIncident(){

    const[title,setTitle]=useState();
    const[description,setDescription]=useState();
    const[value,setValue]=useState();

    const ongID=localStorage.getItem('ongID');
    const hist=useHistory();

    async function handleNewIncident(e){
        e.preventDefault();
        const data={
            title,description,value
        };
        try{
            await api.post('/incidents',data,{
                headers:{
                    auth:ongID
                }
            })
            hist.push('/profile')
        }catch(err){
            alert('Erro ao cadastrar Caso\nTente Novamente')
        }
    }

    return(
        <div className="new-incident">
            <div className="content">
                <section>
                    <img src={logoImg} alt="logo"/>
                    <h1>Cadastrar novo Caso</h1>
                    <p>Descreva o caso detalhadamente para um herói resolver isso</p>
                    <Link className="rout-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041"/>
                        Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Título do caso"/>
                    <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder="Descrição"/>
                    <input value={value} onChange={e=>{setValue(e.target.value)}} placeholder="Valor em reais"/>
                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}