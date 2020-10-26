import React, { useEffect, useState } from 'react';
import { Button, Text, View, TouchableOpacity, TextInput } from 'react-native';

//style
import styles from '../styles/GlobalStyles'


export default function LoginForm(props) {

    const [datosformulario, setDatosFormulario] = useState(defaultFormulario)

    const { cambioFormulario } = props;

    const Registrate = () => {

    }

    return (

        <View style={[styles.containerSecundary, styles.styeContainer]}>
            <TextInput
                style={styles.imput}
                placeholder='Correo Electronico'
                placeholderTextColor='#969696'
            />
            <TextInput
                style={styles.imput}
                placeholder='Contraseña'
                secureTextEntry
                placeholderTextColor='#969696'
            />
            <TextInput
                style={styles.imput}
                placeholder='Repetir Contraseña'
                placeholderTextColor='#969696'
                secureTextEntry
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