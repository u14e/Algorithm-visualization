import Sort from 'Sorts';
import Utils from 'Utils';
import 'app.scss';
import 'normalize.css';

let randomArr = Utils.getRandomArray(100);
let box = document.querySelector('.queue-box'),
    parent,     // 调用renderQueue时赋值为queue的父元素
    speed = 50,
    queueNodes = box.childNodes;
let opt = document.querySelector('#operation'),
    optTip = document.querySelector('.tip'),
    setting = document.querySelector('#btn-setting'),
    formSetting = document.querySelector('#setting'),
    settingError = formSetting.querySelector('.error');
let sorting = false;

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
            if (!sorting) {
                if (e.id.indexOf('sort') > -1) {
                    let type = e.id.split('-')[1];
                    sorting = true;
                    Sort[type]({
                        parent,
                        speed,
                        cb: () => {
                            sorting = false;
                        }
                    })
                } else if (e.id === 'reset') {
                    renderQueue(box, randomArr);
                }
            } else if (sorting) {
                optTip.textContent = '程序正在排序中~~~';
                return setTimeout(() => {
                    optTip.textContent = '';
                }, 1000);
            }
        }
    });

    setting.addEventListener('click', e => {
        e.preventDefault();
        if (sorting) {
            settingError.textContent = '程序正在排序中~~~';
            return setTimeout(() => {
                settingError.textContent = '';
            }, 1000);
        }
        let nodeTotal = document.querySelector('#total'),
            total = nodeTotal.value.trim(),
            nodeSpeed = document.querySelector('#speed');
        speed = nodeSpeed.value.trim();
        if(total && speed) {
            if(total.indexOf('.') > -1 || speed.indexOf('.') > -1 || !+total || !+speed) {
                return settingError.textContent = '请填写整数';
            }
            total = +total;
            speed = +speed;
            if(!(total >= 10 && total <= 200)) {
                return settingError.textContent = '样本量为10-200的整数';
            }
            if(!(speed >= 10 && speed <= 100)) {
                return settingError.textContent = '速度为10-100的整数';
            }

            settingError.textContent = '';
            randomArr = Utils.getRandomArray(total);
            renderQueue(box, randomArr);
        } else {
            settingError.textContent = '参数必须填写完整, 且为整数';
        }
    })

    renderQueue(box, randomArr);
}

init();
