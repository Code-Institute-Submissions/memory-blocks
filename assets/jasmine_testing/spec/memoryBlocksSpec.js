describe("game timers", () => {

    beforeEach(() => {
        easyGame = false;
        mediumGame = false;
        hardGame = false;
    });

    describe("memory time function", () => {
        it("should return 10", () => {
            easyGame = true;
            const result = calculateMemorizingTime();
            expect(result).toBe(10);
        });
        it("should return 20", () => {
            mediumGame = true;
            const result = calculateMemorizingTime();
            expect(result).toBe(20);
        });
        it("should return 30", () => {
            hardGame = true;
            const result = calculateMemorizingTime();
            expect(result).toBe(30);
        });
    });

    describe("playing time function", () => {
        it("should return 20", () => {
            easyGame = true;
            const result = calculatePlayingTime();
            expect(result).toBe(20);
        });
        it("should return 40", () => {
            mediumGame = true;
            const result = calculatePlayingTime();
            expect(result).toBe(40);
        });
        it("should return 60", () => {
            hardGame = true;
            const result = calculatePlayingTime();
            expect(result).toBe(60);
        });
    });
});


