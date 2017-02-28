import Sort from 'Sorts';
import Utils from 'Utils';
import 'app.scss';
import 'normalize.css';

let randomArr = Utils.getRandomArray(150);
let box = document.querySelector('.queue-box'),
    queueNodes = box.childNodes;
let btnBubbleSort = document.querySelector('#btn-bubble-sort'),
    btnSelectSort = document.querySelector('#btn-select-sort'),
    btnReset = document.querySelector('#btn-reset');

function renderQueue(box, arr) {
    let span;

    box.innerHTML = '';

    arr.map(item => {
        span = document.createElement('span');
        span.title = item;
        span.style.height = item + 'px';
        span.className = 'queue-item';
        box.appendChild(span);
    })
}

function init() {
    btnBubbleSort.addEventListener('click', () => {
        Sort.bubbleSort({
            parent: box,
            speed: 15,
        });
    });
    
    btnSelectSort.addEventListener('click', () => {
        Sort.selectSort({
            parent: box,
            speed: 30,
        })
    })

    btnReset.addEventListener('click', () => {
        renderQueue(box, randomArr);
    })

    renderQueue(box, randomArr);
}

init();
