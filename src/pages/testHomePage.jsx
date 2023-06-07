
import { useState, useEffect } from "react"
import { TypeText } from "../utils/TypeText"

import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { query, orderBy, onSnapshot } from "firebase/firestore"
import { doc, updateDoc } from 'firebase/firestore'

import {auth, db} from '../utils/firebase.js'

import avatarRobot from "../assets/images/robot_right.jpg"
import NewChat from "../components/NewChat"
import SignIn from "../components/SignIn"

const HomePage = () => {
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])

    const [cloudStore, setCloudStore] = useState([])
    // const [dots, setDots] = useState('.')
    // const [loading, setLoading] = useState(true)

    // console.log(cloudStore)
    
    // ADD MESSAGES TO FIREBASE CLOUD STORAGE 
    const addMessage = async (userInput, ai) => {
        if(userInput){
           await addDoc(collection(db, "messages"), {
              userText: userInput,
              aiText: ai,
              timestamp: serverTimestamp()
             })
        } else return
    }
    // GET ALL MESSAGES IN REAL TIME 
    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('timestamp'))
        const querySnapshot = (data) => {
            let messages = []
            data.forEach(doc => {
              messages.push({...doc.data(), id: doc.id})
            })
            setCloudStore(messages)
          }
          onSnapshot(q, querySnapshot)
        // onSnapshot(q, (querySnapshot) => {
        //   setCloudStore(querySnapshot.docs.map(doc => ({
        //     id: doc.id,
        //     data: doc.data()
        //   })))
        // })
      },[cloudStore])

    // SUBMIT function
    const handleSubmit = async (ev) => {
        ev.preventDefault()
        // Add the user input to the messages array
        let userInput = input
        setMessages(prevMessages => [...prevMessages, { id: Date.now(), input: userInput, ai: null }])
        // Clear input
        setInput('')
        // Call the API and update the message once the response is received
        try {
            
            const res = await fetch('https://icanhazdadjoke.com/slack')
            const ai = await res.json()
            const aiText = ai.attachments[0].text

            addMessage(userInput,aiText)
            // Find the message with the matching input and update it with the AI response
            setMessages(prev => prev.map(message => message.input == userInput ? {...message, ai: aiText} : message))
            // loading(false)

        } catch (error) {
            console.log(error)
        }
    }
    // const loading = () => {
    //     // setInterval(() => {
    //         setDots(prev => {
    //             if(prev.length < 3){
    //                return  prev + "."
    //             } else {
    //                 return ""
    //             }
    //         })
    //     // }, 1000)
    // }

    return (
        <div className=''>
           
            <div className="w-[70vw] mx-auto mt-3 mb-[80px]">
                {messages.length > 0 && messages.map((message) => (
                    <div key={message.id}>
                        <div className="relative flex items-center text-primaryPurple justify-end  rounded-full p-3">
                            <span>{message.input}</span>
                            <img src={avatarRobot} alt="" className="w-14 rounded-full ml-3"/>
                        </div>
                        <div className="relative flex items-center text-primaryPurple p-3 pr-4 bg-slate-100 rounded-full">
                            <img src={avatarRobot} alt="" className="w-14 rounded-full mr-3"/>
                            {message.ai ? <p ><TypeText data={message.ai} /></p> : <span className="loader"></span>}
                        </div>

                    </div>
                ))}
            </div>

            {/* Firebase Storage  */}
            {cloudStore.length > 0 && cloudStore.map((message) => (
                    <div key={message.id}>
                        <p>{message.userText}</p>
                        <p>{message.aiText}</p>
                    </div>
                ))}
                <SignIn />
                <NewChat />
                    
            <form onSubmit={(ev) => handleSubmit(ev)} 
                className='flex  justify-between z-20 px-8 rounded-full border w-[70vw] text-xl shadow-md fixed bottom-2 mx-auto inset-x-0 bg-white' 
            >
                <input type="text" placeholder='Send a message...'
                    className='flex-1 m-2 focus:outline-none text-primaryPurple'
                    value={input}
                    onChange={ev => setInput(ev.target.value)}
                />
                <button type='submit' className='text-2xl text-gray-500 ml-4 p-3'>Submit</button>
            </form>
        </div>
    );
}

export default HomePage;