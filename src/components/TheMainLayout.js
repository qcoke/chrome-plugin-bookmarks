import React from 'react'
import {Layout} from 'antd'
import TheBookTree from "./TheBookTree"

const {Header, Content} = Layout;

class TheMainLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillMount() {
        fetch("/data.json").then(res => res.json()).then(result => {
            this.setState({
                data: result.children
            });
        });
    };

    render() {
        return (
            <Layout>
                <Header>
                    <h3 className={"logo"}>BOOKMARK</h3>
                </Header>
                <Content>
                    <TheBookTree data={this.state.data}></TheBookTree>
                </Content>
            </Layout>
        )
    }
}

export default TheMainLayout
