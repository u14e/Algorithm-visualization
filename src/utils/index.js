export default {
    getRandomArray(len, start = 10, end = 200) {
        let arr = [],
            random;

        for (let i = 0; i < len; i++) {
            random = this.getRandom(start, end);
            arr.push(random);
        }

        return arr;
    },

    getRandom(start, end) {
        let choices = end - start + 1;
        return Math.floor(Math.random() * choices + start);
    }
}