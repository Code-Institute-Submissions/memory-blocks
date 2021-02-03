describe("game timers", () => {
    describe("memory time function", () => {
        beforeEach(() => {
            easyGame = false;
            mediumGame = false;
            hardGame = false;
        });
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
});


