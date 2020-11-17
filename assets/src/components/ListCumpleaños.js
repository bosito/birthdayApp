import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import moment from 'moment';

import firebase from '../utils/firebase';
import "firebase/firestore";

//firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

//components...
import ListaCumpleañeros from './ListComponent/ListaCumpleañeros';
import FormListCumpleaños from './ListComponent/FormListCumpleaños';
import Fooder from './ListComponent/Fooder';

//styles...
import styles from '../styles/GlobalStyles';

export default function ListCumpleaños(props) {

    const { user } = props;

    const [formulario, setFormulario] = useState(true);
    const [listaCumpleañeros, setlistaCumpleañeros] = useState([]);
    const [pasadoCumpleaños, setPasadoCumpleaños] = useState([]);

    useEffect(() => {
        setlistaCumpleañeros([]);
        setPasadoCumpleaños([]);
        db.collection(user.uid)
            .orderBy('Cumpleaños', 'asc')
            .get()
            .then((response) => {
                const itemsArray = [];
                response.forEach((doc) => {
                    //console.log(doc)
                    //console.log(doc.data());
                    const data = doc.data();
                    data.id = doc.id;
                    itemsArray.push(data)
                })
                separadorDatos(itemsArray);
            })

    }, [])

    const separadorDatos = (items) => {
        const currentDate = moment().set({
            hour: 0,
            minute: 0,
            second: 0,
            millisecond: 0
        });
        const ArrayTempCumplañeros = [];
        const ArrayTempCumpleañerosPasadas = [];

        items.forEach( (item) => {
            const Cumpleaño = new Date(item.Cumpleaños.seconds * 1000);
            const datosCumpleaño = moment(Cumpleaño);
            const currentYear = moment().get('year');
            datosCumpleaño.set({ year: currentYear })
            const difDate = currentDate.diff(datosCumpleaño, 'days');

            const itemTemp = item;
            itemTemp.Cumpleaños = datosCumpleaño;
            itemTemp.dias = difDate;

            if (difDate <= 0) {
                ArrayTempCumplañeros.push(itemTemp)
            } else {
                ArrayTempCumpleañerosPasadas.push(itemTemp)
            }
        })

        // console.log('estos son cumpleaños que estan por venir', ArrayTempCumplañeros);
        // console.log('estos son los cumpleaños que ya pasaron en dias', ArrayTempCumpleañerosPasadas);
        setlistaCumpleañeros(ArrayTempCumplañeros);
        setPasadoCumpleaños(ArrayTempCumpleañerosPasadas);

    }


    return (

        <View style={styles.ListContainer}>

            {formulario ? (
                <ScrollView style={styles.scrollist} >
                    <ListaCumpleañeros  />
                </ScrollView>
            ) : (
                    <FormListCumpleaños user={user} setFormulario={setFormulario} />
                )
            }
            <Fooder formulario={formulario} setFormulario={setFormulario} />

        </View>

    )
}
