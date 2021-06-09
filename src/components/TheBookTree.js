import React from "react"
import {Tree, Table, Row, Col} from "antd"

class TheBookTree extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            treeData: [],
            tableFail: []
        }
    }

    componentWillReceiveProps(nextProps) {
        let treeData = []

        function changeData(data, level = 0) {
            for (let i = 0, icount = data.length; i < icount; i++) {
                let item = data[i]
                item.open = true
                item.level = level
                item.key = `item-id-${item.id}`
                if (item.children && item.children.length > 0) {
                    changeData(item.children, level + 1)
                } else {
                    item.children = null
                }
            }
        }

        changeData(nextProps.data)
        treeData = nextProps.data
        this.setState({
            treeData
        })
    }

    checkData(data) {
        let promiseArr = []

        function loopData(data) {
            for (let i = 0, icount = data.length; i < icount; i++) {
                let item = data[i]
                if (item.children && item.children.length > 0) {
                    loopData(item.children)
                } else {
                    if (item.url) {
                        const bg = chrome.extension.getBackgroundPage()
                        promiseArr.push(bg.checkUrl(item.url))
                    }
                }
            }
        }

        loopData(data)
        console.log("promiseArr:", promiseArr)
        Promise.all(promiseArr.map(p => p.catch(err => console.log('err:', err)))).then(value => {
            console.log("value:", value)
        }).catch(error => {
            console.log("error:", error)
        })
    }

    render() {
        return (
            <Row>
                <Col span={12}><Tree showLine treeData={this.state.treeData}/></Col>
                <Col span={12}><Table dataSource={this.state.tableFail} bordered={true}/></Col>
            </Row>
        )
    }
}

export default TheBookTree
