import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import Brush from './Brush';
import brushData from './brushChart.fixtures';

import brush from './brushChart';

Enzyme.configure({ adapter: new Adapter() });

