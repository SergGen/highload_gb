export default async (range, findNumber) => {
    performance.clearMarks();
    performance.clearMeasures();
    const startData = await new Promise((resolve) => {
        const array = (new Array(range)).fill(null).map((_, i) => i + 1);
        const set = new Set(array);
        resolve({ array, set });
    });

    performance.mark('startArrayAddToEnd');
    await new Promise((resolve) => {
        startData.array.push(startData.array[startData.array.length - 1] + 1);
        resolve();
    });
    performance.mark('endArrayAddToEnd');
    performance.measure('ArrayAddToEnd', 'startArrayAddToEnd', 'endArrayAddToEnd');

    performance.mark('startArrayRemoveFromEnd');
    await new Promise((resolve) => {
        startData.array.pop();
        resolve();
    });
    performance.mark('endArrayRemoveFromEnd');
    performance.measure('ArrayRemoveFromEnd', 'startArrayRemoveFromEnd', 'endArrayRemoveFromEnd');

    performance.mark('startArrayAddToStart');
    await new Promise((resolve) => {
        startData.array.unshift(0);
        resolve();
    });
    performance.mark('endArrayAddToStart');
    performance.measure('ArrayAddToStart', 'startArrayAddToStart', 'endArrayAddToStart');

    performance.mark('startArrayRemoveFromStart');
    await new Promise((resolve) => {
        startData.array.shift();
        resolve();
    });
    performance.mark('endArrayRemoveFromStart');
    performance.measure('ArrayRemoveFromStart', 'startArrayRemoveFromStart', 'endArrayRemoveFromStart');

    performance.mark('startArrayFindElem');
    await new Promise((resolve) => {
        startData.array.indexOf(findNumber);
        resolve();
    });
    performance.mark('endArrayFindElem');
    performance.measure('ArrayFindElem', 'startArrayFindElem', 'endArrayFindElem');

    performance.mark('startSetAdd');
    await new Promise((resolve) => {
        startData.set.add(0);
        resolve();
    });
    performance.mark('endSetAdd');
    performance.measure('SetAdd', 'startSetAdd', 'endSetAdd');

    performance.mark('startSetRemove');
    await new Promise((resolve) => {
        startData.set.delete(0);
        resolve();
    });
    performance.mark('endSetRemove');
    performance.measure('SetRemove', 'startSetRemove', 'endSetRemove');

    performance.mark('startSetFind');
    await new Promise((resolve) => {
        startData.set.has(findNumber);
        resolve();
    });
    performance.mark('endSetFind');
    performance.measure('SetFind', 'startSetFind', 'endSetFind');

    return performance.getEntriesByType('measure');
}