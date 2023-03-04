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
 

  function keyPair(){
    console.log("Checking the Key pair function")
    const keypair = Keypair.fromSecretKey(
      Uint8Array.from([37, 72, 82, 46, 248, 186, 70, 150, 70, 45, 128, 66, 81, 23, 198, 236, 86, 32, 87, 255, 113, 59, 153, 205, 64, 245, 238, 176, 154, 232, 156, 180, 254, 181, 252, 175, 89, 245, 24, 204, 130, 57, 69, 82, 210, 0, 125, 227, 229, 191, 239, 78, 210, 136, 233, 13, 70, 208, 186, 168, 206, 195, 196, 93,])
    );
    console.log(keypair)
    // const ownerKeyPair = Keypair.generate()
    // const publicKey = ownerKeyPair.publicKey
    // const secretKey = ownerKeyPair.secretKey
    // console.log(publicKey)
    // console.log(secretKey)
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
        <GenerateFromSecretKey handler={SecretSubmittedHandler}/>
      </div>
    </div>
  )
}

export default Home
