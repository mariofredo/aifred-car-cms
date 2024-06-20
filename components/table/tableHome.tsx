import '@/styles/table.scss';
interface TableProps {
  tableName?: {
    name: string;
    colSpan: number;
  }[];
  tableValue?: {[key: string]: any}[];
  tableKey?: string[];
  tHeadBg?: string;
}
export default function Table({
  tableName = [],
  tableValue = [],
  tableKey = [],
  tHeadBg = '#B5B5B5',
}: TableProps) {
  return (
    <div className='table_wrapper'>
      <table className='table_ctr'>
        <thead
          className='table_head_ctr'
          style={{
            background: tHeadBg,
          }}
        >
          <tr>
            {tableName.map((item) => (
              <th key={item.name} colSpan={item.colSpan}>
                {item.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='table_body_ctr'>
          {tableValue.map((item, i) => (
            <tr key={i}>
              {tableKey.map((key) => (
                <td key={key}>{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
