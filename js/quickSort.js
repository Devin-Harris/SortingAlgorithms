const delay = (ms) => new Promise(res => setTimeout(res, ms));

// First write the swap function, which is just a helper function to swap values of the arr.
async function swap(i, j) {

    drawBoard();

    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

    let elm1 = document.getElementById("index-" + i);
    let elm2 = document.getElementById("index-" + j);

    elm1.setAttribute("id", `index-${j}`);
    elm2.setAttribute("id", `index-${i}`);

    await delay(speed);

    drawBoard();

}

async function quickSort(left, right) {

    if (!sorting) {
        return;
    }

    if (left >= right) {
        return;
    }

    let pivot = await partition(left, right);
    states[pivot] = -1;

    await Promise.all([
        quickSort(left, pivot - 1),
        quickSort(pivot + 1, right),
    ]);
   
}

async function partition(left, right) {

    for (let i = left; i <= right; i++) {
        states[i] = 1;
    }

    // Lomuto algorithm always uses the last element, arr[right], for the pivot.
    let pivotValue = arr[right].value;
    let pivotIndex = left;

    states[pivotIndex] = 0;
    /*The logic under Lomuto is, we start from the leftmost element and keep track of index of smaller (or equal to) elements as j. While traversing, if we find a smaller element, we swap current element with arr[j]. Otherwise we ignore current element.*/
    for (let i = left; i < right; i++) {
        
        if (!sorting) {
            return;
        }

        if (arr[i].value < pivotValue) {
            await swap(i, pivotIndex);
            states[pivotIndex] = -1;
            pivotIndex++;
            states[pivotIndex] = 0;
        }
    }

    await swap(pivotIndex, right);

    for (let i = left; i <= right; i++) {
        if (i != pivotIndex) {
            states[i] = -1;
        }
    }

    return pivotIndex;
}