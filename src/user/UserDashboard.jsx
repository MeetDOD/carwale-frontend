import React from 'react'
import { useAuth } from '../context/auth'
import UserMenu from './UserMenu'

const UserDashboard = () => {
    const [auth] = useAuth()

    return (
        <div className='container'>
            <br /><br /><br /><br /><br />
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <h3>Welcome, {auth?.user?.name}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDashboard
