import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PostRequestDto, createPost } from "../../api/communityApi.ts";
import { postCategoryMapping } from "../../constants/postCategoryMapping.ts";
import InputField from "../../components/ui/InputField.tsx";
import { Header } from "../../components/layout/Header.tsx";

import "./PostCreatePage.css";

const PostCreatePage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !postCategory) {
      setError("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const requestDto: PostRequestDto = {
        title,
        content,
        postCategory,
      };

      const accessToken = localStorage.getItem("accessToken") || "";
      await createPost(accessToken, requestDto);
      navigate("/community");
    } catch {
      setError("게시글 작성에 실패했습니다.");
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    const enumKey = Object.keys(postCategoryMapping).find(
      (key) => postCategoryMapping[key] === selected
    );
    if (enumKey) setPostCategory(enumKey);
  };

  return (
    <div>
      <Header />
      <hr className="top-divider" />
      <div className="post-list-wrapper">
        <h2 className="section-title">게시글 작성</h2>
        <hr className="section-divider" />
        {error && <p className="post-create-error">{error}</p>}
        <form className="post-create-form" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">제목</label>
            <InputField
              name="title"
              type="text"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="content">내용</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="category">카테고리</label>
            <select onChange={handleCategoryChange} defaultValue="" required>
              <option value="" disabled>
                선택하세요
              </option>
              {Object.entries(postCategoryMapping).map(([key, label]) => (
                <option key={key} value={label}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="post-create-submit-btn">
            등록
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostCreatePage;