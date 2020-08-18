async function mergeSort(unsortedArray) {

    if (!sorting) {
        return;
    }

    if (unsortedArray.length <= 1) {
        return unsortedArray;
    }

    let middle = Math.floor(unsortedArray.length / 2);

    let SplitArrays = SplitArray(unsortedArray, middle);

    let left = await mergeSort(SplitArrays[0]);
    let right = await mergeSort(SplitArrays[1]);
    let resultArr = await merge(await mergeSort(left), await mergeSort(right));
    
    for (let k = 0; k < resultArr.length; k++) {
        states[resultArr[k].index] = 1;
    }

    return resultArr;

}



async function merge(left, right) {

    let resultArr = [];
    let leftIndex = 0;
    let rightIndex = 0;

    let startingIndex = left[0].index;
    let maxIndex = left[0].index;
    
    for (let i = 0; i < left.length; i++) {
        if (left[i].index < startingIndex) {
            startingIndex = left[i].index;
        }
    }

    while (leftIndex < left.length && rightIndex < right.length) {

        if (left[leftIndex].value < right[rightIndex].value) {
            resultArr.push(left[leftIndex]);

            states[left[leftIndex].index] = 0;
            leftIndex++; // move left array cursor
        } else {
            resultArr.push(right[rightIndex]);

            states[right[rightIndex].index] = 0;
            rightIndex++; // move right array cursor
        }
    }

    let leftArr = SliceArray(left, leftIndex);
    let rightArr = SliceArray(right, rightIndex);
    resultArr = resultArr.concat(leftArr).concat(rightArr);

    for (let i = 0; i < resultArr.length; i++) {
        if (resultArr[i].index < startingIndex) {
            startingIndex = resultArr[i].index;
        }
        if (resultArr[i].index > maxIndex) {
            maxIndex = resultArr[i].index;
        }
    }

    if (maxIndex - startingIndex == resultArr.length - 1) {
        for (let i = 0; i < resultArr.length; i++) {
            $(`.section:nth-child(${resultArr[i].index + 1})`).attr('id', `index-${startingIndex + i}`);
        }
        await delay(speed);
        drawBoard();
    }

    
    
    return resultArr;

}

function SliceArray(array, index) {

    let new_array = [];

    for (let i = 0; i < array.length; i++) {
        if (i >= index) {
            new_array.push(array[i]);
        }
    }

    return new_array;
}

function SplitArray(unsortedArray, middle) {

    let SplitArrays = [];
    let left = [];
    let right = [];

    for (let i = 0; i < middle; i++) {
        left.push(unsortedArray[i]);
    }

    for (let j = middle; j < unsortedArray.length; j++) {
        right.push(unsortedArray[j]);
    }

    SplitArrays.push(left);
    SplitArrays.push(right);
    return SplitArrays;

}