import React, {useState} from 'react';
import {RootState} from '../../../store/root-reducer';
import styled from 'styled-components';
import BG from '../../../assets/img/bg-gradient.png';
import {useSelector} from 'react-redux';
import {history} from '../../../routing';

export const AppWrapper = ({children}) => {
    const {bgMode} = useSelector((state: RootState) => state.mods);
    const [currentPath, setCurrentPath] = useState(history.location.pathname);

    history.listen((location) => {
        setCurrentPath(location.pathname);
    });

    const mode = bgMode || pagesConfig[currentPath];
    return (
        <PageBG>
            <FilterLayer background={modeToColor[mode]}>
                {children}
            </FilterLayer>
        </PageBG>
    );
};

const modeToColor = {
    dark: 'rgba(32, 46, 62, 0.2)',
    light: 'rgba(255, 255, 255, 0.4)'
};

const pagesConfig = {
    '/': 'light',
    '/login': 'light',
    '/create-did': 'light'
};

const PageBG = styled.div`
    background: url(${BG}) center/cover no-repeat pink;  
`;
const FilterLayer = styled.div`
    height: 100vh;      
    overflow-y: auto;  
    ${p => p.background ? `background: ${p.background};` : ''}
`;
