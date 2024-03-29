import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { currencyformat } from "../../app/util/Util";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useAppSelector } from "../../app/store/configureStore";

export default function BasketSummary() {
    
    const [subtotal, setSubtotal] = useState(0);
    const [deliveryfee,setDeliveryfee] = useState(0);
    const { basket } = useAppSelector(state => state.basket);
    
    useEffect(() => {
        // This effect will trigger whenever basket changes
        handleSubTotal();
        
    }, [basket]);

    function handleSubTotal() {
        const total = basket?.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const displaysubtotal = total !== undefined ? total : 0;
        setSubtotal(displaysubtotal);
        if (displaysubtotal >= 10000) {
            setDeliveryfee(0);
        }
        else {
            setDeliveryfee(500);
        }
    }

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={2}>Subtotal</TableCell>
                            <TableCell align="right">
                            <LoadingButton>
                                {currencyformat(subtotal)}
                            </LoadingButton>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}>Delivery fee*</TableCell>
                            <TableCell align="right">
                            <LoadingButton>
                                {currencyformat(deliveryfee)}
                            </LoadingButton>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={2}><b>Total</b></TableCell>
                            <TableCell align="right">
                            <LoadingButton>
                                {currencyformat(subtotal + deliveryfee)}
                            </LoadingButton>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <span style={{ fontStyle: 'italic' }}>*Orders over $100 qualify for free delivery</span>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}