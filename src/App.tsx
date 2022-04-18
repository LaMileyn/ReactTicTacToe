import React, {FC, useEffect, useState} from 'react';

const App: FC = () => {

    const [currentPlayer, setCurrentPlayer] = useState<"X" | "0">(
        Math.round(Math.random() * 1) === 1 ? "X" : "0"
    )
    const [squares, setSquares] = useState<Array<any>>(Array(9).fill(null))
    const [winner, setWinner] = useState<"X" | "0" | "BOTH" | null>(null)
    const setSquareValue = (index: number) => {
        let new_data = squares.map((el, i) => {
            if (i === index) {
                return currentPlayer
            }
            return el
        })
        setSquares(new_data)
        setCurrentPlayer(currentPlayer === "X" ? "0" : "X")
    }
    const reset = () =>{
        setSquares(Array(9).fill(null));
        setWinner(null)
        setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "0")
    }
    useEffect(()=>{
        const wi = checkTheWinner(squares);
        if (wi){
            setWinner(wi)
        }
        if(!wi && squares.filter( sq => sq === null).length === 0){
            setWinner("BOTH")
        }
    },[currentPlayer])
    const checkTheWinner = (squares : Array<any>) =>{
        const lines = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]
        for(let i = 0; i < lines.length; i++){
            const [a,b,c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
                return squares[a]
                break
            }
        }
    }


    return (
        <div className="wrapper">
            <div className="field">
                { !winner && <h2>Current player: {currentPlayer}</h2>}
                { winner && <h2>Our winner is: {winner}</h2>}

                <br/>
                <div className="board">
                    {
                        Array(9)
                            .fill(null)
                            .map((el, index) => {
                                    if (squares[index]){
                                        return <button  className={`square square_${squares[index].toLowerCase()}`} disabled={true}>{squares[index]}</button>
                                    }
                                    return <button key={index} onClick={()=> setSquareValue(index)} className={`square`} disabled={Boolean(winner)}></button>
                            })
                    }
                </div>
                <button className="reset" onClick={reset}>Restart The game | Reset</button>
            </div>
        </div>
    );
}

export default App;
