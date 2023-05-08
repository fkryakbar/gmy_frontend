import { deleteCookie } from 'cookies-next';
import React from 'react'

export async function getServerSideProps({ req, res }: { req: any, res: any }) {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`);
    deleteCookie('token', { req, res })
    return {
        redirect: {
            destination: '/login',
            permanent: false
        }
    }
}


function Index() {
    return (
        <div>Logging Out...</div>
    )
}

export default Index