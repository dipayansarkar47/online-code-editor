import axios from 'axios';
import { useState } from 'react';
import './App.css';
import { FaGithubSquare } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another

function App() {
  const [inputText, setInputText] = useState('print("Made with 💓 by Codewithbiki")');
  const [output, setOutput] = useState("");
  const [cpuTime, setCpuTime] = useState("");
  const [memory, setMemory] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  // const handleInputChange = (e) => {

  //   setInputText(e.target.value);
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      url: 'https://online-code-compiler.p.rapidapi.com/v1/',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '824dddee65msh76dbe040b14bfe4p12ab6ajsnc6532155d4f8',
        'X-RapidAPI-Host': 'online-code-compiler.p.rapidapi.com'
      },
      data: {
        language: 'python3',
        version: 'latest',
        code: inputText,
        input: null
      }
    };
    try {
      setButtonClicked(true);
      const response = await axios.request(options);
      setButtonClicked(false);
      setCpuTime(response.data.cpuTime);
      setMemory(response.data.memory);
      setOutput(response.data.output);
      console.log(response.data.output);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className='flex flex-row justify-between p-5 text-3xl'>

        <h1 className='font-bold '>OP-<span className='text-red-500 font-bold '>IDE 🔥</span></h1>
        <a href="https://github.com/dipayansarkar47/online-code-editor" className='ml-auto gap-1 text-xl bg-black text-white px-2 py-1 rounded flex justify-end items-center' target='_blank' rel='noreferrer'>

          <FaGithubSquare className='text-3xl' />
          <h2 className='font-semibold'>Github</h2>
        </a>
      </div>
      <form onSubmit={handleSubmit} className='' method="post">
        <Editor
          className='border-2 m-1 mx-4 h-52 shadow-xl focus:outline-none'
          value={inputText}
          onValueChange={code => setInputText(code)}
          highlight={code => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 14,
          }}
        />
        {buttonClicked ? (<button className='bg-red-700 py-2 px-4 rounded text-white mt-2 flex flex-row mr-6 ml-auto justify-center items-center gap-2' type="submit">
          <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-1 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
          </svg> <span className='font-semibold'> Running Code</span></button>) : (<button className='bg-red-600 py-2 px-4 rounded text-white mt-2 flex flex-row mr-6 ml-auto justify-center items-center gap-2' type="submit">
            <FaPlay /> <span className='font-semibold'> Run Code</span></button>)}
      </form>

      {output && cpuTime && memory && <div className='flex flex-col m-5 border-2 rounded shadow-xl p-2'>
        <h2 className='text-2xl font-bold'>Output:</h2>
        <p className='text-green-500 text-xl font-mono py-2'>{output}</p>
        <br />
        <div className='flex flex-row justify-evenly gap-4 '>

          <h3 className='w-1/2 text-center flex flex-col gap-1 justify-center items-center bg-gray-800 rounded text-white h-32 text-xl'> <h2 className='font-bold '>CPU Used: </h2> <h1 className='text-3xl text-green-400'>{cpuTime} <span className='text-3xl text-green-400'>%</span></h1>  </h3>
          <h3 className='w-1/2 text-center flex flex-col gap-1 justify-center items-center bg-gray-800 rounded text-white h-32 text-xl'> <h2 className='font-bold '>Memory Used: </h2> <h1 className='text-3xl text-green-400'>{memory} <span className='text-3xl text-green-400'>KB</span></h1>  </h3>
        </div>
      </div>}
    </>
  );
}

export default App;
