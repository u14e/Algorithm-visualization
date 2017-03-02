let queueNodes = null,
    arr = [],
    len = 0;
let count = 0,      // logs的索引
    logs = [];      // 排序算法的每次循环指令都被push进来

let clear = () => {
    count = 0;
    logs = [];
};

let init = parent => {
    queueNodes = parent.childNodes;
    arr = [...queueNodes].map(item =>
            +item.title
        );
    len = arr.length;
}

export default {
    bubble({ parent, speed = 10, cb = () => {} }) {
        let tempElement;
        init(parent);

        for (let i = 0; i < len - 1; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    [ arr[j], arr[j + 1] ] = [ arr[j + 1], arr[j] ];
                    logs.push([j, j + 1]);
                }
            }
        }

        let timer = setInterval(() => {
            if (count < logs.length) {
                tempElement = parent.removeChild(queueNodes[ logs[count][1] ]);
                parent.insertBefore(tempElement, queueNodes[ logs[count][0] ]);
                count++;
            } else {
                clearInterval(timer);
                clear();
                cb();
            }
        }, speed);
    },

    select({ parent, speed = 50, cb = () => {} }) {
        let min = 0;
        let tempRightElement,
            tempLeftElement;
        init(parent);

        for (let i = 0; i < len; i++) {
            min = i;
            
            for (let j = i + 1; j < len; j++) {
                if (arr[min] > arr[j]) {
                    min = j;
                }
            }

            if (i !== min) {
                [ arr[i], arr[min] ] = [ arr[min], arr[i] ];
                logs.push([i, min]);
            }
        }

        let timer = setInterval(function() {
            if (count < logs.length) {
                tempRightElement = parent.removeChild(queueNodes[ logs[count][1] ]);
                parent.insertBefore(tempRightElement, queueNodes[ logs[count][0] + 1 ]);
                tempLeftElement = parent.removeChild(queueNodes[ logs[count][0] ]);
                parent.insertBefore(tempLeftElement, queueNodes[ logs[count][1] ]);
                count++;
            } else {
                clearInterval(timer);
                clear();
                cb();
            }
        }, speed);
    },

    insert({ parent, speed = 50, cb = () => {}  }) {
        let value,      // 当前比较的值
            i,          // 未排序部分的当前位置
            j,          // 已排序部分的当前位置
            tempElement;
        init(parent);
        
        for (i = 0; i < len; i++) {
            value = arr[i];     // 保存当前位置的值

            j = i -1;
            while ( j >= 0 && arr[j] > value) {
                arr[j+1] = arr[j];
                j--;
            }

            arr[j+1] = value;

            if (j !== i - 1) {  // 有移动时，push移动日志
                logs.push([j+1, i]);
            }
        }

        let timer = setInterval(() => {
            if (count < logs.length) {
                tempElement = parent.removeChild(queueNodes[ logs[count][1] ]);
                parent.insertBefore(tempElement, queueNodes[ logs[count][0] ]);
                count++;
            } else {
                clearInterval(timer);
                clear();
                cb();
            }
        }, speed);
    }
}