### With default properties
```js
  const brushData = require('./brushChart.fixtures.js').default;

  <Brush 
      data={brushData.withOneWeek()}
  />
```

### With custom size and formatted x-axis labels
```js
  const brushData = require('./brushChart.fixtures.js').default;

  <Brush 
      data={brushData.withOneWeek()}
      xAxisFormat={'hourday-month'}
      width={600}
      height={450}
  />
```

### With loading state
```js
  <Brush 
      data={null}
      shouldShowLoadingState={true} 
  />
```

See more:
* [API description][APILink]
* [Data definition][DataLink]



[APILink]: http://eventbrite.github.io/britecharts/module-Brush.html
[DataLink]: http://eventbrite.github.io/britecharts/global.html#BrushChartData__anchor