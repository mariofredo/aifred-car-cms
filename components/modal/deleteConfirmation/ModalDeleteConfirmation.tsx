import '@/styles/modalDeleteConfirmation.scss';

interface ModalChangePasswordProps {
  label: string;
  onCancel: () => void;
  onDone: () => void;
}

export default function ModalDeleteConfirmation({
  label,
  onCancel,
  onDone,
}: ModalChangePasswordProps) {
  return (
    <div>
      <div className='overlay' id='overlay'></div>
      <div className='modal' id='modal'>
        <div className='modal-content'>
          <p className='title'>{label}</p>
          <div className='flex gap-[20px] w-full justify-center'>
            <button
              className='w-[30%] px-[30px] py-[10px] rounded-[10px] border-[1px] border-[#dfdfdf]'
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className='w-[30%] px-[30px] py-[10px] rounded-[10px] border-[1px] border-[#dfdfdf] bg-[#2f5cde]'
              onClick={onDone}
            >
              <p className='text-[#fff]'>Confirm</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
