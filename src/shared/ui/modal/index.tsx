import { FC, ReactNode, useCallback, useEffect } from 'react';
import './modal.scss';



interface Props {
  isModal   : boolean
  title     : string
  children? : ReactNode
  onOk      : () => void
  onCancel? : () => void
}

export const Modal: FC<Props> = ({ isModal, title, children, onCancel, onOk }) => {
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPressed);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPressed);
    };
  },
    []
  );
  
  useEffect(() => {
    if (isModal) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
  },
    [isModal]
  );
  
  const handleOk = useCallback(() => {
    document.body.style.overflow = '';
    onOk();
  }, [onOk]);
  
  const handleCancel = useCallback(() => {
    document.body.style.overflow = '';
    onCancel && onCancel();
  }, []);
  
  // Обработка нажатий клавиш
  const handleKeyPressed = useCallback((e: KeyboardEvent) => {
    console.log(e.key);
    const keyHandlers = {
      'Escape': handleCancel,
      'Enter': handleOk
    };

    const handler = keyHandlers[e.key as keyof typeof keyHandlers];
    if (handler) {
      handler();
    }
  },
    []
  );


  return (
    <>
      <div className={'modal'}>
        <div className='modal-dialog'> 
          <div className='modal-body'>
            <div className='modal-title'>{title}</div>
            <div className='child'>              
              <form onSubmit={handleOk}>
                {children}
              </form>
            </div>
            <div className='modal-footer'>
              <div className='modal-footer-buttons'>
                {
                  onCancel && <button className='modal-button' onClick={handleCancel}>Отмена</button>
                }
                <button className='modal-button modal-button-primary' onClick={handleOk}>Ok</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
