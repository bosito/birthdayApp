import React, { useEffect, useState, useRef, } from 'react';
import { Button, Text, View, TouchableOpacity, TextInput, ToastAndroid, Platform } from 'react-native';
import firebase from '../utils/firebase'

//style
import styles from '../styles/GlobalStyles'

const colorFrom = '#969696';

export default function LoginForm(props) {

    const { cambioFormulario } = props;

    const [formData, setFormData] = useState(defaultValue())
    const [formError, setFormError] = useState({});

    const ref_input2 = useRef();

    const Toast = (mensaje) => ToastAndroid.show(mensaje, ToastAndroid.LONG);

    /*useEffect(() => {
         Platform.select({
             ios: () => console.log('estoy en ios'),
             android:  Toast,
             web: () => console.log('estoy en la web'),
         })
 
     }, []);*/



    const Comprobando = () => {
        firebase.auth()
            .signInWithEmailAndPassword(formData.email, formData.password)
            .catch(() => {
                console.log('error');
                setFormError({
                    email: true,
                    password: true,
                });
            })
    }

    const Logeando = () => {
        const errors = {};
        if (!formData.email || !formData.password) {

            if (!formData.email) {
                errors.email = true;
                Toast('Coloca un email valido');
            }
            if (!formData.password) {
                errors.password = true;
                Toast('Coloca una contraseña');
            }
            if (!formData.email & !formData.password) {
                errors.email = true;
                errors.password = true;
                Toast('rrellena todos los campos');
            }

        } else {
            //Toast('cargando...');
            Comprobando();
        }
        //console.log(formData);
        setFormError(errors);
        //console.log(errors);
    }

    const onChange = (e, type) => {
        //console.log('data: ', e.nativeEvent.text);
        //console.log('tipe: ', type);
        setFormData({ ...formData, [type]: e.nativeEvent.text });
    }

    return (

        <>
            <TextInput
                style={[styles.imput, formError.email && styles.errorImput]}
                placeholder='Correo Electronico'
                autoFocus={true}
                blurOnSubmit={false}
                returnKeyType={"next"}
                onSubmitEditing={() => ref_input2.current.focus()}
                placeholderTextColor={colorFrom}
                onChange={(e) => onChange(e, 'email')}
                //onChangeText={onChange(e, 'email')}
            />

            <TextInput
                ref={ref_input2}
                style={[styles.imput, formError.password && styles.errorImput]}
                placeholder='Contraseña'
                returnKeyType={"go"}
                secureTextEntry
                placeholderTextColor={colorFrom}
                onSubmitEditing={Logeando}
                onChange={(e) => onChange(e, 'password')}
            />
            <TouchableOpacity onPress={Logeando}>
                <Text style={styles.text}>Inicias Secion</Text>
            </TouchableOpacity>

            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 15 }}>

                <TouchableOpacity onPress={cambioFormulario}>
                    <Text style={styles.text}>Registrate</Text>
                </TouchableOpacity>

            </View>

        </>

    );
}

const defaultValue = () => {
    return (
        {
            email: '',
            password: '',
        }
    )
}