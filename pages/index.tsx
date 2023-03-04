import * as web3 from '@solana/web3.js'
import type { NextPage } from 'next'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import AddressForm from '../components/AddressForm'
import GenerateFromSecretKey from '../components/GenerateFromSecretKey'
import { Keypair } from '@solana/web3.js'


const Home: NextPage = () => {
  const [balance, setBalance] = useState(0)
  const [address, setAddress] = useState('')
  const [isExecutable, setIsExecutable] = useState(false)
  const [secret, setSecret] = useState<string>('')
 

  function keyPair(){
    const ownerKeyPair = Keypair.generate()
    const publicKey = ownerKeyPair.publicKey
    const secretKey = ownerKeyPair.secretKey
    console.log(publicKey)
    console.log(secretKey)
  }

  const addressSubmittedHandler = (address: string) => {
    try {
      setAddress(address)
      const key = new web3.PublicKey(address)
      const connection = new web3.Connection(web3.clusterApiUrl('devnet'))
      connection.getBalance(key).then(balance => {
        setBalance(balance / web3.LAMPORTS_PER_SOL)
      })
      connection.getAccountInfo(key).then(info =>{
        setIsExecutable(info?.executable ?? false )
      })
      console.log(connection.getAccountInfo(key))  
    } catch (error) {
      setAddress('')
      setBalance(0)
      alert(error)
    }
  }
  const SecretSubmittedHandler=(secret:string) =>{
    console.log(secret)
    const inputString = secret;
    const inputArray = inputString.substring(1, inputString.length-1).split(", ").map(x => parseInt(x));
    console.log(inputArray);
    const keypair = Keypair.fromSecretKey(
      Uint8Array.from(inputArray)
    );
    console.log(keypair.publicKey)
    const pubKey = keypair.publicKey
    //setSecret(pubKey)
  }

  return (
    <div>
      <div className={styles.App}>
        <header className={styles.AppHeader}>
          <p>
            Start Your Solana Journey
          </p>
          <AddressForm handler={addressSubmittedHandler} />
          <p>{`Address: ${address}`}</p>
          <p>{`Balance: ${balance} SOL`}</p>
          <p>{`Is it executable? ${isExecutable ? 'Yep' : 'Nope'}`}</p>
          <button type="submit" className={styles.formButton} onClick={keyPair}>Create Keys</button>
        </header>
      </div>
      <div className={styles.App}>
        <header className={styles.AppHeader}>
          <p>
            Generate Public Key from Sceret Key
          </p>
          <GenerateFromSecretKey handler={SecretSubmittedHandler}/>
        </header>
      </div>
    </div>
  )
}

export default Home
