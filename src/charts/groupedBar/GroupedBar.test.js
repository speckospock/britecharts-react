import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import GroupedBar from './GroupedBar';
import groupedBarData from './groupedBarChart.fixtures';

import groupedBar from './groupedBarChart';

Enzyme.configure({ adapter: new Adapter() });

describe('Grouped Bar Chart', () => {
  
    describe('render', () => {
        
        describe('when data passed in', () => {
            let createSpy;

            beforeEach(() => {
                createSpy = jest.spyOn(groupedBar, 'create');
            });

            afterEach(() => {
                createSpy.mockReset();
                createSpy.mockRestore();
            });

            it('should call the create method or the chart', () => {
                mount(<GroupedBar chart={groupedBar} data={groupedBarData.with3Groups()} />);

                let expected = 1;
                let actual = createSpy.mock.calls.length;

                expect(actual).toEqual(expected);
            });

            it('should call the create method or the chart with the container as the first argument', () => {
                const wrapper = mount(<GroupedBar chart={groupedBar} data={groupedBarData.with3Groups()} />);

                let expected = wrapper.find('.stacked-area-container').instance();
                let actual = createSpy.mock.calls[0][0];

                expect(actual).toEqual(expected);
            });

            it('should call the create method or the chart with the configuration object as the second argument', () => {
                const dataSet = groupedBarData.with3Groups();

                mount(<GroupedBar chart={groupedBar} data={dataSet} />);

                let expectedData = dataSet;
                let actualData = createSpy.mock.calls[0][1];

                expect(actualData).toEqual(expectedData);
            });

            it('should allow setting width', () => {
                const dataSet = groupedBarData.with3Groups();
                let expected = 500;

                mount(
                    <GroupedBar
                        chart={groupedBar}
                        data={dataSet}
                        width={expected}
                    />
                );

                let actual = createSpy.mock.calls[0][2].width;

                expect(actual).toEqual(expected);
            });

            it('should allow setting height', () => {
                const dataSet = groupedBarData.with3Groups();
                let expected = 500;

                mount(
                    <GroupedBar
                        chart={groupedBar}
                        data={dataSet}
                        height={expected}
                    />
                );

                let actual = createSpy.mock.calls[0][2].height;

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('update', () => {

        describe('when data changes', () => {
            let updateSpy;

            beforeEach(() => {
                updateSpy = jest.spyOn(groupedBar, 'update');
            });

            afterEach(() => {
                updateSpy.mockReset();
                updateSpy.mockRestore();
            });

            it('should call the update method or the chart', () => {
                const wrapper = mount(<GroupedBar chart={groupedBar} data={groupedBarData.with3Groups()} />);

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    data: groupedBarData.with2Groups(),
                });

                let expected = 1;
                let actual = updateSpy.mock.calls.length;

                expect(actual).toEqual(expected);
            });

            it('should pass in the new data to the update method', () => {
                const wrapper = mount(<GroupedBar chart={groupedBar} data={groupedBarData.with3Groups()} />);

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    data: groupedBarData.with2Groups(),
                });

                let expected = groupedBarData.with2Groups().length;
                let actual = updateSpy.mock.calls[0][1].length;

                expect(actual).toEqual(expected);
            });

            it('should pass in the new configuration to the update method', () => {
                const wrapper = mount(<GroupedBar chart={groupedBar} data={groupedBarData.with3Groups()} />);
                const expected = 20;

                // Changing properties should trigger a componentDidUpdate
                wrapper.setProps({
                    width: expected,
                });

                let actual = updateSpy.mock.calls[0][2].width;

                expect(actual).toEqual(expected);
            });
        });
    });

    describe('unmount', () => {
        let createSpy;

        beforeEach(() => {
            createSpy = jest.spyOn(groupedBar, 'destroy');
        });

        afterEach(() => {
            createSpy.mockReset();
            createSpy.mockRestore();
        });

        it('should call the destroy method or the chart', () => {
            const wrapper = mount(<GroupedBar chart={groupedBar} data={groupedBarData.with3Groups()} />);

            wrapper.unmount();

            let expected = 1;
            let actual = createSpy.mock.calls.length;

            expect(actual).toEqual(expected);
        });
    });
});
  
  