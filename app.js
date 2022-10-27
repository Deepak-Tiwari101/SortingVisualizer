
// on every page load session storage checks for the prev saved height bars and the speed to sort.
window.addEventListener('load', (e) => {
    if(sessionStorage.getItem('barDiv') != null){
        speed.removeAttribute('disabled');
        enableBtn(allBtnArr);
        const string = sessionStorage.getItem('barDiv');
        parent.innerHTML = string;
        sessionStorage.removeItem('barDiv');
        
        const childElems = parent.children;
        const len = childElems.length;
        for(let i = 0; i < len; i++) {
            childElems[i].style.backgroundColor = 'rgb(' + 255 + ',' + 189 + ',' + 42 + ')';
        }
    }
    if(sessionStorage.getItem('speed') != null) {
        const val = parseInt(sessionStorage.getItem('speed'));
        speed.value = val;
        delay_in_ms = 20000/val;
    }
    if(sessionStorage.getItem('number') != null) {
        slider.value = parseInt(sessionStorage.getItem('number'));
        sessionStorage.removeItem('number');
    }

})

// to generate random height to provide bar height property.
function getRandomNumberedArray(number_of_bars) {
    let arr = [];
    for (let i = 0; i < number_of_bars; i++) {
        arr.push(Math.floor(Math.random() * (101))); // [0, 100] --> Both inclusive
    }
    return arr;
}

// to pass height and get the bar as return value.
function getBarDiv(height) {
    const myBar = document.createElement('div');
    myBar.classList.add('bar-height-div');
    myBar.style.height = height + 'px';

    return myBar;
}

// to append the bars inside of the parent div.
function appendBarDivs(parent, heightArr) {
    parent.innerHTML = ``;
    let mainDivHeight = parent.clientHeight;
    heightArr.forEach((height) => {
        let relativeHeight = Math.floor((height/100) * mainDivHeight);
        parent.appendChild(getBarDiv(relativeHeight));
    })
}

// to get the height of the bar passed as argument.
function getHeight(ele) {
    let sty = window.getComputedStyle(ele);
    let height = sty.getPropertyValue("height").split('p')[0]; //to remove 'px'

    return parseInt(height);
}

// to swap the heights of two bar elements.
function swap(elem1, h1, elem2, h2) {
    elem1.style.height = h2 + 'px';
    elem2.style.height = h1 + 'px';
}

// to add the delay while swapping and changing color properties.
const delay = (delayInms) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
  }
//--------------------------------------------------------------------------------------------------

//--------------------------------------SORTING ALGOs-----------------------------------------------

async function bubbleSort(parent) {
    const childElems = parent.children;
    const len = childElems.length;
    for(let i = 0; i < len; i++) {
        for(let j = 0; j < len - i - 1; j++) {

            let ele1 = childElems[j];
            let ele2 = childElems[j+1];
            
            ele1.style.backgroundColor = "red";
            ele2.style.backgroundColor = "red";

            const height1 = getHeight(ele1);
            const height2 = getHeight(ele2);
            
            if(height1 > height2) {
                await delay(delay_in_ms);
                swap(ele1, height1, ele2, height2);
            }
            ele1.style.backgroundColor = 'rgb(' + 255 + ',' + 189 + ',' + 42 + ')';
            ele2.style.backgroundColor = 'rgb(' + 255 + ',' + 189 + ',' + 42 + ')';
        }
        childElems[len - 1 - i].style.backgroundColor = "green";
    }
}
//--------------------------------------------------------------------------------------------------

async function selectionSort(parent) {
    const childElems = parent.children;
    const len = childElems.length;
    for(let i = 0; i < len - 1; i++) {
        let min_idx = i;
        for(let j = i + 1; j < len; j++) {

            let ele1 = childElems[min_idx];
            let ele2 = childElems[j];

            ele1.style.backgroundColor = "blue";
            ele2.style.backgroundColor = "red";

            await delay(delay_in_ms/2);

            const height1 = getHeight(ele1);
            const height2 = getHeight(ele2);

            if(height1 > height2) {
                min_idx = j;
            }

            ele1.style.backgroundColor = 'rgb(' + 255 + ',' + 189 + ',' + 42 + ')';
            ele2.style.backgroundColor = 'rgb(' + 255 + ',' + 189 + ',' + 42 + ')';
        }
        const i_height = getHeight(childElems[i]);
        const min_height = getHeight(childElems[min_idx]);
        if(i_height > min_height) {
            swap(childElems[i], i_height, childElems[min_idx], min_height);
        }
        childElems[i].style.backgroundColor = "green";
    }
    childElems[len - 1].style.backgroundColor = "green";
}
//--------------------------------------------------------------------------------------------------

async function insertionSort(parent) {
    const childElems = parent.children;
    const len = childElems.length;

    for(let i = 1; i < len; i++) {
        let k = i;
        let j = k - 1;

        while(j >= 0) {
            let ele1 = childElems[k];
            let ele2 = childElems[j];

            ele1.style.backgroundColor = "red";
            ele2.style.backgroundColor = "red";
    
            let height1 = getHeight(ele1);
            let height2 = getHeight(ele2);

            if(height2 > height1) {
                await delay(delay_in_ms);
                swap(ele1, height1, ele2, height2);
                j--;
                k--;

                ele1.style.backgroundColor = 'rgb(' + 255 + ',' + 189 + ',' + 42 + ')';
                ele2.style.backgroundColor = 'rgb(' + 255 + ',' + 189 + ',' + 42 + ')';
            }
            else {
                ele1.style.backgroundColor = 'rgb(' + 255 + ',' + 189 + ',' + 42 + ')';
                ele2.style.backgroundColor = 'rgb(' + 255 + ',' + 189 + ',' + 42 + ')';
                break;
            };
        }
    }
    for(let i = 0; i < len; i++) {childElems[i].style.backgroundColor = "green"; await delay(5);}
}
//--------------------------------------------------------------------------------------------------

async function Partition(parent, l, h) {
    const childElems = parent.children;
    let pivot = childElems[l];
    pivot.style.backgroundColor = "blue"; // change the pivot color to blue
    let i = l;
    let j = h;

    let pivotHeight = getHeight(pivot);

    while(i < j) {
        let ele1 = childElems[i];
        let ele2 = childElems[j];

        let height1 = getHeight(ele1);
        let height2 = getHeight(ele2);

        while(i < h && height1 <= pivotHeight){
            i++;
            ele1 = childElems[i];
            ele1.style.backgroundColor = "red";
            height1 = getHeight(ele1);
            await delay(delay_in_ms/2);
            ele1.style.backgroundColor = 'rgb(' + 255 + ',' + 189 + ',' + 42 + ')';
        }
        ele1.style.backgroundColor = "purple";
        await delay(delay_in_ms/3);
        while(j >= l && height2 > pivotHeight) {
            j--;
            ele2 = childElems[j];
            ele2.style.backgroundColor = "red";
            height2 = getHeight(ele2);
            await delay(delay_in_ms/2);
            ele2.style.backgroundColor = 'rgb(' + 255 + ',' + 189 + ',' + 42 + ')';
        }
        ele2.style.backgroundColor = "purple";
        await delay(delay_in_ms/3);

        if(i < j) swap(ele1, height1, ele2, height2);
        ele1.style.backgroundColor = 'rgb(' + 255 + ',' + 189 + ',' + 42 + ')';
        ele2.style.backgroundColor = 'rgb(' + 255 + ',' + 189 + ',' + 42 + ')';
    }
    pivot.style.backgroundColor = 'rgb(' + 255 + ',' + 189 + ',' + 42 + ')';
    swap(pivot, pivotHeight, childElems[j], getHeight(childElems[j]));
    childElems[j].style.backgroundColor = "green";
    return j;
}
async function quickSort(parent, l, h) {
    if(l <= h){
        var p = await Partition(parent, l, h);
        await quickSort(parent, l, p - 1);
        await quickSort(parent, p + 1, h);
    }
}
//--------------------------------------------------------------------------------------------------

async function merge(parent, l, m, r) {
    let childElems = parent.children;
    let n1 = m - l + 1;
    let n2 = r - m;

    let L = new Array(n1);
    let R = new Array(n2);

    for(let iter = 0; iter < n1; iter++){
        childElems[iter + l].style.backgroundColor = "red";
        L[iter] = childElems[iter + l].style.height.split('p')[0];
    }
    for(let iter = 0; iter < n2; iter++){
        childElems[iter + m + 1].style.backgroundColor = "red";
        R[iter] = childElems[iter + m + 1].style.height.split('p')[0];
    }

    let i = 0, j = 0, k = l;
    while(i < n1 && j < n2) {
        if(parseInt(L[i]) <= parseInt(R[j])) {
            await delay(delay_in_ms/2);
            childElems[k].style.height = L[i++] + 'px';
            childElems[k].style.backgroundColor = "green";
        }
        else {
            await delay(delay_in_ms/2);
            childElems[k].style.height = R[j++] + 'px';
            childElems[k].style.backgroundColor = "green";
        }
        k++;
    }

    while(i < n1) {
        await delay(delay_in_ms/4);
        childElems[k].style.backgroundColor = "green";
        childElems[k++].style.height = L[i++] + 'px';
    }
    while(j < n2) {
        await delay(delay_in_ms/4);
        childElems[k].style.backgroundColor = "green";
        childElems[k++].style.height = R[j++] + 'px';
    }
}
async function mergeSort(parent, l, h) {
    if(l < h) {
        let mid = parseInt(l + (h - l)/2);
        await mergeSort(parent, l, mid);
        await mergeSort(parent, mid + 1, h);

        await merge(parent, l, mid, h);
    }
}
//--------------------------------------------------------------------------------------------------


//--------------------------------------------------------------------------------------------------
//enable and disable all buttons from the list

function disableBtn(btnList) {
    btnList.forEach((btn) => {
        btn.disabled = true;
    });
}
function enableBtn(btnList) {
    btnList.forEach((btn) => {
        btn.disabled = false;
    });
}
//--------------------------------------------------------------------------------------------------

//==================================================================================================

let heightArray = [];
let delay_in_ms = 200;
let parent = document.querySelector('#bar');
let newArrBtn = document.getElementById('new-arr');
let slider = document.getElementById('myRange');
let speed = document.getElementById('mySpeed');
let bubSorBtn = document.getElementById('bubble-sort');
let susSorBtn = document.getElementById('selection-sort');
let insSorBtn = document.getElementById('insertion-sort');
let quiSorBtn = document.getElementById('quick-sort');
let merSorBtn = document.getElementById('merge-sort');
let stop = document.getElementById('stop-btn');
let allBtnArr = [parent, newArrBtn, slider, bubSorBtn, susSorBtn, insSorBtn, quiSorBtn, merSorBtn];
//--------------------------------------------------------------------------------------------------

// Add the bars as per the random heights and append it to the parent Element(#bar)  
newArrBtn.addEventListener('click', () => {
    slider.value = 50;
    heightArray = getRandomNumberedArray(50);
    appendBarDivs(parent, heightArray);
    slider.removeAttribute('disabled');
    speed.removeAttribute('disabled');
    enableBtn(allBtnArr);

})
//accessing the value for the number of bars from slider
slider.addEventListener('input', (e) => {
    
    let numBars = e.target.value;
    heightArray = getRandomNumberedArray(numBars);
    appendBarDivs(parent, heightArray);
})
//getting the speed set by the user
speed.addEventListener('input', (e) => {
    let val = e.target.value;
    delay_in_ms = 20000/val;
})
//adding event listener for bubble sort
bubSorBtn.addEventListener('click', async (e) => {
    e.target.classList.remove('btn-outline-primary');
    e.target.classList.add('btn-primary');
    disableBtn(allBtnArr);
    await bubbleSort(parent);
    e.target.classList.remove('btn-primary');
    e.target.classList.add('btn-outline-primary');
    enableBtn(allBtnArr);
});
//adding event listener for selection sort
susSorBtn.addEventListener('click', async (e) => {
    e.target.classList.remove('btn-outline-primary');
    e.target.classList.add('btn-primary');
    disableBtn(allBtnArr);
    await selectionSort(parent);
    enableBtn(allBtnArr);
        e.target.classList.remove('btn-primary');
    e.target.classList.add('btn-outline-primary');
})
//adding event listener for insertion sort
insSorBtn.addEventListener('click', async (e) => {
    e.target.classList.remove('btn-outline-primary');
    e.target.classList.add('btn-primary');
    disableBtn(allBtnArr);
    await insertionSort(parent);
    enableBtn(allBtnArr);
        e.target.classList.remove('btn-primary');
    e.target.classList.add('btn-outline-primary');
})
//adding event listener for quick sort
quiSorBtn.addEventListener('click', async (e) => {
    e.target.classList.remove('btn-outline-primary');
    e.target.classList.add('btn-primary');
    disableBtn(allBtnArr);
    let high = parent.children.length - 1;
    await quickSort(parent, 0, high);
    enableBtn(allBtnArr);
        e.target.classList.remove('btn-primary');
    e.target.classList.add('btn-outline-primary');
})
//adding event listener for merge sort
merSorBtn.addEventListener('click', async (e) => {
    e.target.classList.remove('btn-outline-primary');
    e.target.classList.add('btn-primary');
    disableBtn(allBtnArr);
    let h = parent.children.length - 1;
    await mergeSort(parent, 0, h);
    enableBtn(allBtnArr);
        e.target.classList.remove('btn-primary');
    e.target.classList.add('btn-outline-primary');
})
//--------------------------------------------------------------------------------------------------

//adding event listener for stop button
stop.addEventListener('click', () => {
    const barDivContent = parent.innerHTML;
    const speedVal = speed.value;
    const numBars = slider.value;
    sessionStorage.setItem('number', numBars);
    sessionStorage.setItem('speed', speedVal);
    sessionStorage.setItem('barDiv', barDivContent);
    location.reload();
});