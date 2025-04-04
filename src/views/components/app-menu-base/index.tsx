import React, {useEffect} from 'react';
import {useAtom} from 'jotai';
import {useLocation} from '@reach/router';
import Box from '@mui/material/Box';
import {useTheme} from '@mui/material/styles';
import UserMenu from 'views/components/app-menu/user-menu';
import useMediaBreakPoint from 'hooks/use-media-break-point';
import useStyles from 'hooks/use-styles';
import {appMenuAtom} from 'atoms';
import pack from '../../../../package.json';


const AppMenuBase = (props: { children: React.ReactNode }) => {
    const theme = useTheme();
    const styles = useStyles();
    const {isMd} = useMediaBreakPoint();
    const [appMenu, setAppMenu] = useAtom(appMenuAtom);
    const location = useLocation();

    useEffect(() => {
        if (appMenu) {
            setAppMenu(false);
        }
    }, [location]);

    const isSmallScreen = !isMd;

    if (isSmallScreen && !appMenu) {
        return null;
    }

    return <Box sx={{
        height: '100%',
        width: styles.sideBarWidth,
        p: '0 16px',
        flexShrink: 0,
        flexGrow: 0,
        borderRight: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        justifyContent: 'space-between',
    }}>
        <Box sx={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <UserMenu/>
            <Box sx={{
                height: `calc(100% - calc(${styles.headerHeight} + ${styles.sideBarFooterHeight}))`,
                flexShrink: 0,
                ...styles.scrollY
            }}>
                {props.children}
            </Box>
            <Box sx={{
                height: styles.sideBarFooterHeight,
                pt: '10px',
                flexShrink: 0,
                display: 'flex',
                fontSize: '0.8em',
                color: theme.palette.text.disabled
            }}>
                <Box sx={{mr: '20px'}}>{`Angor Chat v${pack.version}`}</Box>
 
            </Box>
        </Box>
    </Box>
}

export default AppMenuBase;
