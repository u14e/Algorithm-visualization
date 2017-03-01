import Sort from 'Sorts';
import Utils from 'Utils';
import 'app.scss';
import 'normalize.css';

let randomArr = Utils.getRandomArray(100);
let box = document.querySelector('.queue-box'),
    parent,     // 调用renderQueue时赋值为queue的父元素
    queueNodes = box.childNodes;
let opt = document.querySelector('#operation'),
    btnBubbleSort = document.querySelector('#btn-bubble-sort'),
    btnSelectSort = document.querySelector('#btn-select-sort'),
    btnInsertSort = document.querySelector('#btn-insert-sort'),
    btnReset = document.querySelector('#reset');

// 插入多个元素，对DOM结构的开销比较大，先合并在parent节点，最后一次性插入
function renderQueue(box, arr) {
    let span;
    parent = document.createElement('div');

    box.innerHTML = '';

    arr.map(item => {
        span = document.createElement('span');
        span.title = item;
        span.style.height = item + 'px';
        span.className = 'queue-item';
        parent.appendChild(span);
    })

    box.appendChild(parent);
}

function init() {
    opt.addEventListener('click', event => {
        let e = event.target;
        if (e.id) {
            if (e.id.indexOf('sort') > -1) {
                let type = e.id.split('-')[1];
                Sort[type]({
                    parent,
                    speed: 10,
                })
            } else if (e.id === 'reset') {
                renderQueue(box, randomArr);
            }
        }
    })

    renderQueue(box, randomArr);
}

init();
