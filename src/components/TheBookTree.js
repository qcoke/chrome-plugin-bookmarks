import React from "react"
import {Tree} from "antd"

class TheBookTree extends React.Component {
    componentDidMount() {
        const data = this.props.data
        let treeData = {title: '书签管理', key: '0-0', level: 'level1', open: true, child: []}

        function changeData(data, level = 0) {
            data.map(item => {
                if (item.children && item.children.length > 0) {
                    changeData(item.children, level + 1);
                } else {
                    item.child = item.children;
                    item.level = level;
                }
            });
            return data;
        }

        console.log(changeData(data));
    }

    render() {
        return (
            <Tree showLine treeData={this.props.data}/>
        )
    }
}

export default TheBookTree
