import { useEffect, useState } from "react";
import { getAllPosts, PostResponse } from "./../api/posts/postsAPI";
import { Post } from "../components/Post";
import { Background } from "../components/backgrounds/Background";
import { Button } from "../components/buttons/Button";
import { clearLocalStorage } from "../api/local-storage/localStorage";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostResponse[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const { count, posts } = await getAllPosts();
        setPosts(posts);
      } catch (error) {
        //handled in interceptor
      }
    })();
  }, []);

  return (
    <Background className="background--home">
      <div className="home">
        <div className="home__main">
          {posts.map((post) => {
            return <Post key={post.id} {...post} />;
          })}
        </div>
        <div className="home__nav"></div>
      </div>
      <Button
        onClick={() => {
          clearLocalStorage();
          navigate("/login");
        }}
      >
        Logout
      </Button>
    </Background>
  );
};
