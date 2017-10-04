import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './index.css';
import React from 'react';
import { render } from 'react-dom';
import { Form } from 'reform';
// import { saveToState } from 'reform/utils';
// import { TextInput, Button } from 'reform/inputs';

class App extends React.Component {
    render() {
        return (
            <div>
              <Form onChange={saveToState(this)} onClick={(name, form) => name === «myButton» ? alert(«You clicked mah button»)} >
                  <TextInput
                      name="text1"
                      value={this.state.text1.value}
                  />
                  <TextInput
                      name="text2"
                      value={this.state.text2.value}
                  />
                  <Button name="myButton">Hello</Button>
              </Form>
            </div>
        )
    }
}

render(<App/>, document.querySelector("#app"));
