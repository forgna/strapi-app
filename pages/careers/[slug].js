import ReactMarkdown from 'react-markdown'

export default function CareerPage({ career }) {
    return (
        <div>
            <main>
                <h1>{career.title}</h1>
                <div>Hiring: {career.hiring}</div>

                <h2>Job description</h2>
                <ReactMarkdown>
                    {career.description}
                </ReactMarkdown>
                <h2>Job requirement</h2>
                <ReactMarkdown>
                    {career.requirement}
                </ReactMarkdown>
            </main>
            <footer></footer>
        </div>
    )
}

export async function getStaticPaths() {
    const res = await fetch(`${process.env.API_URL}/careers?_limit=5`)
    const careers = await res.json()

    const paths = careers.map((career) => ({
        params: { slug: `${career.slug}` },
    }))

    return { paths, fallback: 'blocking' }
}

export async function getStaticProps({ params }) {
    const res = await fetch(`${process.env.API_URL}/careers?slug=${params.slug}`)
    const careers = await res.json()

    return { props: { career: careers[0] }, revalidate: 10 }
}