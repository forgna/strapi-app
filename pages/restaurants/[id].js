export default function RestaurantPage({ restaurant }) {
  console.log(restaurant);

  return (
    <div>
      <main>
        <h1>{restaurant.name}</h1>
        <time>{restaurant.published_at}</time>
        <p>{restaurant.description}</p>
        <br />
        <br />
        <div>
          {restaurant.categories.map((cat) => (
            <span key={`${cat.id}`}>{cat.name}</span>
          ))}
        </div>
      </main>
      <footer></footer>
    </div>
  );
}

export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurants?_limit=5`
  );
  const restaurants = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = restaurants.map((restaurant) => ({
    params: { id: `${restaurant.id}` },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/restaurants/${params.id}`
  );
  const restaurant = await res.json();

  return { props: { restaurant }, revalidate: 10 };
}
