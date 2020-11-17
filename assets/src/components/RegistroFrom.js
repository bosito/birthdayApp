import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, ToastAndroid, KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { validateEmail } from '../utils/validacion'
import firebase from '../utils/firebase';
import 'firebase/auth';

//style
import styles from '../styles/GlobalStyles';
const colorFrom = '#969696';


export default function LoginForm(props) {

    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});

    const { cambioFormulario } = props;

    const Toast = (mensaje) =>  ToastAndroid.show(mensaje, ToastAndroid.LONG);

    const logeado = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(formData.email, formData.password)
            .catch(() => {
                console.log('error');
                setFormError({
                    email: true,
                    password: true,
                    repeatPassword: true,
                });
            });
    }

    const register = () => {
        let errors = {};

        if (!formData.email || !formData.password || !formData.repeatPassword) {
            if (!formData.email) {
                Toast('coloca un correo');
                errors.email = true;
            }
            if (!formData.password) {
                Toast('Ingresa una contraseña');
                errors.password = true;
            }
            if (!formData.repeatPassword) {
                Toast('rrepite la contraseña');
                errors.repeatPassword = true;
            }
            if (!formData.email & !formData.password & !formData.repeatPassword) {
                errors.email = true;
                errors.password = true;
                errors.repeatPassword = true;
                Toast('coloca tus datos');

            }
            //else if (!validateEmail(formData.email)) {
            //errors.email = true;
        } else if (formData.password !== formData.repeatPassword) {
            Toast('las contraseñas deben ser iguales')
            errors.password = true;
            errors.repeatPassword = true;
        } else if (formData.password.length < 6) {
            Toast('la contraseña deve ser mayor a 6 caracteres')
            errors.password = true;
            errors.repeatPassword = true;
        } else {
            Toast('cargando...');
            logeado();
        }
        setFormError(errors);
        //console.log(errors);
    }

    return (
        <>
            <KeyboardAvoidingView style={{ flex: 1 }}>
                <View style={[styles.containerSecundary, styles.styeContainer]}>

                    <TextInput
                        style={[styles.imput, formError.email && styles.errorImput]}
                        placeholder='Correo Electronico'
                        placeholderTextColor={colorFrom}
                        onChangeText={(e) => { setFormData({ ...formData, email: e }) }
                        }
                    />

                    <TextInput
                        style={[styles.imput, formError.password && styles.errorImput]}
                        placeholder='Contraseña'
                        secureTextEntry
                        placeholderTextColor={colorFrom}
                        onChange={(e) => { setFormData({ ...formData, password: e.nativeEvent.text }) }
                        }
                    />

                    <TextInput
                        style={[styles.imput, formError.repeatPassword && styles.errorImput]}
                        placeholder='Repetir Contraseña'
                        placeholderTextColor={colorFrom}
                        secureTextEntry
                        onChange={(e) => { setFormData({ ...formData, repeatPassword: e.nativeEvent.text }) }
                        }
                    />

                    <TouchableOpacity onPress={register}>
                        <Text style={styles.text}>Registrate</Text>
                    </TouchableOpacity>

                    <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 15 }}>

                        <TouchableOpacity onPress={cambioFormulario}>
                            <Text style={styles.text}>Inicial secion</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </KeyboardAvoidingView>
        </>

    );
}

const defaultValue = () => {
    return {
        email: '',
        password: '',
        repeatPassword: '',
    }
}