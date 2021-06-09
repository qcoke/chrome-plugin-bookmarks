function check(bookList, callback) {
    const dataList = bookList || [];
    const list = getList(dataList);
    let promiseList = [], FailureArr = [];
    list.map(item => {
        promiseList.push(new Promise((resolve, reject) => {
            $.ajax({
                url: item.url,
                type: 'GET',
                data: {},
                success: function (data) {
                    resolve(data)
                },
                error: function (error) {
                    FailureArr.push(item)
                    reject(error);
                }
            })
        }))
    })
    Promise.allSettled(promiseList).then(res => {
        callback(FailureArr);
    })
}

function getList(data) {
    let resultArr = [];

    function changeData(data) {
        for (let i = 0, icount = data.length; i < icount; i++) {
            let item = data[i]
            if (item.children && item.children.length > 0) {
                changeData(item.children)
            } else {
                item.children = null
                resultArr.push(item)
            }
        }
    }

    changeData(data)
    return resultArr;
}
