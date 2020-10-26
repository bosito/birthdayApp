import React, { useEffect, useState } from 'react';
import { Button, Text, View, TouchableOpacity } from 'react-native';

//style
import styles from '../styles/GlobalStyles'


export default function LoginForm(props) {

    const { cambioFormulario } = props;

    return (

        <View style={[styles.containerSecundary, styles.styeContainer]}>
            <Text style={styles.text}>formulario de login comun</Text>
            <TouchableOpacity onPress={cambioFormulario}>
                <Text>Registrate</Text>
            </TouchableOpacity>

        </View>

    );
}