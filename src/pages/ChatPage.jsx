import {getOptions, fetchData} from "../utils/fetchData"
import {useState, useEffect} from "react"
import { TypeText } from "../utils/TypeText";

import {FiSend} from 'react-icons/fi'

const ChatPage = () => {

       const [input, setInput] = useState('')
       const [messages, setMessages] = useState([])

       const handleSubmit = async (ev) => {
        ev.preventDefault()
        const urlChatGPT = 'https://chatgpt53.p.rapidapi.com/'
        const options = getOptions(input)
        const i = messages.length + 1
        setMessages(prev => [...prev, {i, user: input}])

        messages.filter(item => item.i == i)
        const ai = await fetchData(urlChatGPT, options)

        setMessages(prev => [...prev, {user: input, ai: ai.content}])
        setInput('')
    }
        //  useEffect(() => {
        //     console.log(messages)

        // },[messages])

    
    return ( 
        <div className='bg-primaryPurple'>
        <form onSubmit={(ev) => handleSubmit(ev)} className='flex justify-between  px-8 rounded-full border w-[70vw] text-xl shadow-md'>
            <input type="text" placeholder='Send a message...'
                className='flex-1 m-2'
                value={input} 
                onChange={ev => setInput(ev.target.value)}
            />
                
            <button type='submit' className='text-2xl text-gray-500 ml-4 p-4'><FiSend /></button>
        </form>

        <div>
            {messages.length > 0 && messages.map((item, i) => {
                return (
                    <div key={i}>
                        <p>{item.user}</p>
                        {/* <p>{item.ai}</p> */}
                        <p>{item.ai ? <TypeText data={item.ai} key={i}/> : "......"}</p>
                    </div> 
                )
            })}
        </div>
    </div>
     );
}
 
export default ChatPage;