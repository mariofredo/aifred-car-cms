import {InputPassword} from '@/components/input';
import '@/styles/modalChangePassword.scss';

interface ModalChangePasswordProps {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  onChangeCurrentPassword: (e: any) => void;
  onChangeNewPassword: (e: any) => void;
  onChangeConfirmNewPassword: (e: any) => void;
  onCancel: () => void;
  onDone: () => void;
}

export default function ModalChangePassword({
  currentPassword,
  newPassword,
  confirmNewPassword,
  onChangeCurrentPassword,
  onChangeNewPassword,
  onChangeConfirmNewPassword,
  onCancel,
  onDone,
}: ModalChangePasswordProps) {
  return (
    <div>
      <div className='overlay' id='overlay'></div>
      <div className='modal' id='modal'>
        <div className='modal-content'>
          <div>
            <p className='title'>Change Password</p>
            <ul className='password_kriteria'>
              <p>Kriteria password:</p>
              <li>Password must have at least 8 characters</li>
              <li>Have at least 1 letter (a, b, c...)</li>
              <li>Have at least 1 number (1, 2, 3...)</li>
              <li>Include both Upper case and Lower case characters</li>
            </ul>
          </div>
          <InputPassword
            label={'CURRENT PASSWORD'}
            value={currentPassword}
            name={'old'}
            onChange={onChangeCurrentPassword}
          />
          <hr color='#dfdfdf' style={{height: '2px', width: '280px'}} />
          <InputPassword
            label={'NEW PASSWORD'}
            value={newPassword}
            name={'new'}
            onChange={onChangeNewPassword}
          />
          <InputPassword
            label={'CONFIRM NEW PASSWORD'}
            value={confirmNewPassword}
            name={'current'}
            onChange={onChangeConfirmNewPassword}
          />
          <div className='flex gap-[20px] mt-[30px] w-full justify-center'>
            <button
              className='w-[30%] px-[30px] py-[10px] rounded-[10px] border-[1px] border-[#dfdfdf]'
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              className='w-[30%] px-[30px] py-[10px] rounded-[10px] border-[1px] border-[#dfdfdf] bg-[#dfdfdf]'
              onClick={onDone}
              disabled={
                currentPassword === '' ||
                newPassword === '' ||
                confirmNewPassword === ''
              }
              style={{
                cursor:
                  currentPassword === '' ||
                  newPassword === '' ||
                  confirmNewPassword === ''
                    ? 'not-allowed'
                    : 'pointer',
              }}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
