import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {useAppSelector} from '../../app/store';
import {useDispatch} from 'react-redux';
import {setAppErrorAC} from '../../app/App-reducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ErrorSnackBar() {
    let dispatch=useDispatch()

    let error=useAppSelector<string|null>(state => state.app.error)
    let isOpen=!!error

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC(null))
    };

    return (
        <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    );
}
// <Stack spacing={2} sx={{ width: '100%' }}>
                {/*<Alert severity="error">This is an error message!</Alert>*/}
//     {/*<Button variant="outlined" onClick={handleClick}>*/}
//     {/*    Open success snackbar*/}
//     {/*</Button>*/}
//     {/*<Alert severity="error">This is an error message!</Alert>*/}
//     {/*<Alert severity="warning">This is a warning message!</Alert>*/}
//     {/*<Alert severity="info">This is an information message!</Alert>*/}
//     {/*<Alert severity="success">This is a success message!</Alert>*/}
// </Stack>
