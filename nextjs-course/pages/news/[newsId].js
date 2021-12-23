import React, { Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Dynamic() {
    const router = useRouter()

    console.log(router.query.newsId)

    return (
        <div>
            <Fragment> 
                <h1>news page...</h1>
                <ul>
                    <li><Link href="/news/nextjs">NextJS Framework</Link></li>
                    <li>Something else</li>
                </ul>
            </Fragment>
           
        </div>
    )
}
