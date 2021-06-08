import React from 'react'
import {Layout, Button} from 'antd'
import TheBookTree from "./TheBookTree"

const {Header, Content} = Layout;

class TheMainLayout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'middle',
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

    /* 调用子组件的方法 */
    checkBookmarks = () => {
        this._child.checkData(this.state.data);
    }

    render() {
        return (
            <Layout>
                <Header>
                    <h3 className={"logo"}>BOOKMARK</h3>
                </Header>
                <Content>
                    <div className={"tree-panel"}>
                        <TheBookTree data={this.state.data} ref={child => this._child = child}></TheBookTree>
                    </div>
                    <div className={"footer-bar"}>
                        <Button type="primary" size={this.state.size} onClick={this.checkBookmarks}>一键检测</Button>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default TheMainLayout
