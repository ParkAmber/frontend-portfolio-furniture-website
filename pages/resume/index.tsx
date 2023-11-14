import Head from 'next/head'
export default function FilePage() {
    
    return (
        <>  <Head>
        <title>Amber Park's Portfolio Website</title>
        <meta name="description" content="Amber Park's Portfolio Website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo2.png" />
      </Head>
            <div style={{height:"100vh"}}>
                {/* kkk */}
             <embed src="/resume-for-website.pdf" type="application/pdf" width="100%" height="600px" />
            </div>
        </>
    )
}