import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Script from 'next/script'
import { ProgressBar } from  'react-loader-spinner'
import { useState } from 'react'

export default function Home() {

  const [isLoader, setLoader] = useState(false)

  const connectWallet = async ()=>{
    setLoader(true)
    if (typeof window.ethereum == 'undefined') {
      alert("Please install XDCPay")
      return;
    }
    try{
      window.web3 = new window.Web3(window.ethereum);
      await window.ethereum.enable()
      const accounts = await window.web3.eth.getAccounts()
      window.account = accounts[0].replace("0x","xdc");
      const signature = await window.web3.eth.sign(window.web3.utils.sha3(`challange: ${(Math.random() + 1).toString(36).substring(7)}`), window.account);
      let x = new Promise((resolve, reject)=>{
        setTimeout(()=>{
          resolve(signature)
        }, 1000)
      }) 
      let out = await x
      console.log(out)
      location.replace("/editor/index.html")
    }catch(e){
      console.error(e)
      alert("Unlock wallet to continue")
    }
    setLoader(false)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>XDCFlow</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        
      </Head>
      <Script src="/web3.min.js" />
      <main className={styles.main}>
        <div style={{display:'flex', alignItems:'center'}}>
          <span style={{fontSize: 180, color:'white', fontFamily:'monospace', fontWeight:'bolder'}} >XDC</span>
          <span style={{fontSize: 120, fontWeight:'bold'}} className={'gradientText'}>Flow</span>
          
        </div>
        <span  style={{fontSize: 40, color:'white'}}>
          No-Code DeFi Automation Platform.
        </span>
        {!isLoader && (<button style={{cursor:'pointer', marginTop:25, fontSize: 25, padding:5, paddingLeft:25, paddingRight:25, borderRadius:30, fontWeight:'bold'}} onClick={async ()=>{
          connectWallet()
        }}>Let's Go</button>)}
        {isLoader && (<ProgressBar
          height="80"
          width="80"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass="progress-bar-wrapper"
          borderColor = '#F4442E'
          barColor = '#51E5FF'
        />)}
      </main>


    </div>
  )
}
