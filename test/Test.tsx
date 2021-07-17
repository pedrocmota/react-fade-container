import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import Fade from '../src'

const Test: React.FunctionComponent = () => {
  return (
    <App/>
  )
}

const App = () => {
  const [visible, setVisible] = useState(true)
  return (
    <div style={{display: 'flex', flexDirection: 'column', 'alignItems': 'center'}}>
      <button style={{marginTop: 10}} onClick={() => setVisible(!visible)}>
        {!visible ? 'Mostrar' : 'Ocultar'}
      </button>
      <Fade visible={visible} style={{display: 'flex'}}>
        <div style={{width: '300px', height: '300px', backgroundColor: '#1593ce'}}/>
      </Fade>
    </div>
  )
}

ReactDOM.render(<Test/>, document.getElementById('root'))