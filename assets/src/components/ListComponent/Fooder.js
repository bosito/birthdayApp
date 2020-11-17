import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

//styles.....
import styles from '../../styles/GlobalStyles.js';

//Base de datos ....
import firebase from '../../utils/firebase';

export default function Fooder(props) {

    const { formulario, setFormulario } = props;

    const PasaFormulario = () => {
        setFormulario(!formulario)
    }

    const serrarsecion = () => {
        firebase.auth().signOut();
    }

    return (
        <View style={styles.ViewFooder}>

            <TouchableOpacity style={styles.BotonClose}
                onPress={serrarsecion}
            >
                <Text style={[styles.text, styles.textBoton]} >Cerrar Secion</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.BotonClose, { backgroundColor: '#1ea1f2', }]}
                onPress={PasaFormulario}
            >
                <Text style={[styles.text, styles.textBoton]}  >
                    {formulario ? 'Nueva Fecha' : 'Cancelar Fecha'}
                </Text>
            </TouchableOpacity>

        </View>
    )
}
