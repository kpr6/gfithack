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
    this.state = {doclist: ''}
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    if(event.key == 'Enter'){
      fetch('http://localhost:5000/doclist', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({msg: event.target.value})
      })
      .then(res => res.json())
      .then((result) => {
        console.log(result)
        this.setState({doclist: result})
      })
      console.log(event.target.value)
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
                              // value={this.state.query} 
                              // onChange={this.handleChange} 
                              placeholder="Search with spaced keywords"
                              onKeyPress={this.handleChange} 
                              />
                <Form.Text className="text-muted">
                  Eg: hkma ler regulatory
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
