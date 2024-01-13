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
  const [inputText, setInputText] = useState('print("Hello World!");');
  const [output, setOutput] = useState("");
  const [cpuTime, setCpuTime] = useState("");
  const [memory, setMemory] = useState("");
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
      const response = await axios.request(options);
      setCpuTime(response.data.cpuTime);
      setMemory(response.data.memory);
      setOutput(response.data.output);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className='flex flex-row justify-between p-5 text-3xl'>

        <h1 className='font-bold '>OP-<span className='text-red-500 font-bold '>IDE 🔥</span></h1>
        <a href="https://github.com/dipayansarkar47/online-code-editor" className='ml-auto gap-1 text-xl bg-black text-white px-2 py-1 rounded flex justify-end items-center' target='_blank' rel='noreferrer'>

        <FaGithubSquare className='text-3xl'/>
        <h2 className='font-semibold'>Github</h2>
      </a>
      </div>
      <form onSubmit={handleSubmit} className='' method="post">
        <Editor
        className='border-2 m-1 mx-4 h-52 shadow-xl'
          value={inputText}
          onValueChange={code => setInputText(code)}
          highlight={code => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
        <button className='bg-red-600 py-2 px-4 rounded text-white mt-2 flex flex-row mr-6 ml-auto justify-center items-center gap-2' type="submit">
        <FaPlay /> <span className='font-semibold'> Run Code</span></button>
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
