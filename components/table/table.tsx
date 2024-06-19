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
              <th colSpan={item.colSpan}>{item.name}</th>
            ))}
          </tr>
        </thead>
        <tbody className='table_body_ctr'>
          {tableValue.map((item) => (
            <tr>
              {tableKey.map((key) => (
                <td>{item[key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
