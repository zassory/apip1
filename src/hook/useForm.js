import { useState } from "react";

/**
 * 
 * @param {*} initialForm 
 * @returns formState deses
 * @returns form completo
 * @returns onInputChange la funcion que me setea los valores del form
 * @returns para resetear el formulario
 */
export const useForm = (initialForm = {}) => {
    const [formState, setFormState] = useState(initialForm);

    const onInputChange = ({target}) => {
        const { name , value } = target;

        setFormState({
            ...formState,
            [name]: value
        });
    }

    const onResetForm = () => {
        setFormState(initialForm);
    }

    return{
        ...formState,//Lo desestructuro
        formState,//Tambien lo mando completo
        onInputChange,
        onResetForm,
    }
}