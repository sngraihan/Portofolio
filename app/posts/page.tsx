import styles from "./postPage.module.css";
import ViewUserButton from "../components/posts/ViewUserButton";
import CardList from "../components/posts/CardList";

const base_url = "https://jsonplaceholder.typicode.com/posts";

interface Ipost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Posts = async () => {
  const response = await fetch(base_url, {
    cache: "no-store",
  });
  const posts: Ipost[] = await response.json();
  return (
    <>
      <p>{new Date().toLocaleString()}</p>
      <div className={styles.bgGreen}>TESTING PAGE POSTS</div>
      {posts.map((post) => {
        return (
          <CardList key={post.id}>
            <p>{post.id}</p>
            <i>{post.title}</i>
            <p>{post.body}</p>
            <ViewUserButton userId={post.userId} />
          </CardList>
        );
      })}
    </>
  );
};

export default Posts;
