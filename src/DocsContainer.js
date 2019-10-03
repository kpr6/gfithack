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
        fetch('http://localhost:5000/docsummary?name=' + this.props.docName)
        .then(res => res.json())
        .then((result) => this.setState({summary: result}))
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
        this.state = {
            docs: this.props.docNames.split(",")
        }
        console.log(this.state.docs)
    }
    render(){
        let doclinks = this.state.docs.map((doc, i) => <Doc docName={doc} docid={i}/>)
        let docSummaries = this.state.docs.map((doc, i) => <DocSummary docName={doc} docid={i}/>)
        return(
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        {doclinks}
                    </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        {docSummaries}
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        );
    }
}