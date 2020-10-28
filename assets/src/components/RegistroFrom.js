import React, { useEffect, useState } from 'react';
import { Button, Text, View, TouchableOpacity, TextInput } from 'react-native';
import { validateEmail } from '../utils/validacion'

//style
import styles from '../styles/GlobalStyles';
const colorFrom = '#969696';


export default function LoginForm(props) {

    const [datosformulario, setDatosFormulario] = useState(defaultFormulario())
    const [formError, setFormError] = useState({});

    const { cambioFormulario } = props;

    const Registrate = () => {
        let errors = {};

        if(!datosformulario.contraseña || !datosformulario.correo || !datosformulario.repetirContraseña){
            if(!datosformulario.contraseña) errors.contraseña = true;
            if(!datosformulario.correo) errors.correo = true;
            if(!datosformulario.repetirContraseña) errors.repetirContraseña = true;
        } else if (!validateEmail(datosformulario.correo)){
            errors.correo = true;
        } else if(datosformulario.correo !== datosformulario.repetirContraseña){
            errors.correo = true;
            errors.repetirContraseña = true;
        } else if(datosformulario.contraseña.length < 6) {
            errors.correo = true;
            errors.repetirContraseña = true;
        }

        setFormError(errors)
        console.log(errors)
    }

    return (

        <View style={[styles.containerSecundary, styles.styeContainer]}>
            <TextInput
                style={[styles.imput, formError.correo && styles.errorImput ]}
                placeholder='Correo Electronico'
                placeholderTextColor={colorFrom}
                onChange={(e)=>{setDatosFormulario({...datosformulario, correo: e.nativeEvent.text})}}
            />
            <TextInput
                style={[styles.imput, formError.contraseña && styles.errorImput ]}
                placeholder='Contraseña'
                secureTextEntry
                placeholderTextColor={colorFrom}
                onChange={(e)=>{setDatosFormulario({...datosformulario, contraseña: e.nativeEvent.text})}}
            />
            <TextInput
                style={[styles.imput, formError.repetirContraseña && styles.errorImput]}
                placeholder='Repetir Contraseña'
                placeholderTextColor={colorFrom}
                secureTextEntry
                onChange={(e)=>{setDatosFormulario({...datosformulario, repetirContraseña: e.nativeEvent.text})}}
            />

            <TouchableOpacity onPress={Registrate}>
                <Text style={styles.text}>Registrate</Text>
            </TouchableOpacity>

            <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 15 }}>

                <TouchableOpacity onPress={cambioFormulario}>
                    <Text style={styles.text}>Inicial secion</Text>
                </TouchableOpacity>
            </View>

        </View>

    );
}

const defaultFormulario = ()=>{
    return(
        {
            correo: '',
            contraseña: '',
            repetirContraseña: '',
        }
    )
}