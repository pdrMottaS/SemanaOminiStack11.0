import React,{useState,useEffect} from 'react';
import logoImg from '../../assets/logo.svg';
import {Link,useHistory} from 'react-router-dom'
import { FiPower, FiTrash2 } from 'react-icons/fi';
import './styles.css';
import api from '../../services/api';

export default function Profile(){

    const hist=useHistory();

    const [incidents,setIncidents]=useState([]);
    const ongID=localStorage.getItem('ongID');
    const ongName=localStorage.getItem('ongName');

    useEffect(()=>{
        api.get('/profile',{
            headers:{
                auth: ongID,
            }
        }).then(res=>{
            setIncidents(res.data);
        })
    },[ongID])

    async function handleDeleteIncident(id){
        try{
            await api.delete(`/incidents/${id}`,{
                headers:{
                    auth:ongID,
                }
            });
            setIncidents(incidents.filter(incident=>incident.id!=id))
        }catch(err){
            alert('Erro ao apagar caso\n tente novamente')
        }
    }

    function handleLogout(){
        localStorage.clear();
        hist.push('/')
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="logo"/>
                <span>Bem-vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {incidents.map(incident=>(
                    <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>
                    <strong>DESCRIÇÃO CASO:</strong>
                    <p>{incident.description}</p>
                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(incident.value)}</p>
                    <button type="button" onClick={()=>handleDeleteIncident(incident.id)}>
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}