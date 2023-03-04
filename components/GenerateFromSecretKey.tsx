import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from '../styles/AddressForm.module.css'

export default function GenerateFromSecretKey(props: { handler: (secret: string) => void }){
    const [values, setValues] = useState({
        secret: '',
    });
    
    const handleSecretSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        props.handler(values.secret)
      };

    const handleSecretInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.persist();
        setValues((values) => ({
          ...values,
          secret: event.target.value,
        }));
    };
    return(
        <div>
            <div className={styles.From}>
                <form onSubmit={handleSecretSubmit}>
                    <input
                        id="SecretKey"
                        className={styles.formField}
                        type='text'
                        placeholder="Secret Key, eg:[1,2,3,44,53, .......................,35,]"
                        name="[]"
                        value={values.secret}
                        onChange={handleSecretInputChange}
                    />
                    <br />
                    <button type="submit" className={styles.formButton}>
                        Generate Public Key
                    </button>
                </form>
            </div>
        </div>
    )
}