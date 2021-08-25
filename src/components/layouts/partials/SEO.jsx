import React from 'react'
import { Helmet } from 'react-helmet'

const SEO = ({ pageTitle, type }) => {
    const meta = {
        url: 'https://todo.com',
        title: 'Todo App limited',
        description: 'Achieve your daily tasks easily',
        language: 'en-US',
        image: 'https://i.ibb.co/sjGcqb1/seo.jpg',
        author: {
            email: 'hello@todo.com',
            name: 'Todo App Limited',
            image: 'https://i.ibb.co/sjGcqb1/seo.jpg',
        },
        site: {
            siteName: 'Todo App Limited',
            searchUrl: 'https://google.com/search?=Todo'
        }
    }
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{type === 'main' ? meta.title + '-' + meta.description : pageTitle}</title>
                <meta name="description" content={meta.description} />
                <meta name="keywords" content="todo, app" />
                <meta itemprop="description" content={meta.description} />
                <meta itemprop="description" content={meta.image} />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@todo_app" />
                <meta name="twitter:creator" content="@todo_app" />
                <meta name="twitter:title" content="Todo Limited" />
                <meta name="twitter:description" content={meta.description} />
                <meta name="twitter:image" content={meta.image} />


                <meta property="og:site_name" content="todo limited" />
                <meta property="og:title" content="Todo - Achieve your daily tasks easily" />
                <meta property="og:description" content={meta.description} />
                <meta property="og:image" content={meta.image} />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={meta.url}/>
            </Helmet>
        </>
    )
}

export default SEO