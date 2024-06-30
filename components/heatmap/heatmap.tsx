'use client';
import {PlotlyType} from '@/types';
import {useEffect, useState} from 'react';
type PlotlyModuleType = typeof import('plotly.js-dist-min');
export default function Heatmap({data, layout, loading}: PlotlyType) {
  const [Plotly, setPlotly] = useState<PlotlyModuleType | null>(null);

  useEffect(() => {
    const loadPlotly = async () => {
      if (typeof window !== 'undefined') {
        const PlotlyModule = await import('plotly.js-dist-min');
        setPlotly(PlotlyModule.default || PlotlyModule);
      }
    };
    loadPlotly();
  }, []);
  useEffect(() => {
    if (typeof window !== 'undefined' && data && layout) {
      Plotly?.newPlot('heatmap_ctr', data, layout);
    }
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
