import React, {useEffect} from 'react';
import {RootState} from '../../../store/root-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {entitiesActions} from '../../../store/entities';
import {OverpassBody3Bold} from '../../../ui';
import styled from 'styled-components';
import {COLORS} from '../../../utils/static/colors';

const toastVisibilityTime = 2000;
export const Toast = () => {
    const dispatch = useDispatch();
    const {entities} = useSelector((state: RootState) => state);

    useEffect(() => {
        if (entities.toast.visible) {
            setTimeout(() => {
                dispatch(entitiesActions.hideToast());
            }, toastVisibilityTime);
        }
    }, [entities.toast.visible]);

    return (
        <Wrapper visible={entities.toast.visible}>
            <OverpassBody3Bold color={COLORS.white}>
                {entities.toast.title}
            </OverpassBody3Bold>
        </Wrapper>
    );
};

const Wrapper = styled.div`
   position: fixed;
   right: 30px;
   bottom: 40px;
   height: 55px;
   min-width: 240px;
   padding: 10px 25px;
   border-radius: 8px;
   background: #17d974;
   display: flex;
   align-items: center;
   transition: ease-out .15s;
   cursor: default;
   
   ${p => !p.visible ? `
    opacity: 0;
    bottom: -60px;
   ` : ''}
   
`;
