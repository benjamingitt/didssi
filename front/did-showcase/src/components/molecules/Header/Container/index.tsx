import React from 'react';
import {RootState} from '../../../../store/root-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {userActions} from '../../../../store';
import {useCurrentSessionQuery, useLogoutMutation} from '../../../../generated/graphql';
import {HeaderView} from '../View';


export const Header = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state: RootState) => state);
    const {refetch} = useCurrentSessionQuery();
    const [logoutMutation] = useLogoutMutation();


    const handleLogout = () => {
        refetch().then(({data}) => {
            logout(data.currentSession.id);
        });
    };

    const logout = (sessionId) => {
        logoutMutation({variables: {sessionIds: [sessionId]}}).then(res => {
            if (res.data.logout) {
                dispatch(userActions.removeUser());
                localStorage.removeItem('token');
                window.location.reload();
            }
        });
    };

    return (
        <HeaderView
            user={user.user}
            onLogout={handleLogout}
        />
    );
};
