import Head from 'next/head'
import Navbar from '@/components/Navbar'
import PublicPost from '@/components/PublicPost';

export async function getServerSideProps(context: any) {
  const token = context.req.cookies['token'];
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post/get`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    }
  })
  const data_json = await data.json();
  if (data.status == 200 || data.status == 422) {
    return {
      props: { auth: true }
    }
  } else {
    return {
      props: {
        auth: false
      }
    }
  }
}
export default function Home({ auth }: { auth: boolean }) {
  return (
    <>
      <Head>
        <title>Gemoy</title>
      </Head>
      <Navbar auth={auth} />
      <PublicPost />
    </>
  )

}
