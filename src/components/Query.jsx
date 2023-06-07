import {useState, useEffect} from 'react'
import {getOptions, fetchData} from "../utils/fetchData"

import {FiSend} from 'react-icons/fi'

const Query = ( {data}) => {
    // const [answer, setAnswer] = useState('')
    const [input, setInput] = useState('')
    const [setAnswer, messages, setMessages] = data
    

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        const urlChatGPT = 'https://chatgpt53.p.rapidapi.com/'
        const options = getOptions(input)

        const queryResponse = await fetchData(urlChatGPT, options)
        setMessages(prev => prev.map(item => [...item, input, queryResponse.content]))
        setInput('')
        setAnswer(queryResponse.content)
        

    }

    return ( 
        <div className='mt-4'>
            <form onSubmit={(ev) => handleSubmit(ev)} className='flex justify-between  px-8 rounded-full border w-[70vw] text-xl shadow-md'>
                <input type="text" placeholder='Send a message...'
                    className='flex-1 m-2'
                    value={input} 
                    onChange={ev => setInput(ev.target.value)}
                />
                    
                <button type='submit' className='text-2xl text-gray-500 ml-4 p-4'><FiSend /></button>
            </form>
        </div>
     );
}
 
export default Query;