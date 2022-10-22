import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './AcDialog.scss';

const AcDialog = ({ data, open, onClose }) => {
  const [isSessionExpiredModal, setSessionExpiredModal] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if(!data) return;
    const titleText = t('errorAuth.title')
    if(data.title === titleText) setSessionExpiredModal(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      className='ac-dialog'
      maxWidth='lg'
      disableEscapeKeyDown={true}
      disableBackdropClick
    >
      <DialogTitle>
        <div>
          <span className={data.icon ? `icon ${data.icon}` : 'icon icon-circle-flight'} />
          <h2 className="title">{data.title}</h2>
        </div>
      </DialogTitle>
      <DialogContent className='dialog-content'>
        <p className="description" dangerouslySetInnerHTML={{ __html: data.description }} id="acDialog__description"/>
        {data.support && <p className="description-support" dangerouslySetInnerHTML={{ __html: data.support}}/>}
      </DialogContent>
      <DialogActions>
        <div className="buttons">
          {(data.handleAction || data.actionLabel) && <Button className={isSessionExpiredModal? 'btn-white button-margin' : 'btn-white'} onClick={() => data.handleAction()}><span>{data.actionLabel}</span></Button> }
          {data.handleSecondaryAction && <Button className='btn-black' onClick={()=>data.handleSecondaryAction()}>​​​ <span>
            {data.secondaryActionLabel}
          </span>
          </Button>}
        </div>
      </DialogActions>
    </Dialog>
  );
};

export default AcDialog;
