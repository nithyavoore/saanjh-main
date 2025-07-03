// 

import { useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import "./ChatBot.css";
const makeRequestAPI = async (prompt) => {
  const res = await axios.post("http://localhost:8080/diagnose", { prompt });
  return res.data;
};

function ChatBot() {

  const backgroundStyle = {
    backgroundImage: "url('https://wallpaperaccess.com/full/958470.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    position: 'relative',
  };

  const blurOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backdropFilter: 'blur(6px)',
    zIndex: 0,
  };
  const contentStyle = {
    zIndex: 1,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Roboto, sans-serif',
    backgroundColor:'rgba(220, 220, 220, 0.76)'
  };

  const [prompt, setPrompt] = useState("");
  const mutation = useMutation({
    mutationFn: makeRequestAPI,
    mutationKey: ["gemini-ai-request"],
  });
  const submitHandler = (e) => {
    e.preventDefault();
    mutation.mutate(prompt);
  };
  console.log(mutation);
  return (
    <div className="App" style={backgroundStyle}>
      <div style={blurOverlayStyle}></div>
      <div style={contentStyle} className="card p-4">
      
      <h2 className="text-dark">Gemini AI Content Generator</h2>
      <p>Enter a prompt and let Gemini AI craft a unique content for you.</p>
      <form className="App-form card " style={{ backgroundColor:'rgba(220, 220, 220, 0.76)'}}onSubmit={submitHandler}>
        <label htmlFor="Enter your prompt:"></label>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Write a content about..."
          className="App-input"
        />
        
        <button  className="mt-2 mx-1 text-light bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br font-medium rounded-lg text-s px-3 py-2 text-center me-2 mb-2" type="submit">
          Generate Content
        </button>
        </form>
        <section className="App-response text-dark">
          {mutation.isPending && <p>Generating your content</p>}
          {mutation.isError && <p>{mutation.error.message}</p>}
          {mutation.isSuccess && <p>{mutation.data}</p>}
        </section>
      
    </div>
    </div>
  );
}

export default ChatBot;