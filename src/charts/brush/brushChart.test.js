import brushData from './brushChart.fixtures';
import brush from './brushChart';

describe('Brush Chart', () => {
    let anchor;

    beforeEach(() => {
        anchor = document.createElement('div');
    });

    describe('create', () => {

        describe('when incorrect arguments are used', () => {

            describe('when the DOM element is not passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        brush.create(
                            undefined,
                            brushData.withOneWeek(),
                            {}
                        );
                    }).toThrowError('A root container is required');
                });
            });
            describe('when a non-supported method is passed', () => {
                it('should throw an error', () => {
                    expect(() => {
                        brush.create(
                            anchor,
                            brushData.withOneWeek(),
                            { test: 'test' }
                        );
                    }).toThrowError('Method not supported by Britechart: test');
                });
            });

            describe('when wrong event handlers are passed', () => {
                it('should throw ane error', () => {
                    const callback = jest.fn();

                    expect(() => {
                        brush.create(
                            anchor,
                            brushData.withOneWeek(),
                            { customFakeEvent: callback }
                        );
                    }).toThrowError('Method not supported by Britechart: customFakeEvent');
                });
            });
        });

        describe('when proper arguments are passed', () => {

            it('should set data as a DOM property', () => {
                const expected = brushData.withOneWeek().length;

                brush.create(anchor, brushData.withOneWeek());

                const actual = anchor.__data__.length;

                expect(actual).toEqual(expected);
            });

            it('should set the width', () => {
                const expected = 500;

                const chart = brush.create(
                    anchor,
                    brushData.withOneWeek(),
                    { width: expected }
                );

                const actual = chart.width();

                expect(actual).toEqual(expected);
            });

            it('should set the margin', () => {
                const expected = {
                    top: 0,
                    bottom: 1,
                    left: 2,
                    right: 3,
                };

                const chart = brush.create(
                    anchor,
                    brushData.withOneWeek(),
                    { margin: expected }
                );

                const actual = chart.margin();

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('update', () => {

        describe('when updating data', () => {

            describe('when new data is passed', () => {
                it('should update the data in the container', () => {
                    const firstDataSet = brushData.withOneWeek();
                    const secondDataSet = [{
                        value: 1,
                        date: '2011-01-06T00:00:00Z',
                    }];
                    let chart = brush.create(anchor, firstDataSet, {});

                    brush.update(anchor, secondDataSet, {}, chart);

                    const expected = secondDataSet.length;
                    const actual = anchor.__data__.length;

                    expect(actual).toEqual(expected);
                });
            });

            describe('when new data is not passed', () => {
                it('should keep the data in the container', () => {
                    const dataSet = brushData.withOneWeek();
                    let chart = brush.create(anchor, dataSet, {});

                    brush.update(anchor, dataSet, {}, chart);

                    const expected = dataSet.length;
                    const actual = anchor.__data__.length;

                    expect(actual).toEqual(expected);
                });
            });
        });

        describe('when updating configuration', () => {

            describe('when new configuration is passed', () => {
                it('should update the configuration in the chart', () => {
                    const expected = 500;
                    const firstWidth = 200;
                    const chart = brush.create(
                        anchor,
                        brushData.withOneWeek(),
                        { width: firstWidth }
                    );

                    brush.update(anchor, brushData.withOneWeek(), { width: expected }, chart);

                    const actual = chart.width();

                    expect(actual).toEqual(expected);
                });
            });
        });
    });
});
