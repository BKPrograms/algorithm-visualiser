export function getMergeAnims(array) {
    const animations = [];
    if (array.length <= 1) {
        return array;
    }

    const helperArray = array.slice();

    mergeSortHelper(array, 0, array.length - 1, helperArray, animations);

    return animations;
}

function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            // We overwrite the value at index k in the original array with the
            // value at index i in the auxiliary array.
            animations.push([k, auxiliaryArray[i]]);
            mainArray[k++] = auxiliaryArray[i++];
        } else {
            // We overwrite the value at index k in the original array with the
            // value at index j in the auxiliary array.
            animations.push([k, auxiliaryArray[j]]);
            mainArray[k++] = auxiliaryArray[j++];
        }
    }
    while (i <= middleIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([i, i]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([i, i]);
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
        // These are the values that we're comparing; we push them once
        // to change their color.
        animations.push([j, j]);
        // These are the values that we're comparing; we push them a second
        // time to revert their color.
        animations.push([j, j]);
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
    }
}

// Bubble:

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}


export function getBubbleAnims(array) {
    const animations = [];

    if (array.length <= 1) {
        return array;
    }

    const helperArray = array.slice();

    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {

            animations.push([j, j + 1]);
            animations.push([j, j + 1]);

            if (helperArray[j] > helperArray[j + 1]) {

                swap(helperArray, j, j + 1);

            }
            animations.push([j, helperArray[j]]);
            animations.push([j + 1, helperArray[j + 1]]);


        }
    }

    return animations;

}

// Quicksort:

function partition(arr, low, high, animations) {

    let pivot = arr[high];

    let i = (low - 1);

    for (let j = low; j <= high - 1; j++) {

        animations.push([j, high, 0]);
        animations.push([j, high, 0]);

        if (arr[j] < pivot) {

            i++;

            swap(arr, i, j);

            animations.push([i, arr[j], 1]);

            animations.push([j, arr[i], 1]);

        }


    }

    swap(arr, i + 1, high);

    animations.push([i + 1, pivot, 1]);

    animations.push([high, arr[i + 1], 1]);

    return (i + 1);
}

export function getQuickSortAnims(array) {
    const animations = [];

    if (array.length <= 1) {
        return array;
    }

    const helperArray = array.slice();

    mainQuickSort(0, array.length - 1, helperArray, animations);

    return animations;


}

function mainQuickSort(startIdx, endIdx, auxiliaryArray, animations) {

    if (startIdx >= endIdx) return;

    let pivotPoint = partition(auxiliaryArray, startIdx, endIdx, animations);

    mainQuickSort(startIdx, pivotPoint - 1, auxiliaryArray, animations);
    mainQuickSort(pivotPoint + 1, endIdx, auxiliaryArray, animations);

}

// Heapsort:

function maxHeapify(arr, n, i, animations) {
    let largest = i; // Initialize largest as root
    let l = 2 * i + 1; // left = 2*i + 1
    let r = 2 * i + 2; // right = 2*i + 2


    if (l < n && arr[l] > arr[largest]) {
        animations.push([l, largest, 0]);
        largest = l;
        animations.push([l, largest, 0]);
    }

    if (r < n && arr[r] > arr[largest]) {
        animations.push([r, largest, 0]);
        largest = r;
        animations.push([r, largest, 0]);
    }


    if (largest !== i) {
        swap(arr, largest, i);

        animations.push([i, arr[largest], 1]);
        animations.push([largest, arr[i], 1]);


        maxHeapify(arr, n, largest, animations);
    } else {
        animations.push([i, arr[largest], 1]);
        animations.push([largest, arr[i], 1]);
    }



}

function minHeapify(arr, n, i, animations) {
    let smallest = i; // Initialize largest as root
    let l = 2 * i + 1; // left = 2*i + 1
    let r = 2 * i + 2; // right = 2*i + 2


    if (l < n && arr[l] < arr[smallest]) {
        animations.push([l, smallest, 0]);
        smallest = l;
        animations.push([l, smallest, 0]);
    }

    if (r < n && arr[r] < arr[smallest]) {
        animations.push([r, smallest, 0]);
        smallest = r;
        animations.push([r, smallest, 0]);
    }


    if (smallest !== i) {
        swap(arr, smallest, i);

        animations.push([i, arr[smallest], 1]);
        animations.push([smallest, arr[i], 1]);


        minHeapify(arr, n, smallest, animations);
    } else {
        animations.push([i, arr[smallest], 1]);
        animations.push([smallest, arr[i], 1]);
    }



}

export function getHeapSortAnims(array) {

    const anims = [];

    const c = array.slice();

    let n = c.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--){
        maxHeapify(c, n, i, anims);
    }

    for (let j = n - 1; j > 0; j--){

        swap(c, 0, j); // Move largest to end of list

        maxHeapify(c, j, 0, anims);

        anims.push([j, c[0], 1]);
        anims.push([0, c[j], 1]);

    }

    return anims;

}

export function getMinHeapSortAnims(array) {

    const anims = [];

    const c = array.slice();

    let n = c.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--){
        minHeapify(c, n, i, anims);
    }

    for (let j = n - 1; j > 0; j--){

        swap(c, 0, j); // Move largest to end of list

        minHeapify(c, j, 0, anims);

        anims.push([j, c[0], 1]);
        anims.push([0, c[j], 1]);

    }

    return anims;

}


