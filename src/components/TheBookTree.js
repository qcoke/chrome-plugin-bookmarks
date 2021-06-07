import React from "react"
import {Tree} from "antd"

class TheBookTree extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            treeData: []
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
                    // item.child = item.children;
                    changeData(item.children, level + 1)
                } else {
                    item.children = null
                }
            }
        }
        changeData(nextProps.data)
        treeData = nextProps.data
        console.log('treeData ===>', treeData)
        this.setState({
            treeData
        })
    }

    render() {
        return (
            <Tree showLine treeData={this.state.treeData}/>
        )
    }
}

export default TheBookTree
