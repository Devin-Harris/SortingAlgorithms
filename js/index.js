let arr = [];
let arr_size = 30;
let sorted = false;
let sorting = false;
let sort_type = '';
let speed = 150;
let states = [];

$(document).ready(() => {

    arr = [];
    sorted = false;

    //Make Speed 1x highlighted
    $('#Delay_Container button:nth-child(1)').css({
        backgroundColor: 'palegreen',
        color: 'lightslategray',
        border: '2px solid palegreen',
    });

    //Slider Check
    $("#slider").slider({
        value: arr_size,
        max: 200,
        min: 2,
    });

    //Slide Event change array size
    $("#slider").on("slidestop", function (event, ui) {
        
        if (sorting) {
            sorting = false;
        }

        newArray(ui.value);
    });


    //Select event change sort type
    sort_type = $("#select option:selected").val();
    $("#select").change(() => {

        if (sorting) {
            sorting = false;
            newArray(arr_size);
        }

        sort_type = $("#select option:selected").val();

    });

    //Fill new array on button click and page load
    newArray($("#slider").slider("option", "value"));

    $('#newArrBtn').on('click', () => {
        
        if (sorting) {
            sorting = false;
        }

        newArray(arr_size);
    });

    //resize array widths on window resize
    $(window).resize(() => {
        loadBoard(arr_size);
    });
    
});

function SpeedClick(btn) {

    $('#Delay_Container button').css({
        backgroundColor: 'transparent',
        color: 'rgb(70, 70, 70)',
        border: '2px solid rgb(70, 70, 70)',
        
    });

    switch (btn.innerText) {
        case '1x':
            speed = 150;
            break;
        case '2x':
            speed = 60;
            break;
        case '5x':
            speed = 10;
            break;
        case '∞':
            speed = 1;
            break;
        default:
            break;
    }

    btn.style.backgroundColor = 'palegreen';
    btn.style.color = 'lightslategray';
    btn.style.border = '2px solid palegreen';

}

async function sortClick() {

    if (sorting) {
        sorted = true;
        sorting = false;
    }

    if (!(sorted)) {

        sorting = true;

        if (sort_type == "QuickSort") {
            await quickSort(0, arr.length - 1);
        } else if (sort_type == "SelectionSort") {
            await selectionSort(arr.length - 1);
        } else if (sort_type == "BubbleSort") {
            await bubbleSort(arr.length - 1);
        } else if (sort_type == "MergeSort") {
            arr = await mergeSort(arr);
        } else if (sort_type == "HeapSort") {
            await heapSort(arr);
        } else {
            console.log('Select a sorting algorithm');
        }

        if (sorting) {
            sorted = true;
        }

    } else if (sorted) {
        newArray(arr_size);
        await delay(1000);
        sortClick();
    }

    drawBoard();

}


function newArray(length) {

    sorted = false;
    arr.length = 0;
    arr_size = length;

    GenerateRandomArray(length);

    $('#originalArr').text(arr);
    $('#sortedArr').text('');

    loadBoard(length);

}

function loadBoard(length) {

    $('#Sorting_Container').html('');
    $('#arraySize').text(arr_size);

    let width_multiplier = ($('#Sorting_Container').outerWidth() / (arr_size)) + 'px';

    $('#Sorting_Container').css({
        gridTemplateColumns: `repeat(auto-fit, ${width_multiplier})`,
    });

    for (let i = 0; i < length; i++) {
        let elm = document.createElement('div');
        let p = document.createElement('p');
        elm.classList.add('section');
        elm.classList.add(`value-${arr[i].value}`);
        elm.setAttribute("id", `index-${i}`);
        p.innerText = arr[i].value;
        p.style.fontSize = (2500 / arr_size) + '%';
        elm.append(p);

        let height = (arr[i].value);

        if (height >= $('#Sorting_Container').height()) {
            elm.style.height = $('#Sorting_Container').height() + '%';
        } else {
            elm.style.height = height + '%';
        }
        
        elm.style.gridArea = `1 / ${(i + 1)} / 1 / ${(i + 1)}`;
        

        $('#Sorting_Container').append(elm);
    }


}

function drawBoard() {

    for (let i = 0; i < arr_size; i++) {
        
        if (states[i] == 0) {
            $(`#index-${i}`).css({ backgroundColor: '#f44336'});
        } else if (states[i] == 1) {
            $(`#index-${i}`).css({ backgroundColor: '#795548' });
        } else {
            $(`#index-${i}`).css({ backgroundColor: 'palegreen' });
        }

        $(`#index-${i}`).css('grid-area', `1 / ${i + 1} / 1 / ${(i + 1)}`);

    }

    if (sorted) {
        for (let i = 0; i < arr_size; i++) {
            $(`#index-${i}`).css({ backgroundColor: 'palegreen' });
        }
    }

}



function GenerateRandomArray(length) {

    for (let i = 0; i < length; i++) {
        let obj = { index: i, value: getRandomInt(1, 100) }
        arr.push(obj);
        states[i] = -1;
    }

}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

