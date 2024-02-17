import { Dialog } from 'primereact/dialog';
import React, { SetStateAction, Dispatch } from 'react';

type FormDialogProps = {
    children: React.ReactNode
    handleClose: Dispatch<SetStateAction<boolean>>,
    title: string;
    visibleDialog: boolean
}

export default function FormDialog({ children, handleClose, title, visibleDialog }: FormDialogProps) {
    const handleCloseDialog = () => {
        handleClose(false);
    }

    return (
        <Dialog
            visible={visibleDialog}
            style={{ width: '60vw' }}
            header={
                title
            }
            onHide={handleCloseDialog}
        >
            {children}
        </Dialog>
    )
}