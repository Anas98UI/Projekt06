import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import "./Modal.css"
import Modal from './Modal.jsx'

export default function App() {
  const[showModal,setShowModal]=useState(false)
  const [errors,setErrors]=useState([])

  const inputName=useRef()
  const inputEmail=useRef()
  const inputMsg=useRef()
  const inputCountry=useRef()
  const inputAccept=useRef()

  const validationForm=()=>{

    const nameValue=inputName.current.value
    const emailValue=inputEmail.current.value
    const msgValue=inputMsg.current.value
    const countryValue=inputCountry.current.value
    const acceptValue=inputAccept.current.checked
    let isFormValid=true

    if(nameValue.trim()=='')
      {
        setErrors((prevState)=>{
        return [...prevState, 'Name required']
                               })
         isFormValid=false
      }

    if(emailValue=='')
      {
        setErrors((prevState)=>{
        return [...prevState, 'Email required']
                               }) 

         isFormValid=false
      }

    else if(!emailValue.match(/^\S+@+\S+\.\S+$/))
      {
        setErrors((prevState)=>{
        return [...prevState, 'Email format invalid']
                                })
         isFormValid=false

      }
  
    if(msgValue.trim()=='')
      {
        setErrors((prevState)=>{
        return [...prevState, 'Message required']
                                })
      isFormValid=false
      }
       
    if(countryValue.trim()=='')
      {
        setErrors((prevState)=>{
        return [...prevState, 'Country required']
                               })
      isFormValid=false
      }
      
    if(!acceptValue)
      {
        setErrors((prevState)=>{
        return [...prevState, 'Accept conditions muss be checked']
                               })
      isFormValid=false
      }

  return isFormValid
  }

  const handleSubmit=(e)=>{ 
      e.preventDefault()

    setErrors([])
    const valid=validationForm()
    if(valid==false)
      {
        setShowModal(false)

      }
    else
      { 
         e.preventDefault()
         setShowModal(true)
      }
  
     
  }
  function handleDivClick(){
    if(showModal==true){
      setShowModal(false)
    }
  }
  
  return(<div onClick={handleDivClick}>

    {errors.length>0 ? 
    <ul className='bg-rose-300 list-disc list-inside text-black p-3.5 w-2/5 mx-auto mt-6 rounded-2xl '>
      <span>Errors:</span> 
      {errors.map((error,key)=>
        <li key={key}>{error}</li>

      )}
    </ul>
    :''}
    <form onSubmit={handleSubmit} className=' leading-10 p-6 max-w-1/2 mx-auto mt-10 bg-gray-200 "bg-amber-50" text-black text-xl rounded-4xl'>
      <h1>Contact form</h1>
      <hr />
      <div className='flex flex-col'>
        <label htmlFor="inputName">Name: </label>
        <input className="bg-amber-50 rounded-xl" type="text" id="inputName" ref={inputName} />
      </div>
      <div className='flex flex-col'>
        <label htmlFor="inputEmail">E-Mail: </label>
        <input className="bg-amber-50 rounded-xl" type="text" id="inputEmail" ref={inputEmail} />
      </div>
      <div className='flex flex-col'>
        <label htmlFor="inputMsg">Msg: </label>
        <textarea  className="bg-amber-50 rounded-xl"type="text" id="inputMsg" ref={inputMsg}  />
      </div>
      <div>
        <label>Country</label><br />
        <label htmlFor="country"></label>
        <select id="country" ref={inputCountry} className="bg-amber-50 rounded-xl" >
          <option value="">Select Country</option>
          <option value="MA">Marokko</option>
          <option value="DE">Deutschland</option>
          <option value="SCH">Schweiz</option>
          <option value="SP">Spanien</option>
          <option value="IT">Italien</option>
        </select>
      </div>
      <div>
        <input type="checkbox" id='inputChecked' className="w-6 h-6" ref={inputAccept} />
        <label  htmlFor="inputChecked"> Accept all conditions</label>
      </div>
      <div className=''>
        <input type="submit" value="Submit" id='inputSubmit' className='hover:bg-blue-600 px-auto min-w-12/12 bg-blue-500 rounded-xl text-amber-50 p-1.5' />
      </div>
    </form>
    
    {showModal &&<Modal/>}
    

   </div>)
  }