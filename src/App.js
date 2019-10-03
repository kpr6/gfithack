import React from 'react';

import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './App.css';
import DocsContainer from './DocsContainer';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {doclist: '', query: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({query: event.target.value});
  }
  async handleSubmit(event) {
    if(event.key == 'Enter'){
      const message = event.target.value
      console.log("react here")
      const rawResponse = await fetch('http://localhost:5000/doclist', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({msg: message})
    })
    const content = await rawResponse.json();
    console.log(content)
    // this.setState({doclist: content['list']})
    }
  }
  render() {
    const doclist = this.state.doclist;
    let docs;
    if(doclist){
      docs = <DocsContainer docNames={this.state.doclist}/>
    }
    return (
      <Container>
        <Row>
          <Col>
            <Form>
              <Form.Group controlId="formBasicSearch">
                <Form.Label>Intellisense Documents filter</Form.Label>
                <Form.Control type="input" 
                              value={this.state.query} 
                              onChange={this.handleChange} 
                              placeholder="Search with spaced keywords"
                              onKeyPress={this.handleSubmit} 
                              />
                <Form.Text className="text-muted">
                  Eg: trump imran
                </Form.Text>
              </Form.Group>
            </Form>
          </Col>  
        </Row>
        {docs}
      </Container>
    );
  }
}

export default App;
