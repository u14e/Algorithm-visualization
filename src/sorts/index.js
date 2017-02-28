export default {
    bubbleSort({ parent, speed = 30 }) {
        let queueNodes = parent.childNodes;
        let arr = [...queueNodes].map(item =>
            +item.title
        ),
            len = arr.length;
        let tempElement,
            count = 0,      // logs的索引
            logs = [];      // 排序算法的每次循环指令都被push进来
        
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
            }
        }, speed);
    },

    selectSort({ parent, speed = 30 }) {
        let queueNodes = parent.childNodes;
        let arr = [...queueNodes].map(item =>
            +item.title
        ),
            len = arr.length,
            min = 0;
        let tempRightElement,
            tempLeftElement,
            count = 0,
            logs = [];

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
            }
        }, speed);
    },
}