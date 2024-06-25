import '@/styles/backButton.scss';

export default function BackButton({onClick}) {
  return (
    <div>
      <button className='back_button' onClick={onClick}>
        <p>Back</p>
      </button>
    </div>
  );
}
