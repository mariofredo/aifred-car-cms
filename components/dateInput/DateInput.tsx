import './DateInput.scss';

export default function DateInput({
  label,
  name,
  onChange,
  value,
}: {
  [key: string]: any;
}) {
  return (
    <div className='di_ctrs'>
      <label htmlFor='date' className='di_label'>
        {label}
      </label>
      <input
        type='date'
        id='date'
        name={name}
        onChange={onChange}
        className='date_input'
        value={value}
      />
    </div>
  );
}
