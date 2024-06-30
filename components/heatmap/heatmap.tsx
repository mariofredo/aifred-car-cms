import {PlotlyType} from '@/types';
import Plotly from 'plotly.js-dist-min';
import {useEffect, useState} from 'react';

export default function Heatmap({data, layout, loading}: PlotlyType) {
  useEffect(() => {
    Plotly.newPlot('heatmap_ctr', data, layout);
  }, [data, layout]);
  return (
    <>
      <div className={`flex justify-center ${loading ? 'block' : 'hidden'}`}>
        Loading...
      </div>
      <div id='heatmap_ctr' className={loading ? 'hidden' : 'block'}></div>
    </>
  );
}
