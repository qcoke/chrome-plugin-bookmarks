import React from "react"
import {Tree, Table, Row, Col} from "antd"

class TheBookTree extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            treeData: [],
            failureSource: [],
            columns: [
                {
                    title: '名称',
                    dataIndex: 'title',
                    key: 'title'
                }, {
                    title: '地址',
                    dataIndex: 'url',
                    key: 'url'
                }, {
                    title: '添加时间',
                    dataIndex: 'dateAdded',
                    key: 'dateAdded'
                }
            ]
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
        const _this_ = this;
        const bg = chrome.extension.getBackgroundPage()
        bg.check(data, function (FailureArr) {
            _this_.setState({
                failureSource: FailureArr
            })
        })
    }

    render() {
        return (
            <Row>
                <Col span={8}><Tree showLine treeData={this.state.treeData}/></Col>
                <Col span={16}>
                    <Table columns={this.state.columns} dataSource={this.state.failureSource} bordered={true}/>
                </Col>
            </Row>
        )
    }
}

export default TheBookTree
