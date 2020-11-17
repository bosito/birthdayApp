import React, { useState, useRef } from 'react';
import { View, Text, TextInput, ToastAndroid, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

//styles...
import styles from '../../styles/GlobalStyles';

//base de datos---
import firebase from '../../utils/firebase';
import "firebase/firestore";

//firebase.firestore().settings({experimentalForceLongPolling: true})
const db = firebase.firestore(firebase);

export default function FormListCumpleaños(props) {

    const { user, setFormulario } = props;

    const [date, setDate] = useState(new Date());
    const [PikerVisible, setPikerVisible] = useState(true);

    //comprobador de datos 
    const [formData, setFormData] = useState({});
    const [formError, setFormError] = useState({});
    //estado de fecha
    const [inuputDatos, setinuputDatos] = useState('Fecha de Nacimiento');

    const ref_input2 = useRef();
    const ref_input3 = useRef();

    //pasar a otra pantalla ( componente );
    const Datepicer = () => {
        setPikerVisible(!PikerVisible)
    }

    const datosDatepicer = (data) => {
        var Info = data.nativeEvent.timestamp;
        if (Info == undefined) {
            Datepicer();
            setFormData({});
            setinuputDatos('Fecha de Nacimiento');
        } else {
            Datepicer();
            let myDate = new Date(Info);
            myDate.setHours(0);
            myDate.setMinutes(0);
            myDate.setSeconds(0);
            setFormData({ ...formData, Cumpleaños: myDate })
            //let Cumpleaños = myDate.toLocaleDateString();
            //setFormData({...formData, Cumpleaños})
            let formatoFecha = moment(myDate).format("LL");
            setinuputDatos(formatoFecha);
        }
    }

    const Toast = (mensaje) =>  ToastAndroid.show(mensaje, ToastAndroid.LONG);

    const register = () => {

        let errors = {};
        if (!formData.Nombre || !formData.Apellido || !formData.Cumpleaños) {
            if (!formData.Nombre) {
                Toast('coloca un Nombre');
                errors.Nombre = true;
            }
            if (!formData.Apellido) {
                Toast('Ingresa un Apellido');
                errors.Apellido = true;
            }
            if (!formData.Cumpleaños) {
                Toast('Ingresa un Cumpleaños');
                errors.Cumpleaños = true;
            }
            if (!formData.Nombre & !formData.Apellido & !formData.Cumpleaños) {
                errors.Nombre = true;
                errors.Apellido = true;
                errors.Cumpleaños = true;
                Toast('coloca los datos del cumplañero');
            }
        } else {
            Toast('cargando ....');
            const date = formData;
            date.Cumpleaños.setYear(0);

            db.collection(user.uid)
                .add(date)
                .then(() => {
                    Toast("cumplañero creado :)");
                    setFormulario(true);
                })
                .catch(() => {
                    alert('Ocurrio un error')
                    setFormError({
                        Nombre: true,
                        Apellido: true,
                        Cumpleaños: true,
                    })
                })
        }
        setFormError(errors);
    }

    const onChange = (e, type) => {
        //console.log('data: ', e.nativeEvent.text);
        //console.log('tipe: ', type);
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    }

    const colorFrom = '#969696';

    return (
        <>
            <View style={styles.containerOpcion}>
                <TextInput
                    style={[styles.imput,
                    formError.Nombre && styles.errorImput
                    ]}
                    placeholder={'Nombre'}
                    returnKeyType={"next"}
                    placeholderTextColor={colorFrom}
                    onSubmitEditing={() => ref_input2.current.focus()}
                    onChange={(e) => onChange(e, 'Nombre')}
                />

                <TextInput
                    ref={ref_input2}
                    style={[styles.imput,
                    formError.Apellido && styles.errorImput
                    ]}
                    placeholder={'Apellido'}
                    returnKeyType={"next"}
                    placeholderTextColor={colorFrom}
                    onSubmitEditing={() => ref_input3.current.focus()}
                    onChange={(e) => onChange(e, 'Apellido')}
                />

                <View style={[styles.imput, styles.textDatePiker, formError.Cumpleaños && styles.errorImput]} ref={ref_input3} >
                    <Text onPress={Datepicer} style={{ color: formData.Cumpleaños ? 'white' : colorFrom, fontSize: 18 }}>
                        {inuputDatos}
                    </Text>
                </View>

                <TouchableOpacity onPress={register}>
                    <Text style={[styles.text, styles.textBoton]} >Crear Nuevo Cumpleañero</Text>
                </TouchableOpacity>

            </View>

            {PikerVisible ? (null) : (
                <DateTimePicker
                    value={date}
                    onChange={datosDatepicer}
                />
            )}

        </>
    )
}