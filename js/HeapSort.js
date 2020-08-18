let array_length;
/* to create MAX  array */
async function heap_root(input, i) {

    if (!sorting) {
        return;
    }

    let left = 2 * i + 1;
    let right = 2 * i + 2;
    let max = i;

    if (left < array_length && input[left].value > input[max].value) {
        max = left;
    }

    if (right < array_length && input[right].value > input[max].value) {
        max = right;
    }

    if (max != i) {
        states[max] = 0;
        await swap(i, max);
        states[max] = -1;
        await heap_root(input, max);
    }
}

async function heapSort(input) {

    if (!sorting) {
        return;
    }

    array_length = input.length;

    for (let i = Math.floor(array_length / 2); i >= 0; i -= 1) {

        if (!sorting) {
            return;
        }

        await heap_root(input, i);
    }

    for (i = input.length - 1; i > 0; i--) {

        if (!sorting) {
            return;
        }

        states[i] = 1;
        await swap(0, i);

        array_length--;


        await heap_root(input, 0);
    }
}