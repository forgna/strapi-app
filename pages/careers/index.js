import Link from "next/link";

export default function CareerListPage({ careers }) {
  return (
    <div>
      <main>
        <ul>
          {careers.map((career) => (
            <li key={career.id}>
              <Link href={`/careers/${career.slug}`}>
                <a>{career.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <footer></footer>
    </div>
  );
}

export async function getStaticProps(context) {
  const res = await fetch(`${process.env.API_URL}/careers?_limit=5`);
  const careers = await res.json();

  if (!careers) {
    return {
      notFound: true,
    };
  }

  return {
    props: { careers }, // will be passed to the page component as props
  };
}
