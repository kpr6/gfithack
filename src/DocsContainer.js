import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';

class Doc extends React.Component {
    render() {
        const docName = this.props.docName;
        const docid = this.props.docid;
        return(
            <Nav.Item>
                    <Nav.Link eventKey={docid}>{docName}</Nav.Link>
            </Nav.Item>
        );
    }
}

class DocSummary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {summary: ''}
    }

    componentDidMount(){
        console.log("Im here")
        console.log(this.props.docName)
        fetch('http://localhost:5000/docsummary?name=' + this.props.docName)
        .then(res => res.json())
        .then((result) => this.setState({summary: result['summary']}))
    }

    render() {
        return(
            <Tab.Pane eventKey={this.props.docid}>
                {this.state.summary}
            </Tab.Pane>
        );
    }
}

export default class DocsContainer extends React.Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        {this.props.docNames.map((doc, i) => <Doc docName={doc} docid={i}/>)}
                    </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        {this.props.docNames.map((doc, i) => <DocSummary docName={doc} docid={i}/>)}
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }
}