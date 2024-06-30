export interface PlotlyType {
  data: Plotly.Data[];
  layout: Partial<Plotly.Layout> | undefined;
  loading: boolean;
}
