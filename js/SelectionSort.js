async function selectionSort(end) {

    let min_index;

    for (let i = 0; i < end; i++) {

        min_index = i;

        for (let j = i + 1; j < end + 1; j++) {

            if (!sorting) {
                return;
            }

            if (arr[j].value < arr[min_index].value) {
                //states[min_index] = 1;
                min_index = j;
                //states[min_index] = 0;
            }
        
        }

        for (let k = 0; k < i; k++) {
            states[k] = 1;
        }
        states[min_index] = 0;
        await swap(min_index, i);
        states[min_index] = -1;
        states[i] = 0;
    }

}