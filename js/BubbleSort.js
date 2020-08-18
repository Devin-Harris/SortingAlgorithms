async function bubbleSort(size) {

    for (let i = 0; i < size; i++) {

        for (let j = 0; j < size - i; j++) {

            if (!sorting) {
                return;
            }
            
            if (arr[j].value > arr[j + 1].value) {
                await swap(j, j+1);
            }

        }

        states[size - i] = 1;

    }

}