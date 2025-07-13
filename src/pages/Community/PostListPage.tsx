import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllPosts, PostDto } from "../../api/communityApi.ts";
import { Header } from "../../components/layout/Header.tsx";
import { postCategoryMapping } from "../../constants/postCategoryMapping.ts";
import { formatDateTime } from "../../utils/dateUtils.ts";

import "./PostListPage.css";

const PostListPage: React.FC = () => {
  const [posts, setPosts] = useState<PostDto[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const result = await getAllPosts();
        setPosts(result);
      } catch {
        setError("게시글을 불러오는 데 실패했습니다.");
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div>
      <Header />
      <hr className="top-divider" />
      <div className="post-list-wrapper">
        <h2 className="section-title">게시글 목록</h2>
        <hr className="section-divider" />
        <div className="post-table-header">
          <span className="column category">구분</span>
          <span className="column title">제목</span>
          <span className="column author">작성자</span>
          <span className="column date">작성 시간</span>
          <span className="column comments">댓글 수</span>
        </div>
        <hr className="light-divider" />
        {error && <p className="error">{error}</p>}
        <ul className="post-table-body">
          {posts.map((post) => (
            <li
              key={post.postId}
              className="post-row"
              onClick={() => handlePostClick(post.postId)}
            >
              <span className="column category">
                [ {postCategoryMapping[post.postCategory] || post.postCategory} ]
              </span>
              <span className="column title">{post.title}</span>
              <span className="column author">{post.authorNickname}</span>
              <span className="column date">{formatDateTime(post.createdAt)}</span>
              <span className="column comments">{post.commentCount}</span>
            </li>
          ))}
        </ul>
      </div>
      <button className="floating-add-button" onClick={() => navigate("/posts/create")}>
        +
      </button>
    </div>
  );
};

export default PostListPage;