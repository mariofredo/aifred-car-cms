import '@/styles/modalNotification.scss';
interface ModalNotificationProps {
  title?: string;
  message?: string;
  onClose: () => void;
}
export default function ModalNotification({
  title,
  message,
  onClose,
}: ModalNotificationProps) {
  return (
    <div className='modal_notif_ctr'>
      <div className='modal_notif_content'>
        <div className='modal_notif_title'>{title}</div>
        <div className='modal_notif_message'>{message}</div>
        <button className='modal_notif_close' onClick={() => onClose()}>
          Close
        </button>
      </div>
    </div>
  );
}
