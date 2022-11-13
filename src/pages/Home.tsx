import { useEffect, useState } from "react";
import { getAllPosts, PostResponse } from "./../api/posts/postsAPI";
import { Post } from "../components/posts/Post";
import { Background } from "../components/backgrounds/Background";
import { Navbar } from "../components/navbar/Navbar";
import classNames from "classnames";

type Layout = "single" | "double" | "triple";

export const Home = () => {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [layout, setLayout] = useState<Layout>("single");

  useEffect(() => {
    (async () => {
      try {
        const { posts } = await getAllPosts();
        setPosts(posts.reverse());
      } catch (error) {
        //handled in interceptor
      }
    })();
  }, []);

  const homeMainClass = classNames("home__main", {
    "home__main--two": layout === "double",
    "home__main--three": layout === "triple",
  });

  const handleLayoutChange = (layout: Layout) => {
    switch (layout) {
      case "single":
        setLayout(layout);
        break;
      case "double":
        setLayout(layout);
        break;
      case "triple":
        setLayout(layout);
        break;
    }
  };

  if (posts.length < 1)
    return (
      <Background>
        <div style={{ color: "white", fontSize: "4rem" }}>Loading...</div>;
      </Background>
    );

  return (
    <Background className="background--home">
      <div className="home">
        <div className="wrapper">
          <div className={homeMainClass}>
            <h1 className="home__title">Feed</h1>
            {posts.map((post) => {
              return <Post key={post.id} {...post} />;
            })}
          </div>
          <Navbar
            setNewPosts={(newPosts: PostResponse[]) => {
              setPosts(newPosts);
            }}
            handleLayoutChange={handleLayoutChange}
          />
        </div>
      </div>
    </Background>
  );
};
