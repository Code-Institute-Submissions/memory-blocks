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

describe("getPoints function", () => {
    beforeEach(() => {
        easyGame = false;
        mediumGame = false;
        hardGame = false;
    });

    it("should return 10", () => {
        easyGame = true;
        expect(getPoints()).toBe(10);
    });

    it("should return 20", () => {
        mediumGame = true;
        expect(getPoints()).toBe(20);
    });

    it("should return 30", () => {
        hardGame = true;
        expect(getPoints()).toBe(30);
    });
});

describe("difficulty button functions", () => {
    beforeEach(() => {
        setFixtures(`
            <div class="row row3">
            <div class="row row4">
            <div>
                <span class="message1">Choose Easy, Medium or Hard!</span>
            </div>
            <div id="square-0-3" class="cell"></div>
            <div id="square-1-3" class="cell"></div>
            <div id="square-2-3" class="cell"></div>
            <div id="square-3-3" class="cell"></div>
            <div id="square-0-4" class="cell"></div>
            <div id="square-1-4" class="cell"></div>
            <div id="square-2-4" class="cell"></div>
            <div id="square-3-4" class="cell"></div>
            `);
    });

    describe("setUpEasyGame function", () => {
        beforeEach(() => {
            setUpEasyGame();
        })
        it("should set easyGame boolean to true", () => {
            expect(easyGame).toBe(true);
        });
        it("should set mediumGame boolean to false", () => {
            expect(mediumGame).toBe(false);
        });
        it("should set hardGame boolean to false", () => {
            expect(hardGame).toBe(false);
        });
        it("should set gridWidth to 3", () => {
            expect(gridWidth).toBe(3);
        });
        it("should set gridHeight to 3", () => {
            expect(gridHeight).toBe(3);
        });
        it("should set gridSize to 9", () => {
            expect(gridSize).toBe(9);
        });
        it(`should add class "hidden" to the html element with the class row3`, () => {
            expect($(".row3")).toHaveClass("hidden");
        });
        it(`should add class "hidden" to the html element with the class row4`, () => {
            expect($(".row4")).toHaveClass("hidden");
        });
        it(`should remove class "hidden" to the html element with the id play`, () => {
            expect($("#play")).not.toHaveClass("hidden");
        });
        it(`should add the text "You have chosen Easy." to the html element with the class message1`, () => {
            expect($(".message1").text()).toEqual("You have chosen Easy.");
        });
        it(`should add class "hidden" to the html element with the id square-0-3`, () => {
            expect($("#square-0-3")).toHaveClass("hidden");
        });
        it(`should add class "hidden" to the html element with the id square-1-3`, () => {
            expect($("#square-1-3")).toHaveClass("hidden");
        });
        it(`should add class "hidden" to the html element with the id square-2-3`, () => {
            expect($("#square-2-3")).toHaveClass("hidden");
        });
        it(`should add class "hidden" to the html element with the id square-0-4`, () => {
            expect($("#square-0-4")).toHaveClass("hidden");
        });
        it(`should add class "hidden" to the html element with the id square-1-4`, () => {
            expect($("#square-1-4")).toHaveClass("hidden");
        });
        it(`should add class "hidden" to the html element with the id square-2-4`, () => {
            expect($("#square-2-4")).toHaveClass("hidden");
        });
    });

    describe("setUpMediumGame function", () => {
        beforeEach(() => {
            setUpMediumGame();
        })
        it("should set easyGame boolean to false", () => {
            expect(easyGame).toBe(false);
        });
        it("should set mediumGame boolean to true", () => {
            expect(mediumGame).toBe(true);
        });
        it("should set hardGame boolean to false", () => {
            expect(hardGame).toBe(false);
        });
        it("should set gridWidth to 4", () => {
            expect(gridWidth).toBe(4);
        });
        it("should set gridHeight to 4", () => {
            expect(gridHeight).toBe(4);
        });
        it("should set gridSize to 16", () => {
            expect(gridSize).toBe(16);
        });
        it(`should remove class "hidden" from the html element with the class row3`, () => {
            expect($(".row3")).not.toHaveClass("hidden");
        });
        it(`should add class "hidden" to the html element with the class row4`, () => {
            expect($(".row4")).toHaveClass("hidden");
        });
        it(`should remove class "hidden" from the html element with the id play`, () => {
            expect($("#play")).not.toHaveClass("hidden");
        });
        it(`should add the text "You have chosen Medium." to the html element with the class message1`, () => {
            expect($(".message1").text()).toEqual("You have chosen Medium.");
        });
        it(`should remove class "hidden" from the html element with the id square-0-3`, () => {
            expect($("#square-0-3")).not.toHaveClass("hidden");
        });
        it(`should remove class "hidden" from the html element with the id square-1-3`, () => {
            expect($("#square-1-3")).not.toHaveClass("hidden");
        });
        it(`should remove class "hidden" from the html element with the id square-2-3`, () => {
            expect($("#square-2-3")).not.toHaveClass("hidden");
        });
        it(`should remove class "hidden" from the html element with the id square-3-3`, () => {
            expect($("#square-3-3")).not.toHaveClass("hidden");
        });
        it(`should add class "hidden" to the html element with the id square-0-4`, () => {
            expect($("#square-0-4")).toHaveClass("hidden");
        });
        it(`should add class "hidden" to the html element with the id square-1-4`, () => {
            expect($("#square-1-4")).toHaveClass("hidden");
        });
        it(`should add class "hidden" to the html element with the id square-2-4`, () => {
            expect($("#square-2-4")).toHaveClass("hidden");
        });
        it(`should add class "hidden" to the html element with the id square-3-4`, () => {
            expect($("#square-3-4")).toHaveClass("hidden");
        });
    });
});

