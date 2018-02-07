import {{camelCase componentName}}Chart from 'britecharts/dist/umd/{{camelCase componentName}}.min';
import {select} from 'd3-selection';
import {validateConfiguration, validateContainer, validateData} from '../helpers/validation';
import {applyConfiguration} from '../helpers/configuration';

import { line as {{camelCase componentName}}LoadingState } from 'britecharts/dist/umd/loading.min';

const {{camelCase componentName}} = {};

{{camelCase componentName}}.create = (el, data, configuration = {}) => {
    let container = select(el);
    let chart = {{camelCase componentName}}Chart();

    validateData(data);
    validateContainer(container);
    validateConfiguration(chart, configuration);

    // Calls the chart with the container and dataset
    container.datum(data).call(applyConfiguration(chart, configuration));

    return chart;
};

{{camelCase componentName}}.update = (el, data, configuration = {}, chart) => {
    let container = select(el);

    validateContainer(container);
    validateConfiguration(chart, configuration);
    applyConfiguration(chart, configuration);

    // Calls the chart with the container and dataset
    if (data && data.length) {
        validateData(data);
        container.datum(data).call(chart);
    } else {
        container.call(chart);
    }

    return chart;
};

{{camelCase componentName}}.destroy = () => {};

{{camelCase componentName}}.loading = () => {{camelCase componentName}}LoadingState;

export default {{camelCase componentName}};
