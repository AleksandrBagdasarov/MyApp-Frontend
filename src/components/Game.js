import {BrowserRouter, Routes, Route, Link, useNavigate} from "react-router-dom"
import axios from "axios";
import { useState } from "react";
import { Header } from "./Header";
// import io from "socket.io-client";


const ValidForGame = () => {
    var [gameValue, setGameValue] = useState(0);
    var [ws, setWs] = useState(null);
    var [gamest, setGamest] = useState("NEW");
    var [gameId, setGameId] = useState("");
    var [bet, setBet] = useState(5);
    var userToken = localStorage.getItem("access_token");

    const instance = axios.create({
        baseURL: 'http://localhost:8080/api/v1',
        timeout: 3000,
        headers: {'Authorization': 'Bearer '+ userToken}
      });

    
    if (!gameId) {
        console.log("get game_id")
        instance.get("/game")
            .then(res => {
                setGameId(res.data.game_id)

                console.log(res)
        })
        console.log(gameId)
    }

    const ENDPOINT = "ws://localhost:8080/game/ws";
    const navigate = useNavigate();

    async function onSocketMsg(data) {
        console.log(data.win_amount)
        if (data.action === "play") {
            var elgamest = document.getElementById("gamest").textContent
            console.log(data)
            if (elgamest === "PLAY") {
                ws.send(JSON.stringify(
                    {
                        "action": "play", 
                        "access_token": userToken, 
                        "game_id": gameId,
                        "bet": bet
                    }
                ))
                setGameValue(data.win_amount)
            }
        }
        // error handle
        else {
            if (!data.win) {
                console.log("LOSE")
                setGamest("LOSE")
            }
        }
    };


    async function createWs() {
        ws = new WebSocket(ENDPOINT);
        ws.onopen = () => {
            console.log("ws open")
            ws.send(JSON.stringify(
                {
                    "action": "play", 
                    "access_token": userToken, 
                    "game_id": gameId,
                    "bet": bet
                }
            ))
        };
        ws.onclose = () => {
            console.log("ws close")
        };
        ws.onmessage = (event) => {
            onSocketMsg(JSON.parse(event.data))
        };
        ws.onerror = (error) => {
            console.error(error)
        };
        setWs(ws)
    }

    async function onStart() {
        console.log("start")

        setGamest("PLAY")
        if (!ws) {createWs()}

        ws.send(JSON.stringify(
            {
                "action": "play", 
                "access_token": userToken, 
                "game_id": gameId,
                "bet": bet
            }
        ))
    };

    async function onStop() {
        console.log("stop")
        setGamest("STOP")
        if (!ws) {createWs()}
        ws.send(JSON.stringify(
            {
                "action": "stop",
                "access_token": userToken, 
                "game_id": gameId,
            }
        ))
    };

    if (userToken) {
        return (
        // <div className="p-5 mb-2 bg-dark text-white w-100 m-auto">
        <div className="bg">

            <div className="center">
                <h1 id="h1" className="head">GAME IS HERE</h1>
                
                <br/>
                <div className="my-4 chartjs-render-monitor" id="myChart" >
                    {gameValue}
                </div>
                <div className="my-4 chartjs-render-monitor" id="myChart" >
                    <span id="gamest">{gamest}</span>
                </div>
                <div>
                    <label htmlFor="bet">BET  <input type="number" id="bet" name="bet" placeholder="5" onChange={e => setBet(e.target.value)} /></label>
                </div>
                <main className="form-signin w-100 m-auto">
                    <div className="btn">
                    <button type="button" className="btn btn-outline-light me-2" onClick={onStart}>Start</button>
                    <button type="button" className="btn btn-warning" onClick={onStop}>Stop</button>
                    </div>
                </main>
            </div>
        </div>
        )
    }
    else {
        return (
            <button type="button" className="btn btn-outline-light me-2" onClick={() => navigate('/login')}>Login</button>
        )
    }
};

export const Game = () => {

    return (
    <div><ValidForGame/></div>
    )
  };