import React, { useState } from 'react';
import { View, Image, } from 'react-native';

//style
import styles from '../styles/GlobalStyles'
//Components
import LoginForm from '../components/LoginForm'
import RegistroForm from '../components/RegistroFrom'



export default function Auth() {

    const [isUser, steIsUser] = useState(true);

    const cambioFormulario = () => {
        steIsUser(!isUser);
    }

    return (
        <View style={[styles.styeContainer, styles.containerSecundary]}>
            <Image source={require('../../img/logo.png')} style={styles.image} />
            { isUser ?
                (
                    <LoginForm cambioFormulario={cambioFormulario} />
                ) : (
                    <RegistroForm cambioFormulario={cambioFormulario} />
                )
            }
        </View>
    );
}