//const Square = (props) => {
//  return <button> {props.id} </button>;
//};
const Square = ({id, player, newState}) => {
  const [color, setColor] = React.useState("green");
  const palet = ["red", "blue", "green"];
  const getRandomColor = () => palet[Math.floor(Math.random() *3)];
  const [status, setStatus] = React.useState(null);
  const xo = ["O", "X"];

  //React.useEffect(() => {
    //console.log(`Render ${id}`);
    //return () => console.log(`unmounting Square ${id}`);
  //});
  
  return (
    <button 
      onClick={e => {
        let col = getRandomColor();
        setColor(col);
        let nextPlayer = newState(id);
        setStatus(nextPlayer);
        e.target.style.background = col;
      }}
    >
      <h1>
        {xo[status]} 
      </h1>
    </button>
  );
  };

const Board = () => {
  const [player, setPlayer] = React.useState(1);
  const [mounted, setMounted] = React.useState(true);
  const [randVal, setRandVal] = React.useState(0);
  const [state, setState] = React.useState(Array(9).fill(null));

  let status = `Player ${player}`;
  let winner = checkWinner(state);
  console.log(winner)
  if (winner != null) status = `Player ${winner} wins!`;

  const newState = (idOfSquare) => {
    let thePlayer = player;
    state[idOfSquare] = player;
    setState(state);

    let nextPlayer = (player + 1) % 2;
    setPlayer(nextPlayer);
    setState([...state, idOfSquare]);
    return thePlayer;
  };

  function renderSquare(i) {
    return <Square id={i} player={player} newState={newState}></Square>
  };

  const toggle = () => setMounted(!mounted);
  const reRender = () => setRandVal(Math.random());

  return (
    <div
      className="game-board"
      onClick={(e) => {
        status = `Player ${player}`;
        //e.target.style.background = "Red";
      }}>

      <div className="grid-row">
        {mounted && renderSquare(0)}
        {mounted && renderSquare(1)}
        {mounted && renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>

      <div id="info">
        <h1>{status}</h1>
      </div>

      <button onClick={toggle}>Show/Hide Row</button>
      <button onClick={reRender}>Re-render</button>
    </div>
  );
};

// ========================================

ReactDOM.render(<Board />, document.getElementById("root"));
