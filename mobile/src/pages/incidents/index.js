import React, {useState, useEffect} from 'react';
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native';
import {Feather} from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native';
import logoImg from '../../assets/logo.png';
import styles from './styles';
import api from '../../services/api';

export default function Incidents(){

    const [incid, setIncidents]=useState([]);
    const [total, setTotal]=useState();
    const [page, setPage]=useState(1);
    const [loading, setLoading]=useState(false)
    const nav=useNavigation();

    function openDetails(incident){
        nav.navigate('Details',{incident})
    }

    async function loadIncidents(){
        if(loading){
            return;
        }

        if(total>0 && incid.length==total){
            return;
        }
        setLoading(true);
        const res = await api.get('/incidents',{
            params: {page}
        })
        setIncidents([...incid,...res.data]);
        setTotal(res.headers['x-total-count']);
        setPage(page+1);
        setLoading(false);
    }

    useEffect(()=>{
        loadIncidents();
    },[])

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}/>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTxtBold}>{total} casos</Text>.
                </Text>
            </View>
            <Text style={styles.title}>Bem-Vindo</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia</Text>
            <FlatList data={incid} onEndReached={loadIncidents} onEndReachedThreshold={0.2} style={styles.incidentList} keyExtractor={incident => String(incident.id)} showsVerticalScrollIndicator={false} renderItem={({item:incident})=>(
                <View style={styles.incident}>
                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>
                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>
                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR',{style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>
                    <TouchableOpacity style={styles.detailsButton} onPress={()=>openDetails(incident)}>
                        <Text style={styles.detailsText}>Ver mais detalhes</Text>
                        <Feather name='arrow-right' size={16} color='#e02041'/>
                    </TouchableOpacity>
            </View>
            )}/>
        </View>
    );
}