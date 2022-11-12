import { useEffect, useState } from "react";
import { createPost, getAllPosts, PostResponse } from "./../api/posts/postsAPI";
import { Post } from "../components/posts/Post";
import { Background } from "../components/backgrounds/Background";
import { Button } from "../components/buttons/Button";
import { clearLocalStorage } from "../api/local-storage/localStorage";
import { useNavigate } from "react-router-dom";

import twoGridIcon from "../assets/icons/grid-two.png";
import threeGridIcon from "../assets/icons/grid-three.png";
import square from "../assets/icons/square.png";
import classNames from "classnames";

type Layout = "single" | "double" | "triple";

export const Home = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [layout, setLayout] = useState<Layout>("single");
  const [newPost, setNewPost] = useState({
    content: "",
    img: "",
  });

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
      <div className="wrapper">
        <img
          onClick={() => handleLayoutChange("single")}
          className="icon icon--layout"
          src={square}
          alt=""
        />
        <img
          onClick={() => handleLayoutChange("double")}
          className="icon icon--layout"
          src={twoGridIcon}
          alt=""
        />
        <img
          onClick={() => handleLayoutChange("triple")}
          className="icon icon--layout"
          src={threeGridIcon}
          alt=""
        />
      </div>
      <div className="home">
        <div className={homeMainClass}>
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
      <input
        value={newPost.content}
        onChange={(e) => {
          setNewPost((prev) => {
            return {
              ...prev,
              content: e.target.value,
            };
          });
        }}
        type="text"
      />
      <Button
        onClick={async () => {
          try {
            await createPost(newPost);
            setNewPost({
              content: "",
              img: "",
            });
            const data = await getAllPosts();
            setPosts(data.posts.reverse());
          } catch (error) {}
        }}
      >
        Create Post
      </Button>
    </Background>
  );
};
